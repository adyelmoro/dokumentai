# DokumentAI — Build Plan

**Project:** Portfolio Project #2 — Norwegian business document AI assistant
**Developer:** Ayyad Anwar | iamayyad@gmail.com
**Started:** 2026-05-20
**Target:** Deployed + documented

---

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.2.6 (App Router) |
| Language | TypeScript strict |
| Styling | Tailwind CSS v4 |
| AI Chat | Gemini 2.0 Flash (gemini-2.0-flash) |
| Embeddings | Gemini text-embedding-004 (768 dims, free tier) |
| Vector DB | Supabase pgvector |
| File storage | Supabase Storage |
| Document parsing | pdf-parse v1 (PDF) + mammoth (docx) |
| Auth | Supabase Auth — Google Sign-In |
| Deployment | Vercel |

---

## Rules

- **No phase is complete until the testing checklist passes.** Ayyad tests and confirms before we move on.
- Each phase ends with a testing checklist. Claude waits for feedback before continuing.
- No scope creep — MVP features only until deployed.
- All code TypeScript strict, no `any` without comment.

---

## Phase Overview

| # | Phase | Status | Description |
|---|-------|--------|-------------|
| 1 | Foundation | ✅ Done | Scaffold, Supabase/Gemini clients, auth, landing page |
| 2 | Upload Pipeline | ✅ Done | PDF/DOCX parse, chunk, embed, store |
| 3 | Chat & Library | ✅ Done | RAG Q&A, source citations, document library, delete |
| 4 | Integration Test | ✅ Done | First end-to-end test — 2 bugs found and fixed |
| 5 | Language Toggle | 🔄 Next | Norwegian/English switch, all UI strings both languages |
| 6 | Polish | ⏳ | Error boundaries, loading skeletons, mobile check, 404 |
| 7 | Deploy | ⏳ | Vercel deploy, env vars, smoke test in production |
| 8 | Documentation | ⏳ | README with screenshots, CV update |

---

## Phase 4 — Integration Testing
**Goal:** Verify the full user journey works end-to-end with real credentials.
**Prerequisite:** Google OAuth set up in Supabase + storage policies SQL run.

### Steps
1. Open http://localhost:3000 — landing page loads
2. Sign in with Google — redirects to /library
3. Upload a PDF — progress shows, redirects to /library/[id]
4. Ask a question about the document — answer appears with sources
5. Go back to library — document card shows
6. Delete the document — card disappears
7. Sign out — redirects to landing page

### Known risks to watch for
- pgvector RPC `match_chunks` — RLS + user_id check may fail if session not passed correctly
- Storage upload — RLS policy requires file path starts with user UUID
- pdf-parse — some PDFs have no extractable text (scanned/image PDFs)
- Gemini rate limits — free tier is 1500 RPM for embeddings, generous but watch for errors on large docs

### Testing checklist (Ayyad runs these)
- [ ] Landing page loads at localhost:3000
- [ ] Google Sign-In button works, redirected to /library
- [ ] Uploading a PDF works — success message shown
- [ ] Asking a question returns an answer with source citations
- [ ] Document appears in library
- [ ] Delete document works
- [ ] Sign out works

---

## Phase 5 — Language Toggle
**Goal:** Norwegian (Bokmål) default, English toggle in NavBar. All UI text in both languages.

### What to build
- `src/lib/i18n.ts` — translation strings (no/en)
- `src/contexts/LanguageContext.tsx` — React context + localStorage persistence
- `LanguageToggle` component in NavBar
- Update all UI-facing strings in all pages and components

### Pages/components to translate
- Landing page (page.tsx)
- NavBar
- Library page (empty state, headers)
- Upload page (UploadZone states, headers)
- Chat page (placeholder, input hint)
- Document card (dates, file info)
- Error messages in API responses

