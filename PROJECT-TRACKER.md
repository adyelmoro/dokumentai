# DokumentAI — Project Tracker

**Last updated:** 2026-05-20
**Current phase:** Phase 5 — Language Toggle (next session)

---

## Phase 1 — Foundation ✅ COMPLETE

- [x] Next.js 16 app scaffolded
- [x] All dependencies installed (@supabase/supabase-js, @supabase/ssr, @google/generative-ai, pdf-parse@1.1.1, mammoth, uuid, react-dropzone)
- [x] PLAN.md, TECH-SPEC.md, PROJECT-TRACKER.md, PITCH.md written
- [x] Supabase client (browser): `src/lib/supabase/client.ts`
- [x] Supabase client (server): `src/lib/supabase/server.ts`
- [x] Supabase middleware helper: `src/lib/supabase/middleware.ts`
- [x] Gemini client + helpers: `src/lib/gemini.ts`
- [x] Text chunker: `src/lib/chunker.ts`
- [x] TypeScript types: `src/lib/types.ts`
- [x] Auth proxy: `src/proxy.ts` (Next.js 16 convention)
- [x] Auth callback route: `src/app/auth/callback/route.ts`
- [x] AuthButton component (Google Sign-In)
- [x] Landing page with value prop
- [x] `.env.local` configured
- [x] `.env.example` committed
- [x] Supabase setup SQL written: `supabase-setup.sql`
- [x] Storage policies SQL written: `supabase-storage-policies.sql`
- [x] TypeScript clean, production build passes
- [x] Pushed to GitHub

---

## Phase 2 — Upload Pipeline ✅ COMPLETE

- [x] `POST /api/upload` route
- [x] PDF parsing with pdf-parse v1.1.1
- [x] DOCX parsing with mammoth
- [x] Text chunker (500 tokens, 50 overlap, paragraph-aware)
- [x] Gemini gemini-embedding-001 — embed each chunk with 50ms rate-limit delay
- [x] Supabase Storage upload
- [x] `documents` table insert
- [x] `document_chunks` table insert with embeddings (768 dims)
- [x] Error rollback (storage + DB cleanup on failure)
- [x] `UploadZone` component (react-dropzone, drag & drop)
- [x] Upload page
- [x] Processing / done / error states in UI

---

## Phase 3 — Chat & Library ✅ COMPLETE

- [x] `POST /api/chat` route
- [x] Question embedding with gemini-embedding-001
- [x] pgvector `match_chunks` RPC call
- [x] Gemini 2.5 Flash answer generation with source grounding
- [x] `ChatWindow` client component (message thread, auto-scroll)
- [x] `ChatMessage` component (user/assistant bubbles, expandable sources)
- [x] `ChatInput` component (Enter to send, Shift+Enter for newline)
- [x] `DELETE /api/documents/[id]` route
- [x] `DocumentCard` component
- [x] `DeleteDocumentButton` (two-click confirm pattern)
- [x] Library page (grid, empty state)
- [x] Document + chat page
- [x] NavBar with sign-out
- [x] SignOutButton client component

---

## Phase 4 — Integration Testing ✅ COMPLETE (2026-05-20)

### Bugs found & fixed
| Bug | Root cause | Fix |
|-----|-----------|-----|
| "Embedding process failed" on upload | `text-embedding-004` renamed to `gemini-embedding-001` in v1beta API | Updated model name + outputDimensionality: 768 |
| `gemini-2.0-flash` quota = 0 | Free tier quota unavailable for 2.0-flash in this region | Switched to `gemini-2.5-flash` (better model, works on free tier) |

### Confirmed working
- [x] Landing page loads at localhost:3000
- [x] Google Sign-In works → redirected to /library
- [x] Upload a PDF → processing shown → redirected to /library/[id]
- [x] Ask a question → answer with citations returned
- [x] Document visible in library
- [x] Delete document works (two-click confirm)
- [x] Sign out works → back to landing page

---

## Phase 5 — Language Toggle ⏳ NEXT SESSION

- [ ] `src/lib/i18n.ts` — translation strings object (no/en)
- [ ] `src/contexts/LanguageContext.tsx` — React context + localStorage persistence
- [ ] `src/components/ui/LanguageToggle.tsx` — NO/EN button in NavBar
- [ ] Translate: landing page
- [ ] Translate: NavBar links
- [ ] Translate: library page (headers, empty state)
- [ ] Translate: upload page + UploadZone (all states)
- [ ] Translate: chat page (placeholder, hint text)
- [ ] Translate: DocumentCard (labels, dates)
- [ ] Translate: error messages in UploadZone

**Testing checklist:**
- [ ] Default language is Norwegian
- [ ] Toggle switches to English and back
- [ ] Language persists after page reload
- [ ] All UI text translated — no Norwegian leaking in English mode

---

## Phase 6 — Polish ⏳ NOT STARTED

- [ ] `src/components/ui/ErrorBoundary.tsx`
- [ ] Library page — loading skeleton for document cards
- [ ] Document page — loading skeleton for header
- [ ] `src/app/not-found.tsx` — custom 404
- [ ] Mobile audit (375px, 768px, 1280px)
- [ ] Zero console errors in production build

**Testing checklist:**
- [ ] Invalid file upload shows clear error
- [ ] /library/nonexistent-id → 404 page
- [ ] Loading skeletons visible briefly on slow connection
- [ ] Mobile (375px) — no overflow, usable layout
- [ ] Zero console errors

---

## Phase 7 — Vercel Deploy ⏳ NOT STARTED

- [ ] Connect GitHub repo to Vercel
- [ ] Add all 4 env vars in Vercel dashboard
- [ ] Add production redirect URL to Supabase
- [ ] Add production URL to Google Cloud OAuth
- [ ] Successful deploy
- [ ] Smoke test on production URL

**Testing checklist:**
- [ ] Production URL loads
- [ ] Google Sign-In works in production
- [ ] Upload + chat works in production
- [ ] No build errors in Vercel logs

---

## Phase 8 — Documentation & Portfolio ⏳ NOT STARTED

- [ ] README: project name, live URL, screenshots, stack, local setup, architecture
- [ ] Screenshots taken from production (library view, chat view)
- [ ] CV `projects` section updated in cv-build-may.js
- [ ] CV cover letter updated
- [ ] CV rebuilt: `node C:/tmp/cv-build-may.js`
- [ ] Repo pinned on GitHub profile

**Testing checklist:**
- [ ] README renders on GitHub — no broken images
- [ ] Live URL in README works
- [ ] Local setup instructions work on clean clone
- [ ] CV exported correctly

---

## Bugs Log

| Date | Bug | Status | Fix |
|------|-----|--------|-----|
| 2026-05-20 | Embedding failed — wrong model name `text-embedding-004` | ✅ Fixed | Renamed to `gemini-embedding-001` + `outputDimensionality: 768` |
| 2026-05-20 | `gemini-2.0-flash` free tier quota = 0 | ✅ Fixed | Switched to `gemini-2.5-flash` |
