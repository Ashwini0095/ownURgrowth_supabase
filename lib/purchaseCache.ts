/**
 * Synchronous localStorage cache for a user's purchase state.
 * Used by client-only components (dynamic ssr:false) to render the
 * correct purchased/non-purchased UI on first paint, without waiting
 * for /api/check-purchase.
 */

export type PurchaseSnapshot = {
  userId: string;
  /** Slugs of courses the user owns, e.g. ["linkedin-growth"]. */
  courses: string[];
  /** LinkedIn growth plan tier: "basic" | "plus" | "pro" | null. */
  plan: string | null;
  /** Client-side write time, used to avoid immediately overwriting just-paid state. */
  updatedAt?: number;
};

const KEY = 'purchasedCoursesSnapshot';

export const isFreshPurchaseSnapshot = (
  snap: PurchaseSnapshot | null,
  userId: string,
  maxAgeMs: number,
): boolean => {
  return Boolean(
    snap?.plan &&
      snap.userId === userId &&
      typeof snap.updatedAt === 'number' &&
      Date.now() - snap.updatedAt < maxAgeMs,
  );
};

export const readPurchaseSnapshot = (): PurchaseSnapshot | null => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as PurchaseSnapshot) : null;
  } catch {
    return null;
  }
};

export const writePurchaseSnapshot = (snap: PurchaseSnapshot): void => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify({ ...snap, updatedAt: Date.now() }));
  } catch {}
};

export const clearPurchaseSnapshot = (): void => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(KEY);
  } catch {}
};
