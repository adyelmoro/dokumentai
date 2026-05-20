import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import NavBar from '@/components/ui/NavBar';
import ChatWindow from '@/components/chat/ChatWindow';
import Link from 'next/link';
import type { Document } from '@/lib/types';

export default async function DocumentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: document } = await supabase
    .from('documents')
    .select('*')
    .eq('id', id)
    .single();

  if (!document) notFound();

  const doc = document as Document;
  const fileSize =
    doc.file_size < 1024 * 1024
      ? `${Math.round(doc.file_size / 1024)} KB`
      : `${(doc.file_size / (1024 * 1024)).toFixed(1)} MB`;

  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="flex-1 flex flex-col min-h-0 max-w-4xl w-full mx-auto px-4 py-6">
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
          <Link
            href="/library"
            className="text-gray-400 hover:text-gray-600 transition-colors text-sm"
          >
            ← Tilbake
          </Link>
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold text-blue-600 uppercase">{doc.file_type}</span>
            </div>
            <div className="min-w-0">
              <h1 className="font-semibold text-gray-900 truncate text-sm">{doc.name}</h1>
              <p className="text-xs text-gray-500">
                {fileSize} · {doc.chunk_count} avsnitt indeksert
              </p>
            </div>
          </div>
        </div>

        <ChatWindow documentId={doc.id} />
      </div>
    </div>
  );
}
