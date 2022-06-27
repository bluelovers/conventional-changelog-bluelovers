
export enum EnumNoteTitle
{
	BREAKING_CHANGES = 'BREAKING CHANGES',
	TODO = 'TODO',
	FIXME = 'FIXME',
}

export function normalizeNoteTitle(title: string)
{
	const title_upper = title.toLocaleUpperCase();

	switch (title_upper)
	{
		case 'BREAKING CHANGES':
		case 'BREAKING CHANGE':
		case 'BREAKING-CHANGE':
		case 'BREAKING-CHANGES':
		case 'BREAKING_CHANGE':
		case 'BREAKING_CHANGES':
			return EnumNoteTitle.BREAKING_CHANGES;
		case 'TODO':
			return EnumNoteTitle.TODO;
		case 'FIXME':
			return EnumNoteTitle.FIXME;
	}

	return title || EnumNoteTitle.BREAKING_CHANGES
}
