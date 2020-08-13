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
    misc: 'Miscellaneous',
};
exports.EnumCommitTypeEmoji = {
    feat: "\u2728" /* feat */,
    fix: "\uD83D\uDC1B" /* fix */,
    perf: "\uD83D\uDE80" /* perf */,
    revert: "\uD83D\uDDD1" /* revert */,
    docs: "\uD83D\uDCDA" /* docs */,
    style: "\uD83D\uDC8E" /* style */,
    refactor: "\uD83D\uDCE6" /* refactor */,
    test: "\uD83D\uDEA8" /* test */,
    build: "\uD83D\uDEE0" /* build */,
    ci: "\u2699\uFE0F" /* ci */,
    chore: "\u267B\uFE0F" /* chore */,
    misc: "\uD83D\uDD16" /* tag */,
    improvement: "\uD83C\uDF08" /* improvement */,
    WIP: '🚧',
};
exports.EnumCommitEmojiToType = {
    ["\u2728" /* feat */]: 'feat',
    ["\uD83D\uDC1B" /* fix */]: 'fix',
    ["\uD83D\uDE80" /* perf */]: 'perf',
    ["\uD83D\uDDD1" /* revert */]: 'revert',
    ["\uD83D\uDCDA" /* docs */]: 'docs',
    ["\uD83D\uDC8E" /* style */]: 'style',
    ["\uD83D\uDCE6" /* refactor */]: 'refactor',
    ["\uD83D\uDEA8" /* test */]: 'test',
    ["\uD83D\uDEE0" /* build */]: 'build',
    ["\u2699\uFE0F" /* ci */]: 'ci',
    ["\u267B\uFE0F" /* chore */]: 'chore',
};
//# sourceMappingURL=types.js.map