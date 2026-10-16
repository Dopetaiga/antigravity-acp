import * as os from "node:os";
import * as path from "node:path";

const HOME = os.homedir();

/** Where agy writes its per-conversation SQLite databases.
 *  Override via AGY_CONVERSATIONS_DIR if agy uses a different path on this OS. */
export const CONVERSATION_DIR =
	process.env.AGY_CONVERSATIONS_DIR ||
	path.join(HOME, ".gemini", "antigravity-cli", "conversations");

/** Directory holding this server's persistent state (session bindings). */
export const STATE_DIR = path.join(HOME, ".agy-acp");

/** Persistent session-binding store. */
export const SESSIONS_FILE = path.join(STATE_DIR, "sessions.json");

/** Persistent model cache store. */
export const MODELS_CACHE_FILE = path.join(STATE_DIR, "models.json");

/** Env override for the context window reported in `usage_update`. */
export const CONTEXT_WINDOW_ENV = "AGY_CONTEXT_WINDOW";

/**
 * Context window used to render `usage_update` as a ratio.
 *
 * agy does not expose the per-model limit offline: `agy models` lists ids and
 * display names only, and neither the conversation database nor the CLI cache
 * records a window size, so this is a best-effort default for the Gemini 3.x
 * families agy currently ships (1M tokens, the same order of magnitude as the
 * Gemini models on the desktop app). Set `AGY_CONTEXT_WINDOW` when the real
 * limit differs; clients that only display the token count ignore this value.
 */
export const DEFAULT_CONTEXT_WINDOW_TOKENS = 1_000_000;

export function contextWindowTokens(): number {
	const configured = process.env[CONTEXT_WINDOW_ENV]?.trim();
	const value = configured ? Number(configured) : Number.NaN;
	return Number.isFinite(value) && value > 0
		? Math.floor(value)
		: DEFAULT_CONTEXT_WINDOW_TOKENS;
}

/** Poll interval (ms) for streaming new steps during a live prompt turn. */
export const POLL_INTERVAL_MS = 200;

/** Max sessions held in memory before the oldest is evicted. */
export const MAX_SESSIONS = 64;

/** Max conversations cached for fast replay before LRU eviction. */
export const MAX_REPLAY_CACHE = 32;

export const MODEL_CONFIG_ID = "model";
export const MODE_CONFIG_ID = "mode";
export const DEFAULT_MODE_ID = "default";
export const PLAN_MODE_ID = "plan";
export const SANDBOX_CONFIG_ID = "sandbox";

export const AUTH_METHOD_ID = "agy-agent";

export const AVAILABLE_COMMANDS = [
	{ name: "goal", description: "Run a long-running task thoroughly" },
	{
		name: "schedule",
		description: "Run an instruction on a recurring schedule or set a timer",
	},
	{
		name: "grill-me",
		description: "Align on a plan through an interactive interview",
	},
	{
		name: "teamwork-preview",
		description: "Preview a team of autonomous agents working together",
	},
	{ name: "learn", description: "Persist a behavior for future tasks" },
	{ name: "usage", description: "Display raw token usage and quota metrics" },
];
