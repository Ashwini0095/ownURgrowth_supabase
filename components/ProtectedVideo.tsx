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
    // Screenshot blocking - blackout content when shortcuts detected
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isPlaying && (
          e.key === 'PrintScreen' || 
          (e.metaKey && e.shiftKey && ['3', '4', '5'].includes(e.key)) ||
          (e.ctrlKey && e.shiftKey && e.key === 'S')
        )) {
        
        // Immediately black out the entire screen
        const blackout = document.createElement('div');
        blackout.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: #000000;
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 24px;
          font-weight: bold;
        `;
        blackout.innerHTML = '🚫 Screenshot Blocked';
        document.body.appendChild(blackout);
        
        // Remove blackout after 2 seconds
        setTimeout(() => {
          if (document.body.contains(blackout)) {
            document.body.removeChild(blackout);
          }
        }, 2000);
        
        // Also pause the video
        if (videoRef.current) {
          videoRef.current.pause();
        }
      }
    };

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

    // Add event listeners
    document.addEventListener('keydown', handleKeyDown, true); // Use capture phase
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isPlaying]);

  return (
    <div className="relative w-full max-w-4xl mx-auto bg-black rounded-lg overflow-hidden">
      {/* Blue overlay when tab is hidden */}
      {isHidden && (
        <div className="absolute inset-0 bg-blue-500 z-50 flex items-center justify-center">
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

      {/* Protection notice - shows current status */}
      <div className="absolute top-4 right-4 text-[#141619] px-3 py-1 rounded text-sm">
        {isPlaying ? (
          <span className="bg-red-500/90">🔒 Screenshots Blocked</span>
        ) : (
          <span className="bg-gray-500/90">⏸️ Protection Inactive</span>
        )}
      </div>
    </div>
  );
}
