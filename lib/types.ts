/**
 * Created by user on 2020/6/15.
 */
import emoji from './emoji';

export const EnumCommitType = {
	feat: 'Features',
	fix: 'Bug Fixes',
	perf: 'Performance Improvements',

	revert: 'Reverts',
	refactor: 'Code Refactoring',

	docs: 'Documentation',
	style: 'Styles',

	test: 'Tests',
	build: 'Build System',
	ci: 'Continuous Integration',
	chore: 'Chores',
	misc: 'Miscellaneous',
}

export const EnumCommitTypeEmoji = {
	feat: emoji.feat,
	fix: emoji.fix,
	perf: emoji.perf,
	revert: emoji.revert,
	docs: emoji.docs,
	style: emoji.style,
	refactor: emoji.refactor,
	test: emoji.test,
	build: emoji.build,
	ci: emoji.ci,
	chore: emoji.chore,
};

export const EnumCommitEmojiToType = {
	[emoji.feat]: 'feat',
	[emoji.fix]: 'fix',
	[emoji.perf]: 'perf',
	[emoji.revert]: 'revert',
	[emoji.docs]: 'docs',
	[emoji.style]: 'style',
	[emoji.refactor]: 'refactor',
	[emoji.test]: 'test',
	[emoji.build]: 'build',
	[emoji.ci]: 'ci',
	[emoji.chore]: 'chore',
};
