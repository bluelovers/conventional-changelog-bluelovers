"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumCommitEmojiToType = exports.EnumCommitTypeEmoji = exports.EnumCommitType = void 0;
exports.EnumCommitType = {
    fix: 'Bug Fixes',
    feat: 'Features',
    improvement: 'Improvement',
    perf: 'Performance Improvements',
    revert: 'Reverts',
    refactor: 'Code Refactoring',
    docs: 'Documentation',
    style: 'Styles',
    test: 'Tests',
    build: 'Build System',
    ci: 'Continuous Integration',
    WIP: 'Work in Progress',
    chore: 'Chores',
    deps: 'Dependencies',
    misc: 'Miscellaneous',
};
exports.EnumCommitTypeEmoji = {
    feat: "\u2728" /* emoji.feat */,
    fix: "\uD83D\uDC1B" /* emoji.fix */,
    perf: "\uD83D\uDE80" /* emoji.perf */,
    revert: "\uD83D\uDDD1" /* emoji.revert */,
    docs: "\uD83D\uDCDA" /* emoji.docs */,
    style: "\uD83D\uDC8E" /* emoji.style */,
    refactor: "\uD83D\uDCE6" /* emoji.refactor */,
    test: "\uD83D\uDEA8" /* emoji.test */,
    build: "\uD83D\uDEE0" /* emoji.build */,
    ci: "\u2699\uFE0F" /* emoji.ci */,
    chore: "\u267B\uFE0F" /* emoji.chore */,
    deps: "\u267B\uFE0F" /* emoji.chore */,
    misc: "\uD83D\uDD16" /* emoji.tag */,
    improvement: "\uD83C\uDF08" /* emoji.improvement */,
    WIP: '🚧',
};
exports.EnumCommitEmojiToType = {
    ["\u2728" /* emoji.feat */]: 'feat',
    ["\uD83D\uDC1B" /* emoji.fix */]: 'fix',
    ["\uD83D\uDE80" /* emoji.perf */]: 'perf',
    ["\uD83D\uDDD1" /* emoji.revert */]: 'revert',
    ["\uD83D\uDCDA" /* emoji.docs */]: 'docs',
    ["\uD83D\uDC8E" /* emoji.style */]: 'style',
    ["\uD83D\uDCE6" /* emoji.refactor */]: 'refactor',
    ["\uD83D\uDEA8" /* emoji.test */]: 'test',
    ["\uD83D\uDEE0" /* emoji.build */]: 'build',
    ["\u2699\uFE0F" /* emoji.ci */]: 'ci',
    ["\u267B\uFE0F" /* emoji.chore */]: 'chore',
};
//# sourceMappingURL=types.js.map