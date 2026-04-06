'use client';

import { useEffect, useRef, useState } from 'react';

interface ProtectedVideoProps {
  src: string;
  title: string;
}

export default function ProtectedVideo({ src, title }: ProtectedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHidden, setIsHidden] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let protectionInterval: NodeJS.Timeout;

    if (isPlaying) {
      // Create floating watermarks that move around
      protectionInterval = setInterval(() => {
        const watermarks = document.querySelectorAll('.screenshot-protection');
        watermarks.forEach(mark => mark.remove());

        // Create multiple moving watermarks
        for (let i = 0; i < 8; i++) {
          const watermark = document.createElement('div');
          watermark.className = 'screenshot-protection';
          watermark.innerHTML = '🔒 PROTECTED CONTENT';
          watermark.style.cssText = `
            position: fixed;
            top: ${Math.random() * 80 + 10}%;
            left: ${Math.random() * 80 + 10}%;
            color: rgba(255, 255, 255, 0.3);
            font-size: 14px;
            font-weight: bold;
            z-index: 1000;
            pointer-events: none;
            transform: rotate(${Math.random() * 60 - 30}deg);
            text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
          `;
          document.body.appendChild(watermark);
        }
      }, 100); // Update every 100ms
    }

    // Tab switching detection
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsHidden(true);
        if (videoRef.current) {
          videoRef.current.pause();
        }
      } else {
        setIsHidden(false);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(protectionInterval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      
      // Clean up watermarks
      const watermarks = document.querySelectorAll('.screenshot-protection');
      watermarks.forEach(mark => mark.remove());
    };
  }, [isPlaying]);

  return (
    <div className="relative w-full max-w-4xl mx-auto bg-black rounded-lg overflow-hidden">
      {/* Blue overlay when tab is hidden */}
      {isHidden && (
        <div className="absolute inset-0 bg-[#1D4ED8] z-50 flex items-center justify-center">
          <div className="text-[#141619] text-center">
            <h2 className="text-2xl font-bold mb-4">Content Protected</h2>
            <p>Please return to this tab to continue watching</p>
          </div>
        </div>
      )}

      <video
        ref={videoRef}
        className="w-full h-auto"
        controls
        controlsList="nodownload nofullscreen noremoteplayback"
        disablePictureInPicture
        onContextMenu={(e) => e.preventDefault()}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Permanent overlay watermarks on video */}
      {isPlaying && (
        <>
          <div className="absolute top-1/4 left-1/4 text-[#141619]/20 text-lg font-bold pointer-events-none transform rotate-12">
            🔒 PROTECTED
          </div>
          <div className="absolute top-3/4 right-1/4 text-[#141619]/20 text-lg font-bold pointer-events-none transform -rotate-12">
            NO SCREENSHOTS
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#141619]/15 text-2xl font-bold pointer-events-none">
            OWNURGROWTH.COM
          </div>
        </>
      )}

      {/* Protection status */}
      <div className="absolute top-4 right-4 text-[#141619] px-3 py-1 rounded text-sm">
        {isPlaying ? (
          <span className="bg-red-500/90">🔒 Active Protection</span>
        ) : (
          <span className="bg-gray-500/90">⏸️ Paused</span>
        )}
      </div>
    </div>
  );
}
