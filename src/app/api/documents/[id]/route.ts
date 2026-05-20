import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Ikke autentisert' }, { status: 401 });
  }

  const { data: document } = await supabase
    .from('documents')
    .select('file_path')
    .eq('id', id)
    .eq('user_id', user.id)
    .single();

  if (!document) {
    return NextResponse.json({ error: 'Dokument ikke funnet' }, { status: 404 });
  }

  await supabase.storage.from('dokumentai-uploads').remove([document.file_path]);
  await supabase.from('documents').delete().eq('id', id);

  return NextResponse.json({ success: true });
}
