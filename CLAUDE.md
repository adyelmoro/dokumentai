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

## Current Phase: 6 — Polish

See PLAN.md for full phase breakdown. See PROJECT-TRACKER.md for task status.

**Rule: Never move to the next phase until Ayyad confirms the testing checklist passes.**

---

## Phase Status

| # | Phase | Status |
|---|-------|--------|
| 1 | Foundation | ✅ Done |
| 2 | Upload Pipeline | ✅ Done |
| 3 | Chat & Library | ✅ Done |
| 4 | Integration Test | ✅ Done |
| 5 | Language Toggle + Design | ✅ Done |
| 6 | Polish | 🔄 Active |
| 7 | Vercel Deploy | ⏳ |
| 8 | Docs & CV | ⏳ |

---

## Key File Locations

```
src/
├── proxy.ts                         — Auth proxy (Next.js 16: proxy, not middleware)
├── app/
│   ├── page.tsx                     — Landing / auth wall
│   ├── icon.svg                     — Favicon (SVG, auto-detected by Next.js)
│   ├── not-found.tsx                — 404 page (Phase 6)
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
│   ├── library/{LibraryView,DocumentHeader}.tsx
│   ├── upload/{UploadZone,UploadPageContent}.tsx
│   ├── landing/LandingContent.tsx
│   └── ui/{NavBar,NavBarClient,SignOutButton,LanguageToggle,DokumentAILogo}.tsx
├── contexts/LanguageContext.tsx     — NO/EN language toggle + localStorage
└── lib/
    ├── supabase/{client,server,middleware}.ts
    ├── i18n.ts                      — Translation strings (no/en)
    ├── gemini.ts                    — embedText, embedBatch, generateAnswer
    ├── chunker.ts                   — chunkText (500 tok, 50 overlap)
    └── types.ts
```

---

## Design System (Phase 5)

**Theme:** Apple liquid glass / glassmorphism on deep indigo/navy gradient
- Background: `#0f172a` with 4 radial gradient orbs (indigo, blue, violet, pink), `background-attachment: fixed`
- Glass panels: `bg-white/8 backdrop-blur-xl border border-white/12 rounded-2xl`
- Glass nav: `bg-white/8 backdrop-blur-2xl border-b border-white/10 sticky top-0`
- Accent buttons: `bg-indigo-500/70 backdrop-blur-sm border border-indigo-400/30`
- All text on dark background: `text-white`, `text-white/70`, `text-white/40`
- Logo: `DokumentAILogo.tsx` — document + sparkle SVG, indigo→violet gradient

---

## Important Technical Notes

- **proxy.ts not middleware.ts** — Next.js 16 renamed the convention. File is `src/proxy.ts`, exports `proxy` function.
- **pdf-parse is v1.1.1** — v2 has completely different API (class-based, no function call). Must stay on v1.
- **pdf-parse import** — Uses `require('pdf-parse')` not ESM import, to avoid module resolution issues.
- **Embedding model** — `gemini-embedding-001` with `outputDimensionality: 768`. Supabase schema uses `vector(768)`.
- **Chat model** — `gemini-2.5-flash` (NOT gemini-2.0-flash — quota=0 on free tier)
- **Gemini rate limiting** — embedBatch adds 50ms delay between calls to stay within free tier limits.
- **Async params** — Next.js 16 dynamic route params are Promises. Always `await params` in pages and route handlers.
- **Supabase storage paths** — Files stored at `{user_id}/{uuid}.{ext}`. RLS policy checks `foldername(name)[1] = auth.uid()`.
- **match_chunks RPC** — Defined in Supabase SQL. Uses `SECURITY DEFINER` + `auth.uid()` check.
- **i18n** — `src/lib/i18n.ts` has explicit `Translations` interface (not `as const` — caused type conflicts).
- **favicon.ico deleted** — `src/app/favicon.ico` removed; Next.js uses `src/app/icon.svg` via metadata.icons.

---

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://cxeuqvgohduompekgsjz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
GEMINI_API_KEY=...
```

---

## MVP Feature Set

1. **Document upload** — PDF and .docx, max 10MB ✅
2. **Automatic chunking + embedding** — gemini-embedding-001 + pgvector ✅
3. **Q&A chat** — RAG with Gemini 2.5 Flash, source citations ✅
4. **Document library** — list + delete ✅
5. **Auth** — Google Sign-In via Supabase ✅
6. **Bilingual UI** — Norwegian default, English toggle ✅
7. **Liquid glass design** — Logo, favicon, full glassmorphism theme ✅

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
