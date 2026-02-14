
/**
 * 註記標題標準化
 * Note Title Normalization
 *
 * 此模組提供註記標題（如 BREAKING CHANGE、TODO、FIXME）的標準化功能，
 * This module provides normalization functionality for note titles (such as BREAKING CHANGE, TODO, FIXME),
 * 確保不同寫法變體都能正確識別與分類。
 * ensuring different writing variants can be correctly identified and categorized.
 */

/**
 * 註記標題枚舉
 * Note Title Enum
 *
 * 定義所有支援的標準化註記標題。
 * Defines all supported standardized note titles.
 */
export enum EnumNoteTitle
{
	BREAKING_CHANGES = 'BREAKING CHANGES',
	TODO = 'TODO',
	FIXME = 'FIXME',
}

/**
 * 標準化註記標題
 * Normalize note title
 *
 * 將各種寫法變體的註記標題標準化為統一格式。
 * Normalizes various writing variants of note titles to a unified format.
 *
 * 支援識別多種 BREAKING CHANGE 寫法（空格、連字號、底線、單複數）。
 * Supports recognizing multiple BREAKING CHANGE writing styles (spaces, hyphens, underscores, singular/plural).
 *
 * @param {string} title - 原始註記標題 / Original note title
 * @returns {string} 標準化後的註記標題 / Normalized note title
 */
export function normalizeNoteTitle(title: string)
{
	// 轉換為大寫以進行不分大小寫比對
	// Convert to uppercase for case-insensitive comparison
	const title_upper = title.toLocaleUpperCase();

	switch (title_upper)
	{
		// 識別所有 BREAKING CHANGE 變體（空格/連字號/底線、單複數）
		// Recognize all BREAKING CHANGE variants (space/hyphen/underscore, singular/plural)
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

	// 如果無法識別，返回原標題或預設為 BREAKING_CHANGES
	// If unrecognized, return original title or default to BREAKING_CHANGES
	return title || EnumNoteTitle.BREAKING_CHANGES
}