### Testing checklist
- [ ] Default language is Norwegian
- [ ] Toggle switches to English and back
- [ ] Language preference is remembered after page reload
- [ ] All UI text is translated — no Norwegian leaking through in English mode
- [ ] API error messages are in the correct language

---

## Phase 6 — Polish
**Goal:** Production-quality error handling, loading states, mobile UX.

### What to build
- `src/components/ui/ErrorBoundary.tsx` — wraps library, upload, chat sections
- Loading skeleton for document cards in library
- Loading skeleton for chat page document header
- `src/app/not-found.tsx` — 404 page
- Mobile responsive audit (test on 375px, 768px, 1280px)
- Console errors audit — zero console errors in production

### Testing checklist
- [ ] Uploading a broken/invalid file shows a clear error message
- [ ] Navigating to `/library/nonexistent-id` shows 404 page
- [ ] Library shows loading skeleton while fetching
- [ ] Chat page shows skeleton while document loads
- [ ] App looks correct on mobile (375px — iPhone SE width)
- [ ] No console errors in production build
- [ ] Signing out from /library and /upload both work

---

## Phase 7 — Vercel Deploy
**Goal:** Live URL, production environment working.

### Steps
1. Push latest code to GitHub (main branch)
2. Connect GitHub repo to Vercel (New Project → import dokumentai)
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `GEMINI_API_KEY`
4. Add production redirect URL to Supabase:
   `https://<your-vercel-url>.vercel.app/auth/callback`
5. Add production URL to Google Cloud OAuth authorized redirect URIs
6. Trigger deploy — wait for build to succeed

### Testing checklist
- [ ] Production URL loads (Vercel assigned URL)
- [ ] Google Sign-In works in production
- [ ] Upload a document in production
- [ ] Ask a question — answer returned
- [ ] No build errors in Vercel logs
- [ ] HTTPS works (Vercel provides this automatically)

---

## Phase 8 — Documentation & Portfolio
**Goal:** Recruiters can understand and evaluate the project in under 2 minutes.

### README sections
- Project name + one-line description
- Live URL badge
- Screenshot (library view + chat view)
- Tech stack list
- How to run locally (3 steps)
- Architecture explanation (RAG pipeline diagram or text)
- Norwegian context note

### CV update
- Update Projects section in `C:\tmp\cv-build-may.js`
- Update cover letter paragraph referencing DokumentAI
- Rebuild: `node C:/tmp/cv-build-may.js`
- Output: `A:\CV\2026\MAY2026\AyyadAnwar_CV_052026-Com.docx`

### Testing checklist
- [ ] README renders correctly on GitHub
- [ ] Live URL in README works
- [ ] Screenshots show real, functional UI (not placeholder)
- [ ] Local setup instructions work on a clean clone
- [ ] CV rebuilt and DokumentAI appears in Projects section
- [ ] Repo is pinned on github.com/adyelmoro

---

## Definition of Done

- [ ] All 8 phases complete and tested
- [ ] Deployed on Vercel with live URL
- [ ] README complete with screenshots
- [ ] Zero console errors in production
- [ ] Mobile responsive
- [ ] CV updated
- [ ] Repo public and pinned on GitHub

---

## Decisions Log

| Decision | Choice | Reason |
|----------|--------|--------|
| AI stack | Gemini (free) | Free tier, one API key for both chat and embeddings |
| No LangChain | Direct SDK | Cleaner, readable, impressive to technical recruiters |
| Embeddings | text-embedding-004 | 768 dims, free, Google-native |
| Chat model | gemini-2.0-flash | Fast, free, strong document Q&A |
| Auth | Google Sign-In via Supabase | Familiar to Norwegian users, quick to set up |
| Language | Norwegian default + EN toggle | Mirrors real Norwegian B2B SaaS products |
| Middleware | proxy.ts (not middleware.ts) | Next.js 16 renamed middleware → proxy |
| pdf-parse | v1.1.1 (not v2) | v2 has breaking API changes, v1 is the stable function-call API |
