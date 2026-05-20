# DokumentAI — Session Context
**Project:** Portfolio Project #2 — Norwegian business document AI assistant
**Developer:** Ayyad Anwar | iamayyad@gmail.com | github.com/adyelmoro
**Project directory:** A:\ClaudeAI\MyAI-Projects\dokumentai
**Parent context:** A:\ClaudeAI\MyAI-Projects\CLAUDE.md

---

## What This Project Is

DokumentAI lets Norwegian businesses upload PDF/Word documents and ask questions about them in Norwegian or English. The AI reads the document, chunks and embeds it, and answers questions with citations back to the source.

Target users: Norwegian SMEs, accountants, lawyers, consultants — people who need to extract information from dense Norwegian business documents (contracts, regulations, annual reports, government correspondence).

---

## MVP Feature Set (build these, nothing more)

1. **Document upload** — PDF and .docx, max 10MB, stored in Supabase Storage
2. **Automatic chunking + embedding** — split document into chunks, embed with Gemini text-embedding-004, store vectors in Supabase pgvector
3. **Q&A chat interface** — user types a question, system retrieves relevant chunks, Gemini 2.0 Flash answers with source references
4. **Document library** — list of uploaded documents per user, delete option
5. **Auth** — Google Sign-In via Supabase (same pattern as StrømVei)
6. **Bilingual UI** — Norwegian (Bokmål) default, English toggle

**Not in MVP:** multi-document search, sharing, payment, OCR for scanned PDFs, streaming responses.

---

## Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Framework | Next.js 16 (App Router) | Same as StrømVei |
| Language | TypeScript strict | Same as StrømVei |
| Styling | Tailwind CSS | Same as StrømVei |
| AI Chat | Gemini 2.0 Flash (gemini-2.0-flash) | Free tier, strong for document Q&A |
| Embeddings | Gemini text-embedding-004 | Free, 768 dims, one API key for everything |
| Vector DB | Supabase pgvector | vector(768) column, IVFFlat index |
| File storage | Supabase Storage | PDF/docx uploads |
| Document parsing | pdf-parse (PDF) + mammoth (docx) | Both npm packages, server-side only |
| Auth | Supabase Auth (Google Sign-In) | Same pattern as StrømVei |
| Deployment | Vercel | Same as StrømVei |

---

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
GEMINI_API_KEY=
```

---

## What Was Done Before This Session

- Directory created: `A:\ClaudeAI\MyAI-Projects\dokumentai\`
- StrømVei (Project #1) fully shipped at https://stromvei-project.vercel.app

## What Was Done in First Session (2026-05-20)

- Next.js 16 app scaffolded
- All dependencies installed (@supabase/supabase-js, @supabase/ssr, @google/generative-ai, pdf-parse, mammoth, uuid, react-dropzone)
- PLAN.md, TECH-SPEC.md, PROJECT-TRACKER.md, PITCH.md written
- Stack finalized: Gemini (free) for both chat and embeddings
- Supabase project: dokumentai
- GitHub repo: dokumentai

---

## Standing Instructions

- After every phase, give Ayyad a testing checklist before moving on
- CV update rule: when project ships, update BOTH Projects section AND cover letter in cv-build-may.js simultaneously, then rebuild docx
- CV build script: `C:\tmp\cv-build-may.js` → `node C:/tmp/cv-build-may.js`
- CV output: `A:\CV\2026\MAY2026\AyyadAnwar_CV_052026-Com.docx`
