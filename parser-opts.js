'use strict'

const emojiRegex = require('emoji-regex')();

const headerPattern = /^(\w+)(?:\(([^)]*)\))?!?:\s+(.*)$/;
const breakingHeaderPattern = /^(\w+)(?:\(([^)]*)\))?!:\s+(.*)$/;

const re2 = new RegExp(`^(?:(\\w+)(?:\\(([^)]*)\\))?!?:|(${emojiRegex.source})(?:\\((.+)\\))?)\\s+(.*)$`, 'u')

headerPattern[Symbol.match] = headerPattern.exec = function (str)
{
  let result = re2.exec(str);

  if (result)
  {
    if (typeof result[1] === 'undefined' && typeof result[2] === 'undefined' && typeof result[3] !== 'undefined')
    {
      result[1] = result[3]
      result[2] = result[4]
    }

    result.splice(3, 2)
  }

  return result
}

/**
 * @type { import('conventional-changelog-core').ParserOptions }
 */
const parserOpts = {
  headerPattern,
  headerCorrespondence: [
    'type',
    'scope',
    'subject'
  ],

  breakingHeaderPattern,

  noteKeywords: [
    'BREAKING-CHANGE',
    'BREAKING CHANGE',
    'TODO',
    'FIXME'
  ],
  revertPattern: /^(?:Revert|revert:)\s"?([\s\S]+?)"?\s*This reverts commit (\w*)\./i,
  revertCorrespondence: ['header', 'hash'],

  referenceActions: [
    'close',
    'closes',
    'closed',
    'fix',
    'fixes',
    'fixed',
    'resolve',
    'resolves',
    'resolved',
    'issues',
    'pr',
    'see',
  ],
}

module.exports = parserOpts
