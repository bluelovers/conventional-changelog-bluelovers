/**
 * Conventional Changelog 配置模組
 * Conventional Changelog Configuration Module
 *
 * 此模組作為 conventional-changelog 的主要入口點，負責載入並組合解析器與寫入器的配置選項。
 * This module serves as the main entry point for conventional-changelog, responsible for loading and combining parser and writer configuration options.
 *
 * @module conventional-changelog
 */
'use strict'

const Q = require('q')
const parserOpts = require('./parser-opts')
const writerOpts = require('./writer-opts')

/**
 * 匯出配置 Promise
 * Export configuration Promise
 *
 * 使用 Q.all 並行載入 parserOpts 和 writerOpts，然後透過 spread 將結果組合成單一配置物件。
 * Uses Q.all to load parserOpts and writerOpts in parallel, then combines the results into a single configuration object via spread.
 *
 * 這種模式確保兩個配置模組都成功載入後才返回最終配置，若任一模組載入失敗則整個 Promise 會被拒絕。
 * This pattern ensures that the final configuration is returned only after both configuration modules are successfully loaded; if either module fails to load, the entire Promise will be rejected.
 *
 * @returns {Promise<{parserOpts: Object, writerOpts: Object}>} 包含解析器與寫入器配置的 Promise / Promise containing parser and writer configurations
 */
module.exports = Q.all([parserOpts, writerOpts])
  .spread((parserOpts, writerOpts) => {
    return { parserOpts, writerOpts }
  })
