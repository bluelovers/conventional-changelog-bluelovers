

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
{
	"docs" = "📚",
	"feature" = "✨",
	"fix" = "🐛",
	"improvement" = "🌈",
	"removal" = "💩",
	"style" = "💎",
	"tag" = "🔖",
	"test" = "🚨",
	"tooling" = "🛠",
	"feat" = "✨",
	"initial" = "🎉",
	"dependencies" = "⬆️",
	"peerDependencies" = "⬆️",
	"metadata" = "📦",
	"refactor" = "📦",
	"perf" = "🚀",
	"build" = "🛠",
	"ci" = "⚙️",
	"chore" = "♻️",
	"devDependencies" = "⬆️",
	"revert" = "🗑"
};

export default emoji;

