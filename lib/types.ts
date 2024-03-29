/**
 * Created by user on 2020/6/15.
 */
import emoji from './emoji';
import { ITSPartialRecord } from 'ts-type/lib/type/record';

export const EnumCommitType = {
	fix: 'Bug Fixes',

	feat: 'Features',
	improvement: 'Improvement',
	perf: 'Performance Improvements',

	revert: 'Reverts',
	refactor: 'Code Refactoring',
	conflict: 'Conflict',

	docs: 'Documentation',
	style: 'Styles',

	test: 'Tests',
	build: 'Build System',
	ci: 'Continuous Integration',

	WIP: 'Work in Progress',

	chore: 'Chores',
	deps: 'Dependencies',
	dep: 'Dependencies',
	misc: 'Miscellaneous',
}

export type ICommitTypes = keyof typeof EnumCommitType;
export type IEmoji = emoji;

export const EnumCommitTypeEmoji: Record<ICommitTypes, IEmoji | string> = {
	feat: emoji.feat,
	fix: emoji.fix,
	perf: emoji.perf,
	revert: emoji.revert,
	conflict: '⚔️',
	docs: emoji.docs,
	style: emoji.style,
	refactor: emoji.refactor,
	test: emoji.test,
	build: emoji.build,
	ci: emoji.ci,
	chore: emoji.chore,
	deps: '📌',
	dep: '📌',
	misc: emoji.tag,

	improvement: emoji.improvement,

	WIP: '🚧',
};

export const EnumCommitEmojiToType: ITSPartialRecord<IEmoji, ICommitTypes> = {
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
