// @ts-ignore
import { breakingHeaderPattern } from '../parser-opts'
import { Commit } from "conventional-commits-parser";

/**
 * 新增 Bang Notes 函式宣告
 * Add Bang Notes Function Declaration
 *
 * 此函式處理包含 "!" 符號的 commit，將其識別為 BREAKING CHANGE 並新增對應的 note。
 * This function processes commits containing the "!" symbol, identifying them as BREAKING CHANGES and adding corresponding notes.
 *
 * "!" 符號是 conventional commits 中表示 BREAKING CHANGE 的簡寫寫法（例如 "feat!: ..."）。
 * The "!" symbol is a shorthand notation in conventional commits to indicate BREAKING CHANGES (e.g., "feat!: ...").
 *
 * @param {any} commit - 要處理的 commit 物件 / The commit object to process
 * @returns {void}
 */
export function addBangNotes(commit: Commit)
{
	const match = commit.header.match(breakingHeaderPattern)
	if (match && commit.notes.length === 0)
	{
		const noteText = match[3] // the description of the change.
		commit.notes.push({
			text: noteText
		} as Commit.Note)
	}
}
