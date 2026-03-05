'use client';

import dynamic from 'next/dynamic';

const NotesViewer = dynamic(() => import('./NotesViewer'), { ssr: false });

type Props = { pdfUrl: string };

export default function NotesViewerWrapper({ pdfUrl }: Props) {
  return <NotesViewer pdfUrl={pdfUrl} />;
}
