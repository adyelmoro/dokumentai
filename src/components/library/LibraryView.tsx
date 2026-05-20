'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import DocumentCard from '@/components/documents/DocumentCard';
import type { Document } from '@/lib/types';

export default function LibraryView({ documents }: { documents: Document[] }) {
  const { t } = useLanguage();
  const l = t.library;

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6 gap-4">
        <h1 className="text-xl sm:text-2xl font-bold text-white truncate">{l.title}</h1>
        <Link
          href="/upload"
          className="flex-shrink-0 bg-indigo-500/70 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-indigo-400/80 border border-indigo-400/30 transition-all"
        >
          {l.uploadBtn}
        </Link>
      </div>

      {!documents.length ? (
        <div className="text-center py-28">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/8 border border-white/12 flex items-center justify-center">
            <svg className="w-8 h-8 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
          </div>
          <p className="text-lg font-medium text-white/60">{l.emptyTitle}</p>
          <p className="text-sm mt-1 text-white/35">{l.emptyDesc}</p>
          <Link
            href="/upload"
            className="mt-6 inline-block bg-indigo-500/70 backdrop-blur-sm text-white text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-indigo-400/80 border border-indigo-400/30 transition-all"
          >
            {l.emptyBtn}
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {documents.map((doc) => (
            <DocumentCard key={doc.id} document={doc} />
          ))}
        </div>
      )}
    </main>
  );
}
