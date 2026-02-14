/**
 * Created by user on 2020/6/15.
 */

import emoji from 'commit-emojis';
import allTypes from 'conventional-changelog-metahub/types';
import { outputFile } from 'fs-extra';
import { join } from 'path';

const data = (Object.entries(allTypes.types) as [string, any][])
	.reduce((data, [type, row]) => {

		data[type] = row.emoji;

		(Object.entries(row.aliases ?? {}) as [string, any][])
			.forEach(([type, row]) => {

				data[type] = row.emoji;

			})
			;

		return data
	}, emoji)

outputFile(join(__dirname, '../..', 'lib/emoji.ts'), `

/**
 * Conventional Commit 類型與 Emoji 對映枚舉
 * Conventional Commit Type to Emoji Mapping Enum
 *
 * 定義各種 conventional commit 類型對應的 emoji 符號，用於 changelog 視覺化呈現。
 * Defines emoji symbols corresponding to various conventional commit types for visual presentation in changelogs.
 *
 * 使用 const enum 以提供編譯時期常數內聯，減少執行時開銷。
 * Uses const enum to provide compile-time constant inlining, reducing runtime overhead.
 */
export const enum emoji
${JSON.stringify(data, null, "\t").replace(/\s*:\s*/g, ' = ')};

export default emoji;

`)
