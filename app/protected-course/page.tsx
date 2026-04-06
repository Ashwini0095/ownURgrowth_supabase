'use client';

import { useContentProtection } from '../../lib/useContentProtection';
import ProtectedVideo from '../../components/ProtectedVideo';

export default function ProtectedCoursePage() {
  // Apply content protection to the entire page
  useContentProtection();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-white text-[#141619] p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Protected Course Content</h1>
        
        <div className="mb-8">
          <ProtectedVideo 
            src="/path/to/your/course-video.mp4"
            title="LinkedIn Growth Masterclass"
          />
        </div>

        <div className="bg-white rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Course Notes</h2>
          <div className="prose prose-invert">
            <p>This content is protected against screenshots and screen recording...</p>
            <ul>
              <li>Print Screen key is blocked</li>
              <li>Screen recording detection active</li>
              <li>Content hidden when switching tabs</li>
            </ul>
          </div>
        </div>

        {/* Protection notice */}
        <div className="mt-8 bg-red-900/20 border border-red-500/30 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <span className="text-red-400">🔒</span>
            <span className="text-red-300 font-medium">Content Protection Active</span>
          </div>
          <ul className="text-red-200 text-sm mt-2 space-y-1">
            <li>• Screenshots are blocked (Print Screen, Cmd+Shift+3/4/5)</li>
            <li>• Screen recording is detected and prevented</li>
            <li>• Content is hidden when switching tabs</li>
            <li>• Right-click is disabled</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
