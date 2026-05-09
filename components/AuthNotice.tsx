'use client';

import { useEffect, useState } from 'react';

export default function AuthNotice() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      const pending = sessionStorage.getItem('authNotice');
      if (pending) {
        setMessage(pending);
        sessionStorage.removeItem('authNotice');
      }
    } catch {
      // sessionStorage may be unavailable; ignore.
    }

    const onNotice = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      if (typeof detail === 'string' && detail) setMessage(detail);
    };
    window.addEventListener('auth-notice', onNotice);
    return () => window.removeEventListener('auth-notice', onNotice);
  }, []);

  useEffect(() => {
    if (!message) return;
    const id = setTimeout(() => setMessage(null), 6000);
    return () => clearTimeout(id);
  }, [message]);

  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 left-1/2 z-[10001] -translate-x-1/2 rounded-lg bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-lg max-w-[90vw]"
    >
      {message}
    </div>
  );
}
