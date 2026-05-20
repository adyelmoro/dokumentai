# DokumentAI

**Ask questions about your business documents in Norwegian or English — powered by Gemini AI.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-dokumentai--seven.vercel.app-6366f1?style=for-the-badge&logo=vercel)](https://dokumentai-seven.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16.2.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178c6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Supabase](https://img.shields.io/badge/Supabase-pgvector-3ecf8e?style=for-the-badge&logo=supabase)](https://supabase.com)

---

## What it does

DokumentAI lets Norwegian businesses upload PDF and Word documents and ask questions about them in plain language. The AI reads the document, chunks and indexes the content, and answers questions with direct citations back to the source paragraphs.

**Target users:** Norwegian SMEs, accountants, lawyers, and consultants who work with dense documents.

---

## Screenshots

| Landing | Library | Chat |
|---------|---------|------|
| Google Sign-In, bilingual toggle | Document grid, upload button | RAG answers with source citations |

---

## Features

- **Upload PDF & DOCX** — drag-and-drop or click, up to 10 MB
- **RAG Q&A** — Retrieval-Augmented Generation using Gemini 2.5 Flash, answers grounded in the document
- **Source citations** — every answer shows which paragraphs it came from, expandable inline
- **Bilingual UI** — Norwegian (Bokmål) default with one-click English toggle, persisted in localStorage
- **Document library** — browse, open, and delete uploaded documents
- **Google Sign-In** — Supabase Auth, per-user document isolation via RLS
- **Liquid glass design** — Apple-inspired glassmorphism on a deep indigo gradient

---

## Tech stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.2.6 (App Router, TypeScript strict) |
| Styling | Tailwind CSS v4 |
| AI — Chat | Gemini 2.5 Flash (`gemini-2.5-flash`) |
| AI — Embeddings | `gemini-embedding-001`, 768 dimensions |
| Vector search | Supabase pgvector, IVFFlat index, cosine similarity |
| File storage | Supabase Storage (`dokumentai-uploads` bucket) |
| Auth | Supabase Auth — Google OAuth |
| PDF parsing | `pdf-parse` v1.1.1 |
| DOCX parsing | `mammoth` |
| Deployment | Vercel |

---

## RAG pipeline

```
User uploads file
  → pdf-parse / mammoth extracts text
  → chunkText() splits into 500-token chunks with 50-token overlap
  → embedBatch() calls gemini-embedding-001 for each chunk
  → chunks + vectors stored in Supabase (documents + chunks tables)

User asks a question
  → embedText() embeds the question
  → match_chunks() RPC: cosine similarity search, top 5 chunks
  → generateAnswer() sends chunks + question to gemini-2.5-flash
  → answer returned with source chunk references
```

---

## Norwegian context

This project is part of a portfolio targeting the **Norwegian tech market**. The UI defaults to Norwegian Bokmål and uses realistic Norwegian business document scenarios. The bilingual toggle (NO|EN) mirrors how real Norwegian B2B SaaS products handle language.

---

## Run locally

```bash
# 1. Clone and install
git clone https://github.com/adyelmoro/dokumentai.git
cd dokumentai
npm install

# 2. Set up environment variables
cp .env.example .env.local
# Fill in your Supabase and Gemini API keys

# 3. Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Required environment variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
GEMINI_API_KEY=AIza...
```

### Supabase setup

You need:
- A `documents` table and `chunks` table with `vector(768)` column
- A `match_chunks` SQL function (cosine similarity RPC)
- A `dokumentai-uploads` storage bucket
- Google OAuth configured in Supabase Auth
- RLS policies on documents, chunks, and storage

See `TECH-SPEC.md` for the full SQL schema.

---

## Project structure

```
src/
├── app/
│   ├── page.tsx              # Landing / auth wall
│   ├── library/page.tsx      # Document library
│   ├── library/[id]/page.tsx # Document + chat
│   ├── upload/page.tsx       # Upload flow
│   └── api/
│       ├── upload/route.ts   # Parse → chunk → embed → store
│       ├── chat/route.ts     # RAG Q&A
│       └── documents/[id]/   # Delete
├── components/
│   ├── chat/                 # ChatWindow, ChatMessage, ChatInput
│   ├── documents/            # DocumentCard, DeleteDocumentButton
│   ├── library/              # LibraryView, DocumentHeader
│   ├── upload/               # UploadZone, UploadPageContent
│   ├── landing/              # LandingContent
│   └── ui/                   # NavBar, ErrorBoundary, DokumentAILogo …
├── contexts/
│   └── LanguageContext.tsx   # NO/EN toggle, localStorage persistence
└── lib/
    ├── i18n.ts               # Translation strings
    ├── gemini.ts             # embedText, embedBatch, generateAnswer
    ├── chunker.ts            # chunkText (500 tokens, 50 overlap)
    └── types.ts
```

---

## Built by

**Ayyad Anwar** — Full-Stack AI-Assisted Developer, Skien, Norway
[github.com/adyelmoro](https://github.com/adyelmoro) · iamayyad@gmail.com

Portfolio project #2 of 4 — built May 2026 to demonstrate Norwegian market readiness.
