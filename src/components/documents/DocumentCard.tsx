'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Document } from '@/lib/types';
import DeleteDocumentButton from './DeleteDocumentButton';

export default function DocumentCard({ document }: { document: Document }) {
  const { t, lang } = useLanguage();
  const c = t.card;

  const fileSize =
    document.file_size < 1024 * 1024
      ? `${Math.round(document.file_size / 1024)} KB`
      : `${(document.file_size / (1024 * 1024)).toFixed(1)} MB`;

  const uploadedDate = new Date(document.created_at).toLocaleDateString(
    lang === 'no' ? 'nb-NO' : 'en-GB',
    { day: 'numeric', month: 'long', year: 'numeric' }
  );

  return (
    <div className="group bg-white/8 backdrop-blur-xl border border-white/12 rounded-2xl p-4 hover:bg-white/14 hover:border-white/22 transition-all shadow-lg shadow-black/10">
      <Link href={`/library/${document.id}`} className="block mb-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-indigo-500/20 border border-indigo-400/25 rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-bold text-indigo-300 uppercase">{document.file_type}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-white/90 truncate text-sm">{document.name}</p>
            <p className="text-xs text-white/45 mt-0.5">
              {fileSize} · {c.chunks(document.chunk_count)}
            </p>
          </div>
        </div>
        <p className="text-xs text-white/30 mt-2">
          {c.uploaded} {uploadedDate}
        </p>
      </Link>

      <div className="flex items-center justify-between pt-3 border-t border-white/8">
        <Link
          href={`/library/${document.id}`}
          className="text-sm font-medium text-indigo-300 hover:text-indigo-200 transition-colors"
        >
          {c.openChat}
        </Link>
        <DeleteDocumentButton documentId={document.id} />
      </div>
    </div>
  );
}
