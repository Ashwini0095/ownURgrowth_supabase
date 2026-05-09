'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
 * Bunny Stream iframe player with a forensic per-user watermark.
 *
 * - Gets a short-lived signed embed URL from the server.
 * - Overlays the user's email + UID + live timestamp.
 * - Watermark moves to a truly random position every 3 s so it can't be
 *   cropped out of a screen recording.
 * - A MutationObserver re-injects the watermark if the user deletes it in
 *   DevTools.
 * - Fullscreen is forced onto the container (not the iframe) so the
 *   watermark stays visible in fullscreen.
 */
export default function SecureVideoPlayer({
  userId,
  userEmail,
  accessToken,
  videoId,
  title = 'Video Lecture',
  className = '',
}: Props) {
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);
  const [streamWatermarkEmail, setStreamWatermarkEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const refreshTimer = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const watermarkLayerRef = useRef<HTMLDivElement | null>(null);

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
        setStreamWatermarkEmail(data.watermarkEmail);

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
    const id = window.setInterval(() => setTick((t) => t + 1), 3000);
    return () => window.clearInterval(id);
  }, []);

  const watermarkText = useMemo(() => {
    void tick;
    const who = streamWatermarkEmail || userEmail || 'user';
    const uid = userId ? `USER_${userId.slice(0, 10)}` : '';
    const now = new Date();
    const ts = now.toISOString().slice(0, 16).replace('T', ' ');
    return `${uid} | ${who} | ${ts}`;
  }, [streamWatermarkEmail, userEmail, userId, tick]);

  const position = useMemo(() => {
    void tick;
    const top = 5 + Math.random() * 80;
    const left = 3 + Math.random() * 70;
    return { top: `${top}%`, left: `${left}%` };
  }, [tick]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new MutationObserver(() => {
      if (
        watermarkLayerRef.current &&
        !container.contains(watermarkLayerRef.current)
      ) {
        container.appendChild(watermarkLayerRef.current);
      }
    });
    observer.observe(container, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [embedUrl]);

  useEffect(() => {
    const onFsChange = () => {
      const fsEl = document.fullscreenElement;
      setIsFullscreen(!!fsEl);

      if (fsEl && fsEl === iframeRef.current && containerRef.current) {
        document
          .exitFullscreen()
          .then(() => containerRef.current?.requestFullscreen())
          .catch(() => {});
      }
    };
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  const toggleFullscreen = () => {
    const el = containerRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      el.requestFullscreen().catch(() => {});
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

        <div
          ref={watermarkLayerRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[9999] overflow-hidden select-none"
        >
          <span
            className="absolute whitespace-nowrap font-mono text-sm md:text-base font-semibold"
            style={{
              top: position.top,
              left: position.left,
              color: 'rgba(255,255,255,0.75)',
              textShadow:
                '0 0 6px rgba(0,0,0,0.95), 1px 1px 0 rgba(0,0,0,0.95)',
              transition: 'top 1s ease, left 1s ease',
            }}
          >
            {watermarkText}
          </span>

          <span
            className="absolute top-2 left-3 font-mono text-[11px]"
            style={{
              color: 'rgba(255,255,255,0.55)',
              textShadow: '0 0 4px rgba(0,0,0,0.9)',
            }}
          >
            {watermarkText}
          </span>
          <span
            className="absolute bottom-2 right-3 font-mono text-[11px]"
            style={{
              color: 'rgba(255,255,255,0.55)',
              textShadow: '0 0 4px rgba(0,0,0,0.9)',
            }}
          >
            {watermarkText}
          </span>
        </div>

        <button
          type="button"
          onClick={toggleFullscreen}
          aria-label="Toggle fullscreen"
          title="Fullscreen (keeps watermark visible)"
          className="absolute top-2 right-2 z-[10000] rounded-md bg-black/55 px-2.5 py-1.5 text-[11px] font-semibold text-white/90 backdrop-blur-sm transition hover:bg-black/80"
        >
          {isFullscreen ? 'Exit ⤫' : 'Fullscreen ⛶'}
        </button>
      </div>
    </ProtectedScreenshot>
  );
}
