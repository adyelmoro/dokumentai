# DokumentAI — Build Plan

**Project:** Portfolio Project #2
**Developer:** Ayyad Anwar
**Started:** 2026-05-20
**Target:** Deployed + documented in ~2 weeks

---

## Stack Decisions

| Layer | Technology | Reason |
|-------|-----------|--------|
| Framework | Next.js 16 (App Router) | Same as StrømVei |
| Language | TypeScript strict | Norwegian market baseline |
| Styling | Tailwind CSS | Same as StrømVei |
| AI Chat | Gemini 2.0 Flash | Free tier, strong for document Q&A |
| Embeddings | Gemini text-embedding-004 | Free, 768 dims, keeps stack in one API key |
| Vector DB | Supabase pgvector | Integrated with existing DB |
| File storage | Supabase Storage | PDF/docx uploads |
| Document parsing | pdf-parse (PDF) + mammoth (docx) | Server-side npm packages |
| Auth | Supabase Auth (Google Sign-In) | Same pattern as StrømVei |
| Deployment | Vercel | Same as StrømVei |

---

## Phases

### Phase 1 — Foundation (Day 1)
- [x] Scaffold Next.js app
- [ ] Install all dependencies
- [ ] Configure Supabase project (pgvector extension, tables, storage bucket)
- [ ] Set up environment variables
- [ ] Supabase Auth with Google Sign-In
- [ ] Basic layout + bilingual UI shell (NO/EN toggle)

### Phase 2 — Document Upload (Day 2)
- [ ] Upload page with drag-and-drop (react-dropzone)
- [ ] Supabase Storage upload (PDF + docx, max 10MB)
- [ ] Server-side parsing: pdf-parse for PDF, mammoth for docx
- [ ] Chunking strategy: ~500 token chunks with 50-token overlap
- [ ] Gemini text-embedding-004 — embed each chunk
- [ ] Store chunks + embeddings in pgvector table
- [ ] Document library entry created on upload

### Phase 3 — Q&A Chat (Day 3)
- [ ] Chat UI (message thread, input box, loading state)
- [ ] Question → embed with Gemini text-embedding-004
- [ ] pgvector cosine similarity search (top 5 chunks)
- [ ] Build prompt with retrieved chunks as context
- [ ] Gemini 2.0 Flash generates answer with source references
- [ ] Display answer + chunk citations in chat

### Phase 4 — Document Library (Day 4)
- [ ] Library page: list all user's documents
- [ ] Document detail: metadata, upload date, chunk count
- [ ] Delete document (removes storage file + all chunks)
- [ ] Empty state + loading skeleton

### Phase 5 — Polish + Deploy (Day 5)
- [ ] Norwegian/English UI strings complete
- [ ] Error boundaries on all major sections
- [ ] Loading + empty states on all data-fetching components
- [ ] Mobile responsive check
- [ ] Vercel deploy
- [ ] README with screenshots + tech stack
- [ ] .env.example documented
- [ ] CV update

---

## Environment Variables Required

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
GEMINI_API_KEY=
```

---

## Supabase Setup Needed

1. Enable pgvector extension
2. Create `documents` table
3. Create `document_chunks` table with vector(768) column
4. Create `dokumentai-uploads` storage bucket
5. RLS policies for all tables
