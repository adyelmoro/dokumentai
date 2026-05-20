# DokumentAI — Technical Specification

**Last updated:** 2026-05-20

---

## Architecture Overview

```
User Browser
    │
    ▼
Next.js App (Vercel)
    ├── /app/page.tsx                    — Landing / auth
    ├── /app/library/page.tsx            — Document library
    ├── /app/library/[id]/page.tsx       — Document + chat view
    ├── /app/upload/page.tsx             — Upload flow
    └── /app/api/
        ├── /upload/route.ts             — Parse + chunk + embed
        ├── /chat/route.ts               — RAG Q&A
        └── /documents/[id]/route.ts     — Delete document
    │
    ▼
Supabase (PostgreSQL + pgvector + Storage)
    ├── documents table
    ├── document_chunks table (vectors)
    └── dokumentai-uploads bucket
    │
    ▼
Google Gemini API
    ├── text-embedding-004   — chunk + query embeddings
    └── gemini-2.0-flash     — answer generation
```

---

## Database Schema

### `documents` table
```sql
CREATE TABLE documents (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID REFERENCES auth.users NOT NULL,
  name        TEXT NOT NULL,
  file_path   TEXT NOT NULL,       -- Supabase Storage path
  file_type   TEXT NOT NULL,       -- 'pdf' | 'docx'
  file_size   INTEGER NOT NULL,    -- bytes
  chunk_count INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
```

### `document_chunks` table
```sql
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE document_chunks (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  document_id UUID REFERENCES documents(id) ON DELETE CASCADE NOT NULL,
  user_id     UUID REFERENCES auth.users NOT NULL,
  content     TEXT NOT NULL,
  chunk_index INTEGER NOT NULL,
  embedding   vector(768),         -- Gemini text-embedding-004 output
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX ON document_chunks USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);
```

### RLS Policies
All tables: users can only SELECT/INSERT/DELETE their own rows (`user_id = auth.uid()`).

---

## API Routes

### POST `/api/upload`
- Receives: `FormData` with `file` field
- Auth: Supabase session cookie
- Steps:
  1. Validate file type (pdf/docx) and size (≤10MB)
  2. Upload to Supabase Storage: `dokumentai-uploads/{user_id}/{uuid}.{ext}`
  3. Parse text: `pdf-parse` for PDF, `mammoth` for docx
  4. Chunk text into ~500-token segments with 50-token overlap
  5. Embed each chunk with `text-embedding-004`
  6. Insert document row + all chunk rows in Supabase
- Returns: `{ documentId, chunkCount }`

### POST `/api/chat`
- Receives: `{ documentId, question, history[] }`
- Auth: Supabase session cookie
- Steps:
  1. Embed question with `text-embedding-004`
  2. pgvector similarity search: top 5 chunks from this document
  3. Build prompt with system instruction + retrieved chunks + conversation history
  4. Call `gemini-2.0-flash` with streaming disabled (MVP)
  5. Return answer + source chunk indices
- Returns: `{ answer, sources: [{ chunkIndex, content }] }`

### DELETE `/api/documents/[id]`
- Auth: Supabase session cookie
- Steps:
  1. Verify document belongs to current user
  2. Delete Supabase Storage file
  3. Delete document row (cascades to chunks via FK)
- Returns: `{ success: true }`

---

## Chunking Strategy

```
chunk size:    500 tokens (~375 words)
overlap:       50 tokens  (~37 words)
separator:     paragraph breaks first, then sentence breaks, then hard split
min chunk:     100 tokens — discard smaller fragments
```

Token approximation: `text.length / 4` (good enough for chunking, no tokenizer needed)

---

## Embedding + Similarity Search

```typescript
// Embed a text
const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
const result = await model.embedContent(text);
const embedding = result.embedding.values; // float32[768]

// Search in pgvector (via Supabase RPC)
const { data } = await supabase.rpc('match_chunks', {
  query_embedding: embedding,
  document_id: docId,
  match_count: 5
});
```

```sql
-- Supabase RPC function
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
LANGUAGE SQL STABLE AS $$
  SELECT id, content, chunk_index,
         1 - (embedding <=> query_embedding) AS similarity
  FROM document_chunks
  WHERE document_chunks.document_id = match_chunks.document_id
  ORDER BY embedding <=> query_embedding
  LIMIT match_count;
$$;
```

---

## Gemini Prompt Template

```
System: You are a document assistant. Answer questions based ONLY on the provided document excerpts.
If the answer is not in the excerpts, say so. Always cite which excerpt supports your answer.
Respond in the same language the user asked in (Norwegian or English).

Document excerpts:
[Excerpt 1]: {content}
[Excerpt 2]: {content}
...

Conversation history:
{history}

User question: {question}
```

---

## File Structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                     — Landing/login
│   ├── library/
│   │   ├── page.tsx                 — Document list
│   │   └── [id]/
│   │       └── page.tsx             — Document + chat
│   ├── upload/
│   │   └── page.tsx                 — Upload flow
│   └── api/
│       ├── upload/route.ts
│       ├── chat/route.ts
│       └── documents/[id]/route.ts
├── components/
│   ├── auth/
│   │   └── AuthButton.tsx
│   ├── chat/
│   │   ├── ChatWindow.tsx
│   │   ├── ChatMessage.tsx
│   │   └── ChatInput.tsx
│   ├── documents/
│   │   ├── DocumentCard.tsx
│   │   └── DocumentLibrary.tsx
│   ├── upload/
│   │   └── UploadZone.tsx
│   └── ui/
│       ├── LanguageToggle.tsx
│       └── NavBar.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts                — Browser client
│   │   ├── server.ts                — Server client
│   │   └── middleware.ts
│   ├── gemini.ts                    — Gemini client + helpers
│   ├── chunker.ts                   — Text chunking logic
│   └── types.ts                     — Shared TypeScript types
└── middleware.ts                    — Auth middleware
```

---

## Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Google Gemini
GEMINI_API_KEY=AIza...
```
