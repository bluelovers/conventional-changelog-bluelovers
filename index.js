/**
 * Conventional Changelog 主要套件入口
 * Conventional Changelog Main Package Entry Point
 *
 * 此模組作為整個套件的主要入口點，聚合所有配置模組（changelog、parser、bump、writer）並以 Promise 形式提供。
 * This module serves as the main entry point for the entire package, aggregating all configuration modules (changelog, parser, bump, writer) and providing them as a Promise.
 *
 * @module index
 */
'use strict'
const Q = require('q')
const conventionalChangelog = require('./conventional-changelog')
const parserOpts = require('./parser-opts')
const recommendedBumpOpts = require('./conventional-recommended-bump')
const writerOpts = require('./writer-opts')

/**
 * 匯出完整配置 Promise
 * Export complete configuration Promise
 *
 * 使用 Q.all 並行載入所有四個配置模組，確保所有模組都成功載入後才返回完整配置物件。
 * Uses Q.all to load all four configuration modules in parallel, ensuring all modules are successfully loaded before returning the complete configuration object.
 *
 * 若任一模組載入失敗，整個 Promise 會被拒絕，確保配置的完整性。
 * If any module fails to load, the entire Promise will be rejected, ensuring configuration integrity.
 *
 * @returns {Promise<{conventionalChangelog: Object, parserOpts: Object, recommendedBumpOpts: Object, writerOpts: Object}>} 完整配置物件 / Complete configuration object
 */
module.exports = Q.all([conventionalChangelog, parserOpts, recommendedBumpOpts, writerOpts])
  .spread((conventionalChangelog, parserOpts, recommendedBumpOpts, writerOpts) => {
    return { conventionalChangelog, parserOpts, recommendedBumpOpts, writerOpts }
  })
