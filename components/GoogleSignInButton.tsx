'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
import { signInWithGoogleIdToken } from '../lib/auth-utils';
import { getSafeRedirect } from '../lib/redirects';

interface GoogleSignInButtonProps {
  redirectUrl?: string;
  onError?: (error: string) => void;
  onSuccess?: () => void;
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
            nonce: string;
            ux_mode?: 'popup' | 'redirect';
            auto_select?: boolean;
            itp_support?: boolean;
            use_fedcm_for_prompt?: boolean;
          }) => void;
          renderButton: (
            parent: HTMLElement,
            options: Record<string, unknown>,
          ) => void;
          cancel: () => void;
          disableAutoSelect: () => void;
        };
      };
    };
  }
}

const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

// Random URL-safe nonce, ~43 chars of entropy (32 bytes base64url-encoded).
function generateNonce(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  let binary = '';
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

// Hex SHA-256 — Supabase recomputes this same hash and matches it against the
// `nonce` claim in the Google ID token.
async function sha256Hex(input: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export default function GoogleSignInButton({
  redirectUrl = '/',
  onError,
  onSuccess,
}: GoogleSignInButtonProps) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rawNonceRef = useRef<string | null>(null);
  // GIS may already be on `window` from a prior mount (next/script keeps the
  // tag across SPA navigations and skips re-firing onLoad), so seed from there.
  const [scriptLoaded, setScriptLoaded] = useState<boolean>(
    typeof window !== 'undefined' && !!window.google?.accounts?.id,
  );
  const [initError, setInitError] = useState<string | null>(null);
  const safeRedirectUrl = getSafeRedirect(redirectUrl);

  const handleCredential = useCallback(
    async ({ credential }: { credential: string }) => {
      const nonce = rawNonceRef.current;
      if (!nonce) {
        onError?.('Sign-in expired — please try again.');
        return;
      }
      // Burn the nonce so a replayed credential can't reuse it.
      rawNonceRef.current = null;

      const { user, error } = await signInWithGoogleIdToken(credential, nonce);
      if (error) {
        onError?.(error);
        return;
      }
      if (user) {
        onSuccess?.();
        router.push(safeRedirectUrl);
      }
    },
    [onError, onSuccess, router, safeRedirectUrl],
  );

  useEffect(() => {
    if (!scriptLoaded || !containerRef.current || !window.google) return;
    if (!CLIENT_ID) {
      setInitError('Google sign-in is not configured.');
      return;
    }

    let cancelled = false;

    (async () => {
      const rawNonce = generateNonce();
      const hashedNonce = await sha256Hex(rawNonce);
      if (cancelled) return;
      rawNonceRef.current = rawNonce;

      try {
        window.google!.accounts.id.initialize({
          client_id: CLIENT_ID,
          callback: handleCredential,
          nonce: hashedNonce,
          ux_mode: 'popup',
          auto_select: false,
          itp_support: true,
          use_fedcm_for_prompt: true,
        });

        if (containerRef.current) {
          containerRef.current.innerHTML = '';
          window.google!.accounts.id.renderButton(containerRef.current, {
            type: 'standard',
            theme: 'outline',
            size: 'large',
            text: 'continue_with',
            shape: 'pill',
            logo_alignment: 'left',
            width: containerRef.current.offsetWidth || 320,
          });
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load Google sign-in.';
        setInitError(message);
      }
    })();

    return () => {
      cancelled = true;
      try {
        window.google?.accounts.id.cancel();
      } catch {
        /* noop */
      }
    };
  }, [scriptLoaded, handleCredential]);

  if (!CLIENT_ID) {
    return (
      <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-2.5 text-xs text-amber-700">
        Google sign-in unavailable: set NEXT_PUBLIC_GOOGLE_CLIENT_ID.
      </div>
    );
  }

  return (
    <>
      <Script
        id="google-gsi-client"
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={() => setScriptLoaded(true)}
        // Fires on every mount when the script is already cached — onLoad
        // alone won't re-fire after SPA navigation (e.g. logout → /login).
        onReady={() => setScriptLoaded(true)}
        onError={() => setInitError('Could not load Google sign-in.')}
      />
      <div
        ref={containerRef}
        className="flex w-full justify-center"
        aria-label="Sign in with Google"
      />
      {initError && (
        <p className="mt-2 text-xs text-red-600">{initError}</p>
      )}
    </>
  );
}
