import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import NavBar from '@/components/ui/NavBar';
import DocumentHeader from '@/components/library/DocumentHeader';
import ChatWindow from '@/components/chat/ChatWindow';
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

  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="flex-1 flex flex-col min-h-0 max-w-4xl w-full mx-auto px-4 py-6">
        <DocumentHeader document={document as Document} />
        <ChatWindow documentId={document.id} />
      </div>
    </div>
  );
}
