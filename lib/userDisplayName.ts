type UserMetadata = Record<string, unknown> | null | undefined;

const NAME_FIELDS = ["first_name", "full_name", "name", "display_name", "user_name"];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isEmailAddress(value: string | null | undefined): boolean {
  return Boolean(value && EMAIL_PATTERN.test(value.trim()));
}

export function normalizeDisplayName(value: unknown): string | null {
  if (typeof value !== "string") return null;

  const name = value.trim();
  if (!name || isEmailAddress(name)) return null;

  return name.split(/\s+/)[0] || null;
}

export function getUserDisplayName(
  metadata: UserMetadata,
  fallbackName?: unknown,
): string | null {
  for (const field of NAME_FIELDS) {
    const name = normalizeDisplayName(metadata?.[field]);
    if (name) return name;
  }

  return normalizeDisplayName(fallbackName);
}
