/**
 * Conventional Commit 類型定義與 Emoji 對映
 * Conventional Commit Type Definitions and Emoji Mappings
 *
 * 此模組定義 conventional commit 的所有類型、對應的顯示名稱、emoji 符號，以及雙向轉換對映。
 * This module defines all conventional commit types, their display names, emoji symbols, and bidirectional conversion mappings.
 */
import emoji from './emoji';
import { ITSPartialRecord } from 'ts-type/lib/type/record';

/**
 * Commit 類型枚舉定義
 * Commit Type Enum Definition
 *
 * 定義所有支援的 commit 類型及其在 changelog 中的顯示標題。
 * Defines all supported commit types and their display titles in the changelog.
 *
 * 類型按功能分組：功能/修復、效能/重構、文件/樣式、測試/建置/CI、雜項。
 * Types are grouped by function: features/fixes, performance/refactoring, documentation/styles, testing/build/CI, miscellaneous.
 */
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

/**
 * Commit 類型聯合型別
 * Commit Type Union Type
 */
export type ICommitTypes = keyof typeof EnumCommitType;
/**
 * Emoji 型別別名
 * Emoji Type Alias
 */
export type IEmoji = emoji;

/**
 * Commit 類型到 Emoji 的對映表
 * Commit Type to Emoji Mapping Table
 *
 * 將每個 commit 類型對映到對應的 emoji 符號，用於 changelog 的視覺化呈現。
 * Maps each commit type to its corresponding emoji symbol for visual presentation in changelogs.
 *
 * 部分類型使用自定義 emoji（如 conflict, deps），其他則從 emoji 枚舉中引用。
 * Some types use custom emojis (e.g., conflict, deps), while others reference from the emoji enum.
 */
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

/**
 * Emoji 到 Commit 類型的反向對映表
 * Reverse Mapping from Emoji to Commit Type
 *
 * 提供從 emoji 符號反查 commit 類型的功能，用於解析包含 emoji 的 commit 訊息。
 * Provides functionality to reverse-lookup commit types from emoji symbols, used for parsing commit messages containing emojis.
 *
 * 使用 ITSPartialRecord 因為並非所有 emoji 都有對應的 commit 類型（如自定義 emoji）。
 * Uses ITSPartialRecord because not all emojis have corresponding commit types (e.g., custom emojis).
 */
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
