'use client';

import { useEffect } from 'react';

export function useContentProtection() {
  useEffect(() => {
    // Screenshot blocking
    const blockScreenshots = (e: KeyboardEvent) => {
      // Print Screen, Cmd+Shift+3/4/5 (Mac), Ctrl+Shift+S (Windows)
      if (e.key === 'PrintScreen' || 
          (e.metaKey && e.shiftKey && ['3', '4', '5'].includes(e.key)) ||
          (e.ctrlKey && e.shiftKey && e.key === 'S')) {
        e.preventDefault();
        e.stopPropagation();
        
        // Show warning
        const warning = document.createElement('div');
        warning.innerHTML = '⚠️ Screenshots are blocked on this page';
        warning.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          background: #ef4444;
          color: white;
          padding: 12px 20px;
          border-radius: 8px;
          z-index: 10000;
          font-weight: bold;
        `;
        document.body.appendChild(warning);
        
        setTimeout(() => {
          document.body.removeChild(warning);
        }, 3000);
      }
    };

    // Tab switching protection - content turns blue
    const handleVisibilityChange = () => {
      const videos = document.querySelectorAll('video');
      
      if (document.hidden) {
        // Pause all videos when tab is hidden
        videos.forEach(video => video.pause());
        
        // Add blue overlay to body
        document.body.style.backgroundColor = '#3b82f6';
        document.body.style.color = '#ffffff';
        
        // Create blue overlay
        const overlay = document.createElement('div');
        overlay.id = 'protection-overlay';
        overlay.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: #3b82f6;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 24px;
          font-weight: bold;
        `;
        overlay.innerHTML = `
          <div style="text-align: center;">
            <h2>Content Protected</h2>
            <p style="font-size: 16px; margin-top: 10px;">Return to this tab to continue</p>
          </div>
        `;
        document.body.appendChild(overlay);
      } else {
        // Remove blue overlay when tab is visible
        document.body.style.backgroundColor = '';
        document.body.style.color = '';
        
        const overlay = document.getElementById('protection-overlay');
        if (overlay) {
          document.body.removeChild(overlay);
        }
      }
    };

    // Screen recording detection using getDisplayMedia
    const detectScreenRecording = () => {
      if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
        const originalGetDisplayMedia = navigator.mediaDevices.getDisplayMedia;
        
        navigator.mediaDevices.getDisplayMedia = function(...args) {
          // Show recording warning
          const warning = document.createElement('div');
          warning.innerHTML = '🚫 Screen recording detected and blocked!';
          warning.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #dc2626;
            color: white;
            padding: 20px 30px;
            border-radius: 12px;
            z-index: 10001;
            font-weight: bold;
            font-size: 18px;
            text-align: center;
          `;
          document.body.appendChild(warning);
          
          setTimeout(() => {
            if (document.body.contains(warning)) {
              document.body.removeChild(warning);
            }
          }, 5000);
          
          // Block the recording attempt
          return Promise.reject(new Error('Screen recording is not allowed'));
        };
      }
    };

    // Add event listeners
    document.addEventListener('keydown', blockScreenshots);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    detectScreenRecording();

    // Cleanup
    return () => {
      document.removeEventListener('keydown', blockScreenshots);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      
      // Reset any protection overlays
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
      const overlay = document.getElementById('protection-overlay');
      if (overlay) {
        document.body.removeChild(overlay);
      }
    };
  }, []);
}
