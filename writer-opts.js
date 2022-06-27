'use strict'
// @ts-check

const { EnumCommitType, EnumCommitTypeEmoji, EnumCommitEmojiToType } = require('./lib/types');

const compareFunc = require('compare-func')
const Q = require('q')
const { normalizeNoteTitle } = require('./lib/normalize');
const readFile = Q.denodeify(require('fs').readFile)
const resolve = require('path').resolve

const order = [...Object.keys(EnumCommitType)]
  .reduce((a, type) => {
    a.push(type);

    let title = EnumCommitType[type] || type;

    if (title !== type)
    {
      a.push(title);
    }

    if (EnumCommitTypeEmoji[type])
    {
      title = EnumCommitTypeEmoji[type] + '　' + title

      a.push(title);
    }

    return a
  }, [])
;

/**
 *
 * @type { import('conventional-changelog-core').WriterOptions["commitGroupsSort"] }
 */
const commitGroupsSort = (g1, g2) =>
  order.indexOf(g1.title) - order.indexOf(g2.title);

/**
 *
 * @type { Promise<import('conventional-changelog-core').WriterOptions> }
 */
module.exports = Q.all([
  readFile(resolve(__dirname, './templates/template.hbs'), 'utf-8'),
  readFile(resolve(__dirname, './templates/header.hbs'), 'utf-8'),
  readFile(resolve(__dirname, './templates/commit.hbs'), 'utf-8'),
  readFile(resolve(__dirname, './templates/footer.hbs'), 'utf-8')
])
  .spread((template, header, commit, footer) => {
    const writerOpts = getWriterOpts()

    writerOpts.mainTemplate = template
    writerOpts.headerPartial = header
    writerOpts.commitPartial = commit
    writerOpts.footerPartial = footer

    return writerOpts
  })

/**
 *
 * @return { import('conventional-changelog-core').WriterOptions }
 */
function getWriterOpts () {

  /** @type { import('conventional-changelog-core').WriterOptions } */
  const opts = {
    transform: (commit, context) => {
      let discard = true
      const issues = []

      let currentNoteTitle;

      commit.notes && commit.notes.forEach(note => {
        note.title = normalizeNoteTitle(note.title || currentNoteTitle)
        discard = false
        currentNoteTitle = note.title
      })

      let type = commit.type;
      if (EnumCommitEmojiToType[type])
      {
        type = EnumCommitEmojiToType[type]
      }

      let title = type;

      if (EnumCommitType[type])
      {
        title = EnumCommitType[type]
        discard = false
      }
      else if (commit.revert)
      {
        title = EnumCommitType.revert
        discard = false
      }
      else if (1)
      {
        title = EnumCommitType.misc;
        type = 'misc'

        //return
      }
      else if (discard)
      {
        return
      }

      commit.type = type;

      if (EnumCommitTypeEmoji[type])
      {
        title = EnumCommitTypeEmoji[type] + '　' + title
      }

      commit.type = commit.title = title;

      /*
      if (commit.type === 'feat') {
        commit.type = 'Features'
      } else if (commit.type === 'fix') {
        commit.type = 'Bug Fixes'
      } else if (commit.type === 'perf') {
        commit.type = 'Performance Improvements'
      } else if (commit.type === 'revert' || commit.revert) {
        commit.type = 'Reverts'
      } else if (discard) {
        return
      } else if (commit.type === 'docs') {
        commit.type = 'Documentation'
      } else if (commit.type === 'style') {
        commit.type = 'Styles'
      } else if (commit.type === 'refactor') {
        commit.type = 'Code Refactoring'
      } else if (commit.type === 'test') {
        commit.type = 'Tests'
      } else if (commit.type === 'build') {
        commit.type = 'Build System'
      } else if (commit.type === 'ci') {
        commit.type = 'Continuous Integration'
      }
       */

      if (commit.scope === '*') {
        commit.scope = ''
      }

      if (typeof commit.hash === 'string') {
        commit.shortHash = commit.hash.substring(0, 7)
      }

      if (typeof commit.subject === 'string') {
        let url = context.repository
          ? `${context.host}/${context.owner}/${context.repository}`
          : context.repoUrl
        if (url) {
          url = `${url}/issues/`
          // Issue URLs.
          commit.subject = commit.subject.replace(/#([0-9]+)/g, (_, issue) => {
            issues.push(issue)
            return `[#${issue}](${url}${issue})`
          })
        }
        if (context.host) {
          // User URLs.
          commit.subject = commit.subject.replace(/\B@([a-z0-9](?:-?[a-z0-9/]){0,38})/g, (_, username) => {
            if (username.includes('/')) {
              return `@${username}`
            }

            return `[@${username}](${context.host}/${username})`
          })
        }
      }

      // remove references that already appear in the subject
      commit.references = commit.references.filter(reference => {
        if (issues.indexOf(reference.issue) === -1) {
          return true
        }

        return false
      })

      return commit
    },
    groupBy: 'type',
    //commitGroupsSort: 'title',
    commitGroupsSort,
    //commitsSort: ['scope', 'subject'],
    commitsSort: ['scope'],
    noteGroupsSort: 'title',
    notesSort: compareFunc
  }

  return opts
}
