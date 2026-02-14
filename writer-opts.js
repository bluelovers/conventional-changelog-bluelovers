/**
 * Conventional Changelog 寫入器選項配置
 * Conventional Changelog Writer Options Configuration
 *
 * 此模組定義 changelog 生成時的寫入器選項，包括模板載入、commit 轉換邏輯、排序規則等。
 * This module defines writer options for changelog generation, including template loading, commit transformation logic, and sorting rules.
 *
 * @module writer-opts
 */
'use strict'
// @ts-check

const { EnumCommitType, EnumCommitTypeEmoji, EnumCommitEmojiToType } = require('./lib/types');

const compareFunc = require('compare-func')
const Q = require('q')
const { normalizeNoteTitle } = require('./lib/normalize');
const { addBangNotes } = require('./lib/add-bang-notes');
const readFile = Q.denodeify(require('fs').readFile)
const resolve = require('path').resolve

/**
 * Commit 類型排序順序陣列
 * Commit Type Sorting Order Array
 *
 * 建立一個包含所有可能 commit 類型變體的陣列，用於決定 changelog 中 commit 群組的顯示順序。
 * Creates an array containing all possible commit type variants, used to determine the display order of commit groups in the changelog.
 *
 * 每個類型會產生三種變體：
 * Each type generates three variants:
 * 1. 原始類型鍵（如 'feat'）/ Original type key (e.g., 'feat')
 * 2. 顯示標題（如 'Features'）/ Display title (e.g., 'Features')
 * 3. Emoji + 標題（如 '✨　Features'）/ Emoji + title (e.g., '✨　Features')
 *
 * 這確保無論 commit 使用哪種格式，都能正確排序。
 * This ensures commits are correctly sorted regardless of which format they use.
 */
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
 * Commit 群組排序函式
 * Commit Group Sorting Function
 *
 * 根據預定義的 order 陣列對 commit 群組進行排序，確保 changelog 中的區塊按照期望的順序顯示。
 * Sorts commit groups based on the predefined order array, ensuring sections in the changelog appear in the expected order.
 *
 * 較小的索引值會排在前面（如 'feat' 通常排在 'fix' 之前）。
 * Smaller index values appear first (e.g., 'feat' typically appears before 'fix').
 *
 * @type { import('conventional-changelog-core').WriterOptions["commitGroupsSort"] }
 */
const commitGroupsSort = (g1, g2) =>
  order.indexOf(g1.title) - order.indexOf(g2.title);

/**
 * 匯出寫入器選項 Promise
 * Export Writer Options Promise
 *
 * 並行載入所有 Handlebars 模板檔案（主模板、標題、commit、頁尾），
 * Loads all Handlebars template files in parallel (main template, header, commit, footer),
 * 然後將它們注入到寫入器選項配置中。
 * then injects them into the writer options configuration.
 *
 * 使用 Promise 確保所有模板都成功載入後才返回完整配置。
 * Uses Promise to ensure all templates are successfully loaded before returning the complete configuration.
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
 * 取得寫入器選項配置
 * Get Writer Options Configuration
 *
 * 建立並返回 changelog 寫入器的核心配置，包括 commit 轉換邏輯與排序規則。
 * Creates and returns the core configuration for the changelog writer, including commit transformation logic and sorting rules.
 *
 * @return { import('conventional-changelog-core').WriterOptions }
 */
