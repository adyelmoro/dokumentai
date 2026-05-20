-- ============================================================
-- DokumentAI — Supabase setup
-- Run this in: Supabase Dashboard → SQL Editor
-- ============================================================

-- 1. Enable pgvector
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Documents table
CREATE TABLE IF NOT EXISTS documents (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID REFERENCES auth.users NOT NULL,
  name        TEXT NOT NULL,
  file_path   TEXT NOT NULL,
  file_type   TEXT NOT NULL CHECK (file_type IN ('pdf', 'docx')),
  file_size   INTEGER NOT NULL,
  chunk_count INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own documents"
  ON documents FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 3. Document chunks table (with 768-dim vectors for text-embedding-004)
CREATE TABLE IF NOT EXISTS document_chunks (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  document_id UUID REFERENCES documents(id) ON DELETE CASCADE NOT NULL,
  user_id     UUID REFERENCES auth.users NOT NULL,
  content     TEXT NOT NULL,
  chunk_index INTEGER NOT NULL,
  embedding   vector(768),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE document_chunks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own chunks"
  ON document_chunks FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- IVFFlat index for cosine similarity search
CREATE INDEX IF NOT EXISTS document_chunks_embedding_idx
  ON document_chunks
  USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);

-- 4. Similarity search RPC function
CREATE OR REPLACE FUNCTION match_chunks(
  query_embedding vector(768),
  document_id     UUID,
  match_count     INT DEFAULT 5
)
RETURNS TABLE (
  id          UUID,
  content     TEXT,
  chunk_index INTEGER,
  similarity  FLOAT
)
LANGUAGE SQL STABLE SECURITY DEFINER AS $$
  SELECT
    dc.id,
    dc.content,
    dc.chunk_index,
    1 - (dc.embedding <=> query_embedding) AS similarity
  FROM document_chunks dc
  WHERE dc.document_id = match_chunks.document_id
    AND dc.user_id = auth.uid()
  ORDER BY dc.embedding <=> query_embedding
  LIMIT match_count;
$$;

-- 5. Storage bucket
-- Go to: Storage → New bucket → Name: "dokumentai-uploads" → Private
-- Then add these policies in Storage → Policies:

-- Policy: Users can upload their own files
-- Allowed operation: INSERT
-- Target roles: authenticated
-- WITH CHECK: (auth.uid()::text = (storage.foldername(name))[1])

-- Policy: Users can read their own files
-- Allowed operation: SELECT
-- USING: (auth.uid()::text = (storage.foldername(name))[1])

-- Policy: Users can delete their own files
-- Allowed operation: DELETE
-- USING: (auth.uid()::text = (storage.foldername(name))[1])
