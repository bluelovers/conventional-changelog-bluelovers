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

export const enum emoji
${JSON.stringify(data, null, "\t").replace(/\s*:\s*/g, ' = ')};

export default emoji;

`)
