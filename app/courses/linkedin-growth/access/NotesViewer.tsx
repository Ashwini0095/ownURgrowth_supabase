'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;


type Props = { pdfUrl: string };

export default function NotesViewer({ pdfUrl }: Props) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoading(false);
    setError(null);
  }, []);

  const options = useMemo(
    () => ({
      cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
      cMapPacked: true,
      standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts/`,
    }),
    []
  );

  const onDocumentLoadError = useCallback((err: Error) => {
    setLoading(false);
    setError(err.message || 'Failed to load notes.');
  }, []);

  const goPrev = () => setPageNumber((p) => Math.max(1, p - 1));
  const goNext = () => setPageNumber((p) => Math.min(numPages, p + 1));

  if (error) {
    return (
      <div className="flex min-h-[28rem] items-center justify-center rounded-2xl border border-white/10 bg-slate-900/80 p-6 text-sm text-slate-400">
        {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col rounded-2xl border border-white/5 bg-slate-900/80">
      <div className="flex items-center justify-between gap-4 border-b border-white/5 px-4 py-3">
        <span className="text-xs font-medium text-slate-200 sm:text-sm">
          Course notes
        </span>
        {numPages > 0 && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goPrev}
              disabled={pageNumber <= 1}
              className="rounded-lg border border-white/10 bg-white/5 p-1.5 text-slate-300 transition hover:bg-white/10 hover:text-white disabled:opacity-40 disabled:hover:bg-white/5"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="min-w-[6rem] text-center text-xs font-medium text-slate-300 sm:text-sm">
              Page {pageNumber} of {numPages}
            </span>
            <button
              type="button"
              onClick={goNext}
              disabled={pageNumber >= numPages}
              className="rounded-lg border border-white/10 bg-white/5 p-1.5 text-slate-300 transition hover:bg-white/10 hover:text-white disabled:opacity-40 disabled:hover:bg-white/5"
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
      <div className="flex min-h-[32rem] justify-center overflow-auto bg-slate-800/50 p-4 sm:p-6">
        {loading && (
          <div className="flex items-center justify-center text-sm text-slate-400">
            Loading notes…
          </div>
        )}
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading=""
          options={options}
          className="flex justify-center"
        >
          <Page
            key={pageNumber}
            pageNumber={pageNumber}
            width={640}
            renderTextLayer={true}
            renderAnnotationLayer={true}
            className="rounded-lg bg-white shadow-lg"
          />
        </Document>
      </div>
      <p className="border-t border-white/5 px-4 py-2 text-[11px] text-slate-500">
        View-only. Notes are not available for download.
      </p>
    </div>
  );
}
