/**
 * Simple in-memory rate limiter for Next.js API routes.
 *
 * Uses a sliding-window counter per IP address.
 * State is kept in a Map that is periodically pruned.
 *
 * NOTE: This is per-process. In a multi-instance deployment
 * (e.g. serverless), each cold-start gets its own window.
 * For Vercel / single-instance this is perfectly adequate.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number; // epoch ms
}

const store = new Map<string, RateLimitEntry>();

// Prune stale entries every 60 seconds to prevent memory leaks
let lastPrune = Date.now();
const PRUNE_INTERVAL_MS = 60_000;

function prune() {
  const now = Date.now();
  if (now - lastPrune < PRUNE_INTERVAL_MS) return;
  lastPrune = now;

  for (const [key, entry] of store) {
    if (entry.resetAt <= now) {
      store.delete(key);
    }
  }
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

/**
 * Check whether a request from `ip` is within the rate limit.
 *
 * @param ip        – Client IP (use request header or Next.js `headers()`)
 * @param limit     – Max requests allowed within `windowMs`
 * @param windowMs  – Time window in milliseconds
 */
export function rateLimit(
  ip: string,
  limit: number = 10,
  windowMs: number = 60_000,
): RateLimitResult {
  prune();

  const now = Date.now();
  const key = ip;
  const existing = store.get(key);

  if (!existing || existing.resetAt <= now) {
    // First request in this window
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, resetAt: now + windowMs };
  }

  existing.count += 1;

  if (existing.count > limit) {
    return { allowed: false, remaining: 0, resetAt: existing.resetAt };
  }

  return { allowed: true, remaining: limit - existing.count, resetAt: existing.resetAt };
}
