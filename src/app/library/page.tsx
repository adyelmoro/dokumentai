import { createClient } from '@/lib/supabase/server';
import NavBar from '@/components/ui/NavBar';
import DocumentCard from '@/components/documents/DocumentCard';
import Link from 'next/link';
import type { Document } from '@/lib/types';

export const metadata = { title: 'Mine dokumenter — DokumentAI' };

export default async function LibraryPage() {
  const supabase = await createClient();
  const { data: documents } = await supabase
    .from('documents')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <>
      <NavBar />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Mine dokumenter</h1>
          <Link
            href="/upload"
            className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            + Last opp
          </Link>
        </div>

        {!documents?.length ? (
          <div className="text-center py-28 text-gray-400">
            <p className="text-4xl mb-4">📂</p>
            <p className="text-lg font-medium text-gray-500">Ingen dokumenter ennå</p>
            <p className="text-sm mt-1">
              Last opp et PDF- eller Word-dokument for å komme i gang
            </p>
            <Link
              href="/upload"
              className="mt-6 inline-block bg-blue-600 text-white text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Last opp dokument
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(documents as Document[]).map((doc) => (
              <DocumentCard key={doc.id} document={doc} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
