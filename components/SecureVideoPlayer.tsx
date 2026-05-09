'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import ProtectedScreenshot from './ProtectedScreenshot';

type Props = {
  userId?: string | null;
  userEmail?: string | null;
  accessToken?: string | null;
  videoId?: string;
  title?: string;
  className?: string;
};

type SignedResponse = {
  embedUrl: string;
  expiresAt: number;
  watermarkEmail: string | null;
};

/**
 * Bunny Stream iframe player with a signed embed URL.
 *
 * - Gets a short-lived signed embed URL from the server.
 * - Fullscreen is forced onto the container (not the iframe) so the
 *   player stays visible in fullscreen.
 */
export default function SecureVideoPlayer({
  accessToken,
  videoId,
  title = 'Video Lecture',
  className = '',
}: Props) {
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const refreshTimer = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const fetchSigned = useCallback(
    async () => {
      if (!accessToken) {
        setEmbedUrl(null);
        setError('Please sign in again to load this secure video.');
        return;
      }

      try {
        setError(null);
        const res = await fetch('/api/bunny-signed-url', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ videoId }),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => null);
          throw new Error(data?.error || `HTTP ${res.status}`);
        }
        const data: SignedResponse = await res.json();
        setEmbedUrl(data.embedUrl);

        if (refreshTimer.current) window.clearTimeout(refreshTimer.current);
        const msUntilRefresh = Math.max(
          30_000,
          data.expiresAt - Date.now() - 60_000
        );
        refreshTimer.current = window.setTimeout(() => {
          void fetchSigned();
        }, msUntilRefresh);
      } catch (err) {
        setEmbedUrl(null);
        setError(err instanceof Error ? err.message : 'Unable to load secure video.');
      }
    },
    [accessToken, videoId]
  );

  useEffect(() => {
    void fetchSigned();
    return () => {
      if (refreshTimer.current) window.clearTimeout(refreshTimer.current);
    };
  }, [fetchSigned]);

  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  const toggleFullscreen = () => {
    const el = containerRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => { });
    } else {
      el.requestFullscreen().catch(() => { });
    }
  };

  const blockContext = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <ProtectedScreenshot className={`rounded-2xl ${className}`}>
      <div
        ref={containerRef}
        onContextMenu={blockContext}
        className="relative w-full overflow-hidden rounded-2xl bg-black aspect-video"
        style={{ userSelect: 'none' }}
      >
        {embedUrl ? (
          <iframe
            ref={iframeRef}
            src={embedUrl}
            title={title}
            loading="lazy"
            style={{
              border: 0,
              position: 'absolute',
              inset: 0,
              height: '100%',
              width: '100%',
            }}
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
            allowFullScreen
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center px-6 text-center text-sm text-white/70">
            {error || 'Loading secure stream...'}
          </div>
        )}

        <button
          type="button"
          onClick={toggleFullscreen}
          aria-label="Toggle fullscreen"
          title="Fullscreen"
          className="absolute top-2 right-2 z-[10000] rounded-md bg-black/55 px-2.5 py-1.5 text-[11px] font-semibold text-white/90 backdrop-blur-sm transition hover:bg-black/80"
        >
          {isFullscreen ? 'Exit ⤫' : 'Fullscreen ⛶'}
        </button>
      </div>
    </ProtectedScreenshot>
  );
}
