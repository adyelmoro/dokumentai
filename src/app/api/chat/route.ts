import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { embedText, generateAnswer } from '@/lib/gemini';
import type { ChunkMatch, ChatMessage } from '@/lib/types';

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Ikke autentisert' }, { status: 401 });
  }

  const { documentId, question, history } = (await request.json()) as {
    documentId: string;
    question: string;
    history: ChatMessage[];
  };

  if (!documentId || !question?.trim()) {
    return NextResponse.json({ error: 'Ugyldig forespørsel' }, { status: 400 });
  }

  let queryEmbedding: number[];
  try {
    queryEmbedding = await embedText(question);
  } catch {
    return NextResponse.json({ error: 'Embedding av spørsmål mislyktes' }, { status: 500 });
  }

  const { data: chunks, error: searchError } = await supabase.rpc('match_chunks', {
    query_embedding: queryEmbedding,
    document_id: documentId,
    match_count: 5,
  });

  if (searchError || !chunks?.length) {
    return NextResponse.json(
      { error: 'Ingen relevante avsnitt funnet i dokumentet' },
      { status: 404 }
    );
  }

  let answer: string;
  try {
    answer = await generateAnswer(
      question,
      chunks as ChunkMatch[],
      history.slice(-6)
    );
  } catch {
    return NextResponse.json({ error: 'Svar-generering mislyktes' }, { status: 500 });
  }

  return NextResponse.json({
    answer,
    sources: (chunks as ChunkMatch[]).slice(0, 3),
  });
}
