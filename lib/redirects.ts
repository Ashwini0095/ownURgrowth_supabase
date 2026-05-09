export function getSafeRedirect(
  redirect: string | null | undefined,
  fallback = "/",
): string {
  if (!redirect) return fallback;

  const value = redirect.trim();
  if (!value.startsWith("/") || value.startsWith("//") || value.includes("\\")) {
    return fallback;
  }

  return value;
}
