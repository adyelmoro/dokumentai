# DokumentAI — Product Pitch

## The Problem

Norwegian businesses — accountants, lawyers, consultants, SME owners — deal with dense documents every day: contracts, regulations, annual reports, government correspondence. Reading and extracting information from these takes hours.

## The Solution

DokumentAI lets you upload any PDF or Word document and ask questions about it in plain Norwegian or English. The AI reads the document, finds the relevant sections, and answers your question — citing exactly which part of the document it used.

No more Ctrl+F. No more reading 40-page PDFs to find one clause.

## Target Users

- Norwegian SMEs reviewing supplier contracts
- Accountants working with client financial reports
- Lawyers reviewing regulatory documents
- Consultants extracting data from industry reports

## How It Works (User Flow)

1. Sign in with Google
2. Upload a PDF or Word document (up to 10MB)
3. Ask a question in Norwegian or English
4. Get an answer with the exact document excerpts that support it

## Tech Value Proposition (For Recruiters)

This project demonstrates:

- **RAG pipeline from scratch** — no LangChain, no abstractions. Manual chunking → embedding → vector similarity → LLM answer. Every step is readable in the code.
- **pgvector in production** — Supabase PostgreSQL with vector(768) columns, IVFFlat index, cosine similarity search via SQL RPC.
- **Google Gemini API** — text-embedding-004 for semantic search, gemini-2.0-flash for answer generation with citation grounding.
- **Next.js App Router** — Server Components, API Routes, Supabase SSR auth, middleware protection.
- **Bilingual UX** — Norwegian (Bokmål) default with English toggle, reflecting the Norwegian market reality.
- **File processing pipeline** — pdf-parse + mammoth on the server, chunking with overlap, async embedding with rate limiting.

## Stack

Next.js 16 · TypeScript · Tailwind CSS · Supabase (PostgreSQL + pgvector + Storage + Auth) · Google Gemini API · Vercel
