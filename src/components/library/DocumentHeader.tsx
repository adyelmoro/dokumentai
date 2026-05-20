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
    <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
      <Link
        href="/library"
        className="text-gray-400 hover:text-gray-600 transition-colors text-sm flex-shrink-0"
      >
        {t.document.back}
      </Link>
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="text-xs font-bold text-blue-600 uppercase">{document.file_type}</span>
        </div>
        <div className="min-w-0">
          <h1 className="font-semibold text-gray-900 truncate text-sm">{document.name}</h1>
          <p className="text-xs text-gray-500">
            {fileSize} · {t.document.chunks(document.chunk_count)}
          </p>
        </div>
      </div>
    </div>
  );
}
