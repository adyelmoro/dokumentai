import { createClient } from '@/lib/supabase/server';
import NavBar from '@/components/ui/NavBar';
import LibraryView from '@/components/library/LibraryView';
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
      <LibraryView documents={(documents as Document[]) ?? []} />
    </>
  );
}
