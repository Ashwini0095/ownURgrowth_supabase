/**
 * Fire a non-blocking notice that the <AuthNotice /> toast (mounted in the
 * root layout) will surface. Used in place of window.alert() for transient,
 * user-facing messages. If sessionStorage is unavailable or no listener is
 * mounted, the notice is silently dropped.
 */
export function dispatchNotice(message: string) {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem('authNotice', message);
  } catch {
    // sessionStorage may be unavailable (private browsing). Fall through.
  }
  window.dispatchEvent(new CustomEvent('auth-notice', { detail: message }));
}
