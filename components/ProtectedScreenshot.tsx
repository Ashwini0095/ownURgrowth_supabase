'use client';

import type { ReactNode, SyntheticEvent } from 'react';

type ProtectedScreenshotProps = {
  children: ReactNode;
  className?: string;
};

export default function ProtectedScreenshot({
  children,
  className = '',
}: ProtectedScreenshotProps) {
  const preventDefault = (event: SyntheticEvent) => {
    event.preventDefault();
  };

  return (
    <div
      className={className}
      onContextMenu={preventDefault}
      onDragStart={preventDefault}
      style={{ WebkitUserSelect: 'none', userSelect: 'none' }}
    >
      {children}
    </div>
  );
}
