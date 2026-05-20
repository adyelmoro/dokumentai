import Link from 'next/link';
import type { Document } from '@/lib/types';
import DeleteDocumentButton from './DeleteDocumentButton';

export default function DocumentCard({ document }: { document: Document }) {
  const fileSize =
    document.file_size < 1024 * 1024
      ? `${Math.round(document.file_size / 1024)} KB`
      : `${(document.file_size / (1024 * 1024)).toFixed(1)} MB`;

  const uploadedDate = new Date(document.created_at).toLocaleDateString('nb-NO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-200 hover:shadow-sm transition-all">
      <Link href={`/library/${document.id}`} className="block mb-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-bold text-blue-600 uppercase">
              {document.file_type}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-gray-900 truncate text-sm">{document.name}</p>
            <p className="text-xs text-gray-500 mt-0.5">
              {fileSize} · {document.chunk_count} avsnitt
            </p>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-2">Lastet opp {uploadedDate}</p>
      </Link>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <Link
          href={`/library/${document.id}`}
          className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
        >
          Åpne chat →
        </Link>
        <DeleteDocumentButton documentId={document.id} />
      </div>
    </div>
  );
}
