'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../lib/AuthContext';

type PurgeResponse = {
  userId: string | null;
  email: string | null;
  deleted: Record<string, number | boolean>;
  errors: string[];
};

export default function PurgeUserAdminPage() {
  const { user, session, loading: authLoading } = useAuth();
  const router = useRouter();

  const [target, setTarget] = useState('');
  const [confirmText, setConfirmText] = useState('');
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<PurgeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [authzChecked, setAuthzChecked] = useState(false);
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.replace('/login?redirect=/admin/purge-user');
      return;
    }
    // Probe the API with the user's token. If the server's ADMIN_EMAILS
    // allowlist accepts this email, a body-validation 400 comes back. If not,
    // a 401. Either way we learn whether the caller is admin without exposing
    // the allowlist on the client.
    (async () => {
      try {
        const res = await fetch('/api/admin/purge-user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.access_token ?? ''}`,
          },
          body: JSON.stringify({}),
        });
        setIsAllowed(res.status !== 401);
      } catch {
        setIsAllowed(false);
      } finally {
        setAuthzChecked(true);
      }
    })();
  }, [authLoading, user, session, router]);

  const onPurge = async () => {
    setError(null);
    setResult(null);

    const value = target.trim();
    if (!value) {
      setError('Enter an email or user ID.');
      return;
    }
    if (confirmText !== 'PURGE') {
      setError('Type PURGE in the confirm box to enable this action.');
      return;
    }

    const looksLikeEmail = value.includes('@');
    const body = looksLikeEmail ? { email: value } : { userId: value };

    setBusy(true);
    try {
      const res = await fetch('/api/admin/purge-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.access_token ?? ''}`,
        },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok && res.status !== 207) {
        setError(json.error || `Request failed (${res.status})`);
      } else {
        setResult(json as PurgeResponse);
        setTarget('');
        setConfirmText('');
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Network error');
    } finally {
      setBusy(false);
    }
  };

  if (authLoading || !authzChecked) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-[#1D4ED8] border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  if (!isAllowed) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="max-w-md w-full bg-white border border-gray-200 rounded-2xl p-8 shadow-sm text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Not authorized</h1>
          <p className="text-gray-600">
            Your account isn't on the admin allowlist for this page.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Purge user</h1>
        <p className="text-gray-600 mb-8">
          Permanently deletes a user's auth row, payments, sessions, and profile.
          Use this on test accounts only — there is no undo.
        </p>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-5">
          <label className="block">
            <span className="text-sm font-semibold text-gray-700">
              Email or user ID
            </span>
            <input
              type="text"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="user@example.com"
              autoComplete="off"
              spellCheck={false}
              className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] focus:border-[#1D4ED8]"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-gray-700">
              Type <code className="bg-gray-100 px-1.5 py-0.5 rounded">PURGE</code> to confirm
            </span>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              autoComplete="off"
              spellCheck={false}
              className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </label>

          <button
            onClick={onPurge}
            disabled={busy}
            className="w-full rounded-lg bg-red-600 hover:bg-red-700 disabled:bg-red-300 disabled:cursor-not-allowed text-white font-bold py-3 transition-colors"
          >
            {busy ? 'Purging…' : 'Purge user'}
          </button>

          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
              {error}
            </div>
          )}

          {result && (
            <div className="rounded-lg bg-green-50 border border-green-200 text-green-800 px-4 py-3 text-sm space-y-2">
              <div className="font-semibold">Done.</div>
              <pre className="whitespace-pre-wrap break-all text-xs bg-white border border-green-100 rounded p-3">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