function getWriterOpts()
{

  /** @type { import('conventional-changelog-core').WriterOptions } */
  const opts = {
    /**
     * Commit 轉換函式
     * Commit Transformation Function
     *
     * 處理每個 commit，進行以下轉換：
     * Processes each commit with the following transformations:
     * 1. 標準化 note 標題（BREAKING CHANGE 等）/ Normalize note titles (BREAKING CHANGE, etc.)
     * 2. 轉換 emoji 為對應的 commit 類型 / Convert emojis to corresponding commit types
     * 3. 設定顯示標題與 emoji / Set display titles and emojis
     * 4. 處理 scope、hash、subject 中的連結 / Process links in scope, hash, and subject
     * 5. 過濾重複的 issue 引用 / Filter duplicate issue references
     *
     * @param {import('conventional-commits-parser').Commit} commit - 原始 commit 物件 / Original commit object
     * @param {import('conventional-changelog-writer').Context} context - 上下文資訊（repository、host 等）/ Context information (repository, host, etc.)
     * @returns {import('conventional-commits-parser').Commit} 轉換後的 commit 或 undefined（若應捨棄）/ Transformed commit or undefined (if should be discarded)
     */
    transform: (commit, context) => {
      // 預設捨棄 commit，除非符合特定條件
      // Discard commit by default unless it meets specific criteria
      let discard = true
      const issues = []

      let currentNoteTitle;

      // 處理並標準化所有 notes（如 BREAKING CHANGE）
      // Process and normalize all notes (e.g., BREAKING CHANGE)
      commit.notes && commit.notes.forEach(note => {
        note.title = normalizeNoteTitle(note.title || currentNoteTitle)
        // 有 note 的 commit 必須保留
        discard = false
        currentNoteTitle = note.title
      })

      // 將 emoji 轉換為對應的 commit 類型
      // Convert emoji to corresponding commit type
      let type = commit.type;
      if (EnumCommitEmojiToType[type])
      {
        type = EnumCommitEmojiToType[type]
      }

      let title = type;

      // 決定 commit 的顯示標題
      // Determine the display title for the commit
      if (EnumCommitType[type])
      {
        title = EnumCommitType[type]
        // 已知類型的 commit 保留
        discard = false
      }
      else if (commit.revert)
      {
        title = EnumCommitType.revert
        // revert commit 保留
        discard = false
      }
      // 總是執行：將未知類型歸類為 misc
      else if (1)
      {
        title = EnumCommitType.misc;
        type = 'misc'

        //return
      }
      // 此分支因上面的 if(1) 永不執行
      else if (discard)
      {
        return
      }

      commit.type = type;

      // 為標題添加 emoji 前綴
      // Add emoji prefix to title
      if (EnumCommitTypeEmoji[type])
      {
        title = EnumCommitTypeEmoji[type] + '　' + title
      }

      // 設定最終的 type 和 title
      // Set final type and title
      commit.type = commit.title = title;

      /*
      // 舊版的類型轉換邏輯（已被上面的 EnumCommitType 取代）
      // Legacy type conversion logic (replaced by EnumCommitType above)
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

      // 移除萬用字元 scope
      // Remove wildcard scope
      if (commit.scope === '*') {
        commit.scope = ''
      }

      // 產生短 hash（前 7 個字元）
      // Generate short hash (first 7 characters)
      if (typeof commit.hash === 'string') {
        commit.shortHash = commit.hash.substring(0, 7)
      }

      // 處理 subject 中的 issue 和使用者連結
      // Process issue and user links in subject
      if (typeof commit.subject === 'string') {
        let url = context.repository
          ? `${context.host}/${context.owner}/${context.repository}`
          : context.repoUrl
        if (url) {
          url = `${url}/issues/`
          // 將 issue 編號轉換為連結（如 #123 → [#123](url)）
          // Convert issue numbers to links (e.g., #123 → [#123](url))
          commit.subject = commit.subject.replace(/#([0-9]+)/g, (_, issue) => {
            issues.push(issue)
            return `[#${issue}](${url}${issue})`
          })
        }
        if (context.host) {
          // 將使用者名稱轉換為連結（如 @username → [@username](url)）
          // Convert usernames to links (e.g., @username → [@username](url))
          commit.subject = commit.subject.replace(/\B@([a-z0-9](?:-?[a-z0-9/]){0,38})/g, (_, username) => {
            // 包含 '/' 的是組織/專案路徑，不轉換為使用者連結
            // Paths containing '/' are organization/project paths, don't convert to user links
            if (username.includes('/')) {
              return `@${username}`
            }

            return `[@${username}](${context.host}/${username})`
          })
        }
      }

      // 移除已在 subject 中出現的 issue 引用，避免重複
      // Remove issue references that already appear in the subject to avoid duplication
      commit.references = commit.references.filter(reference => {
        if (issues.indexOf(reference.issue) === -1) {
          return true
        }

        return false
      })

      return commit
    },
    // 按 type 分組 commits
    // Group commits by type
    groupBy: 'type',
    //commitGroupsSort: 'title',
    // 使用自定義排序函式排序 commit 群組
    // Use custom sorting function to sort commit groups
    commitGroupsSort,
    //commitsSort: ['scope', 'subject'],
    // 在群組內按 scope 排序 commits
    // Sort commits within groups by scope
    commitsSort: ['scope'],
    // 按標題排序 note 群組
    // Sort note groups by title
    noteGroupsSort: 'title',
    // 使用比較函式排序 notes
    // Sort notes using comparison function
    notesSort: compareFunc
  }

  return opts
}
