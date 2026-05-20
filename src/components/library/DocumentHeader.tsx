'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Document } from '@/lib/types';

export default function DocumentHeader({ document }: { document: Document }) {
  const { t, lang } = useLanguage();

  const fileSize =
    document.file_size < 1024 * 1024
      ? `${Math.round(document.file_size / 1024)} KB`
      : `${(document.file_size / (1024 * 1024)).toFixed(1)} MB`;

  return (
    <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
      <Link
        href="/library"
        className="text-white/40 hover:text-white/70 transition-colors text-sm flex-shrink-0"
      >
        {t.document.back}
      </Link>
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="w-9 h-9 bg-indigo-500/20 border border-indigo-400/25 rounded-xl flex items-center justify-center flex-shrink-0">
          <span className="text-xs font-bold text-indigo-300 uppercase">{document.file_type}</span>
        </div>
        <div className="min-w-0">
          <h1 className="font-semibold text-white/90 truncate text-sm">{document.name}</h1>
          <p className="text-xs text-white/40">
            {fileSize} · {t.document.chunks(document.chunk_count)}
          </p>
        </div>
      </div>
    </div>
  );
}
