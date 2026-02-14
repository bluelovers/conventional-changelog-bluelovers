/**
 * Conventional Changelog 版本升級建議模組
 * Conventional Changelog Recommended Bump Module
 *
 * 此模組根據 conventional commits 分析提交歷史，並建議適當的語義化版本升級等級。
 * This module analyzes commit history based on conventional commits and recommends the appropriate semantic version bump level.
 *
 * @module conventional-recommended-bump
 */
'use strict'

const parserOpts = require('./parser-opts')

module.exports = {
  parserOpts,

  /**
   * 決定版本升級等級
   * Determine version bump level
   *
   * 根據提交記錄決定應該升級的版本等級：
   * Determines which version level should be bumped based on commit records:
   * - level 0 (major): 存在 BREAKING CHANGES / Contains BREAKING CHANGES
   * - level 1 (minor): 存在新功能但無 BREAKING CHANGES / Contains features but no BREAKING CHANGES
   * - level 2 (patch): 僅有修復或其他變更 / Only fixes or other changes
   *
   * @param {Array} commits - 提交記錄陣列 / Array of commit records
   * @returns {{level: number, reason: string}} 升級等級與原因 / Bump level and reason
   */
  whatBump: (commits) => {
    // 預設為 patch 等級（最小升級）
    // Default to patch level (minimal bump)
    let level = 2
    // 追蹤 BREAKING CHANGES 數量
    // Track number of BREAKING CHANGES
    let breakings = 0
    // 追蹤新功能數量
    // Track number of features
    let features = 0

    // 遍歷所有提交以分析影響範圍
    // Iterate through all commits to analyze impact scope
    commits.forEach(commit => {
      // notes 包含 BREAKING CHANGE 等重要註記，任何 note 都觸發 major 升級
      // notes contain important annotations like BREAKING CHANGE; any note triggers a major bump
      if (commit.notes.length > 0) {
        breakings += commit.notes.length
        // major version bump
        level = 0
      } else if (commit.type === 'feat') {
        features += 1
        // 僅在尚未設定為 major 時才升級為 minor
        // Only upgrade to minor if not already set to major
        if (level === 2) {
          // minor version bump
          level = 1
        }
      }
    })

    return {
      level: level,
      reason: breakings === 1
        ? `There is ${breakings} BREAKING CHANGE and ${features} features`
        : `There are ${breakings} BREAKING CHANGES and ${features} features`
    }
  }
}
