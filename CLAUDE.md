# DokumentAI — Session Context
**Project:** Portfolio Project #2 — Norwegian business document AI assistant
**Developer:** Ayyad Anwar | iamayyad@gmail.com | github.com/adyelmoro
**Project directory:** A:\ClaudeAI\MyAI-Projects\dokumentai
**Parent context:** A:\ClaudeAI\MyAI-Projects\CLAUDE.md
**GitHub:** https://github.com/adyelmoro/dokumentai
**Supabase project:** https://cxeuqvgohduompekgsjz.supabase.co

---

## What This Project Is

DokumentAI lets Norwegian businesses upload PDF/Word documents and ask questions about them in Norwegian or English. The AI reads the document, chunks and embeds it, and answers questions with citations back to the source.

Target users: Norwegian SMEs, accountants, lawyers, consultants.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.2.6 (App Router) |
| Language | TypeScript strict |
| Styling | Tailwind CSS v4 |
| AI Chat | Gemini 2.5 Flash (gemini-2.5-flash) |
| Embeddings | gemini-embedding-001 (768 dims via outputDimensionality) |
| Vector DB | Supabase pgvector |
| File storage | Supabase Storage (bucket: dokumentai-uploads) |
| Document parsing | pdf-parse v1.1.1 (PDF) + mammoth (docx) |
| Auth | Supabase Auth — Google Sign-In |
| Deployment | Vercel |

---

## Current Phase: 5 — Language Toggle (next session)

See PLAN.md for full phase breakdown. See PROJECT-TRACKER.md for task status.

**Rule: Never move to the next phase until Ayyad confirms the testing checklist passes.**

---

## Key File Locations

```
src/
├── proxy.ts                         — Auth proxy (Next.js 16: proxy, not middleware)
├── app/
│   ├── page.tsx                     — Landing / auth wall
│   ├── library/page.tsx             — Document library
│   ├── library/[id]/page.tsx        — Document + chat
│   ├── upload/page.tsx              — Upload flow
│   └── api/
│       ├── upload/route.ts          — Parse + chunk + embed + store
│       ├── chat/route.ts            — RAG Q&A
│       └── documents/[id]/route.ts  — Delete document
├── components/
│   ├── auth/AuthButton.tsx
│   ├── chat/{ChatWindow,ChatMessage,ChatInput}.tsx
│   ├── documents/{DocumentCard,DeleteDocumentButton}.tsx
│   ├── upload/UploadZone.tsx
│   └── ui/{NavBar,SignOutButton}.tsx
└── lib/
    ├── supabase/{client,server,middleware}.ts
    ├── gemini.ts                    — embedText, embedBatch, generateAnswer
    ├── chunker.ts                   — chunkText (500 tok, 50 overlap)
    └── types.ts
```

---

## Important Technical Notes

- **proxy.ts not middleware.ts** — Next.js 16 renamed the convention. File is `src/proxy.ts`, exports `proxy` function.
- **pdf-parse is v1.1.1** — v2 has completely different API (class-based, no function call). Must stay on v1.
- **pdf-parse import** — Uses `require('pdf-parse')` not ESM import, to avoid module resolution issues.
- **Embedding dimensions** — text-embedding-004 outputs 768 dims. Supabase schema uses `vector(768)`.
- **Gemini rate limiting** — embedBatch adds 50ms delay between calls to stay within free tier limits.
- **Async params** — Next.js 16 dynamic route params are Promises. Always `await params` in pages and route handlers.
- **Supabase storage paths** — Files stored at `{user_id}/{uuid}.{ext}`. RLS policy checks `foldername(name)[1] = auth.uid()`.
- **match_chunks RPC** — Defined in Supabase SQL. Uses `SECURITY DEFINER` + `auth.uid()` check.

---

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://cxeuqvgohduompekgsjz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
GEMINI_API_KEY=...
```

---

## MVP Feature Set (build these, nothing more)

1. **Document upload** — PDF and .docx, max 10MB ✅
2. **Automatic chunking + embedding** — Gemini text-embedding-004 + pgvector ✅
3. **Q&A chat** — RAG with Gemini 2.0 Flash, source citations ✅
4. **Document library** — list + delete ✅
5. **Auth** — Google Sign-In via Supabase ✅
6. **Bilingual UI** — Norwegian default, English toggle ⏳ Phase 5

---

## Phase Gate Rule

After every phase completion:
1. Claude posts a testing checklist
2. Ayyad tests and reports back
3. Claude fixes any bugs found
4. Ayyad confirms all items pass
5. Only then: move to next phase

---

## Standing Instructions

- After every phase, give Ayyad a testing checklist before moving on
- Never move to the next phase until Ayyad confirms the checklist passes
- CV update rule: when project ships, update BOTH Projects section AND cover letter in cv-build-may.js simultaneously, then rebuild
- CV build script: `node C:/tmp/cv-build-may.js`
- CV output: `A:\CV\2026\MAY2026\AyyadAnwar_CV_052026-Com.docx`
- GitHub: push clean commits with conventional commit format
- All keys: rotated after being shared in plaintext — never hardcode
