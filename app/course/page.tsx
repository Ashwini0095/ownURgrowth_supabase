'use client';

import { useEffect, useState } from 'react';
import DRMVideoPlayer from '../../components/DRMVideoPlayer';
import { getBrowserDRMSupport, checkHardwareAcceleration } from '../../lib/drmUtils';

export default function CoursePage() {
  const [drmInfo, setDrmInfo] = useState<any>(null);
  const [hwAcceleration, setHwAcceleration] = useState<boolean>(false);

  useEffect(() => {
    const drmSupport = getBrowserDRMSupport();
    setDrmInfo(drmSupport);
    
    checkHardwareAcceleration().then(setHwAcceleration);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">LinkedIn Decoded - Course Video</h1>
        
        {/* DRM Status */}
        {drmInfo && (
          <div className={`mb-6 p-4 rounded-lg ${
            drmInfo.canBlackout ? 'bg-green-900/30 border-green-500/30' : 'bg-red-900/30 border-red-500/30'
          } border`}>
            <div className="flex items-center gap-2 mb-2">
              <span className={drmInfo.canBlackout ? 'text-green-400' : 'text-red-400'}>
                {drmInfo.canBlackout ? '🔒' : '⚠️'}
              </span>
              <span className="font-medium">
                {drmInfo.browser} - {drmInfo.drm} ({drmInfo.protection} Protection)
              </span>
            </div>
            <p className="text-sm text-slate-300">
              {drmInfo.canBlackout 
                ? 'Screenshots will appear as black boxes' 
                : 'Limited screenshot protection - content is watermarked for traceability'
              }
            </p>
            {!hwAcceleration && (
              <p className="text-yellow-300 text-sm mt-2">
                ⚠️ Hardware acceleration disabled - enable for better protection
              </p>
            )}
          </div>
        )}
        
        <div className="mb-8">
          <DRMVideoPlayer 
            src="/path/to/your/course-video.mp4"
            title="Module 1: LinkedIn Profile Optimization"
          />
        </div>

        {/* Recommended Browsers */}
        <div className="bg-slate-900 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">🛡️ Maximum Protection</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="bg-slate-800 p-3 rounded">
              <strong className="text-green-400">Safari (Mac/iOS)</strong>
              <p className="text-slate-300">FairPlay DRM - Screenshots appear black</p>
            </div>
            <div className="bg-slate-800 p-3 rounded">
              <strong className="text-blue-400">Edge (Windows)</strong>
              <p className="text-slate-300">PlayReady DRM - Hardware protection</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Course Notes</h2>
          <div className="prose prose-invert">
            <p>This video covers the fundamentals of LinkedIn profile optimization...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
