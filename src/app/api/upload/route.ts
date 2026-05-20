import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { chunkText } from '@/lib/chunker';
import { embedBatch } from '@/lib/gemini';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Ikke autentisert' }, { status: 401 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: 'Ugyldig forespørsel' }, { status: 400 });
  }

  const file = formData.get('file') as File | null;

  if (!file) {
    return NextResponse.json({ error: 'Ingen fil angitt' }, { status: 400 });
  }

  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json({ error: 'Filen er for stor (maks 10 MB)' }, { status: 400 });
  }

  const isPdf =
    file.name.toLowerCase().endsWith('.pdf') || file.type === 'application/pdf';
  const isDocx =
    file.name.toLowerCase().endsWith('.docx') ||
    file.type ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

  if (!isPdf && !isDocx) {
    return NextResponse.json({ error: 'Kun PDF og DOCX støttes' }, { status: 400 });
  }

  const fileType = isPdf ? 'pdf' : 'docx';
  const filePath = `${user.id}/${uuidv4()}.${fileType}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error: storageError } = await supabase.storage
    .from('dokumentai-uploads')
    .upload(filePath, buffer, { contentType: file.type });

  if (storageError) {
    return NextResponse.json({ error: 'Opplasting til lagring mislyktes' }, { status: 500 });
  }

  let text: string;
  try {
    if (isPdf) {
      // pdf-parse v1 exports the parse function as default (CJS)
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const pdfParse = require('pdf-parse') as (buf: Buffer) => Promise<{ text: string }>;
      const result = await pdfParse(buffer);
      text = result.text;
    } else {
      const mammoth = await import('mammoth');
      const result = await mammoth.extractRawText({ buffer });
      text = result.value;
    }
  } catch {
    await supabase.storage.from('dokumentai-uploads').remove([filePath]);
    return NextResponse.json({ error: 'Kunne ikke lese dokumentet' }, { status: 500 });
  }

  if (!text.trim()) {
    await supabase.storage.from('dokumentai-uploads').remove([filePath]);
    return NextResponse.json(
      { error: 'Dokumentet ser ut til å være tomt eller inneholder ingen tekst som kan leses' },
      { status: 400 }
    );
  }

  const chunks = chunkText(text);

  let embeddings: number[][];
  try {
    embeddings = await embedBatch(chunks);
  } catch {
    await supabase.storage.from('dokumentai-uploads').remove([filePath]);
    return NextResponse.json({ error: 'Embedding-prosessen mislyktes' }, { status: 500 });
  }

  const { data: document, error: docError } = await supabase
    .from('documents')
    .insert({
      user_id: user.id,
      name: file.name,
      file_path: filePath,
      file_type: fileType,
      file_size: file.size,
      chunk_count: chunks.length,
    })
    .select()
    .single();

  if (docError || !document) {
    await supabase.storage.from('dokumentai-uploads').remove([filePath]);
    return NextResponse.json({ error: 'Lagring av dokument mislyktes' }, { status: 500 });
  }

  const { error: chunksError } = await supabase.from('document_chunks').insert(
    chunks.map((content, index) => ({
      document_id: document.id,
      user_id: user.id,
      content,
      chunk_index: index,
      embedding: embeddings[index],
    }))
  );

  if (chunksError) {
    await supabase.from('documents').delete().eq('id', document.id);
    await supabase.storage.from('dokumentai-uploads').remove([filePath]);
    return NextResponse.json({ error: 'Indeksering av dokument mislyktes' }, { status: 500 });
  }

  return NextResponse.json({ documentId: document.id, chunkCount: chunks.length });
}
