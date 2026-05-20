import { createClient } from '@/lib/supabase/server';
import NavBar from '@/components/ui/NavBar';
import LibraryView from '@/components/library/LibraryView';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import type { Document } from '@/lib/types';

export const metadata = { title: 'DokumentAI' };

export default async function LibraryPage() {
  const supabase = await createClient();
  const { data: documents } = await supabase
    .from('documents')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <>
      <NavBar />
      <ErrorBoundary label="biblioteket">
        <LibraryView documents={(documents as Document[]) ?? []} />
      </ErrorBoundary>
    </>
  );
}
