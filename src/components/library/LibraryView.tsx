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
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{l.title}</h1>
        <Link
          href="/upload"
          className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {l.uploadBtn}
        </Link>
      </div>

      {!documents.length ? (
        <div className="text-center py-28 text-gray-400">
          <p className="text-4xl mb-4">📂</p>
          <p className="text-lg font-medium text-gray-500">{l.emptyTitle}</p>
          <p className="text-sm mt-1">{l.emptyDesc}</p>
          <Link
            href="/upload"
            className="mt-6 inline-block bg-blue-600 text-white text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
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
