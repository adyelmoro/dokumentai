# DokumentAI — Project Tracker

**Last updated:** 2026-05-21
**Current phase:** ALL PHASES COMPLETE — SHIPPED

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
- [x] Google Sign-In works — redirected to /library
- [x] Upload a PDF — processing shown — redirected to /library/[id]
- [x] Ask a question — answer with citations returned
- [x] Document visible in library
- [x] Delete document works (two-click confirm)
- [x] Sign out works — back to landing page

---

## Phase 5 — Language Toggle ✅ COMPLETE

- [x] `src/lib/i18n.ts` — translation strings object (no/en)
- [x] `src/contexts/LanguageContext.tsx` — React context + localStorage persistence
- [x] `src/components/ui/LanguageToggle.tsx` — NO/EN button in NavBar
- [x] Translate: landing page
- [x] Translate: NavBar links
- [x] Translate: library page (headers, empty state)
- [x] Translate: upload page + UploadZone (all states)
- [x] Translate: chat page (placeholder, hint text)
- [x] Translate: DocumentCard (labels, dates)
- [x] Translate: error messages in UploadZone

---

## Phase 6 — Polish ✅ COMPLETE

- [x] `src/components/ui/ErrorBoundary.tsx` — React class component, glass red panel
- [x] `src/app/not-found.tsx` — custom 404 page
- [x] ErrorBoundary added to library, upload, and document pages
- [x] Mobile audit (375px, 768px, 1280px) — h-[100dvh] for virtual keyboard
- [x] Zero console errors in production build
- [x] Full Apple liquid glass / glassmorphism design across all components
- [x] DokumentAILogo SVG component + icon.svg favicon
- [x] favicon.ico deleted (was overriding icon.svg)

---

## Phase 7 — Vercel Deploy ✅ COMPLETE (2026-05-21)

- [x] Connected GitHub repo to Vercel
- [x] All 4 env vars added in Vercel dashboard
- [x] Production redirect URL added to Supabase
- [x] Production Supabase callback URL added to Google Cloud OAuth
- [x] Successful deploy — https://dokumentai-seven.vercel.app
- [x] Smoke test passed (all items below confirmed)

### Auth bugs found & fixed during deploy
| Bug | Root cause | Fix |
|-----|-----------|-----|
| `redirect_uri_mismatch` on Google login | Google Cloud Console had wrong redirect URI | Added `https://cxeuqvgohduompekgsjz.supabase.co/auth/v1/callback` |
| Login redirects back to landing page (1) | Session cookies set on `cookies()` store but not attached to `NextResponse.redirect()` | Rewrote callback to build redirect response first, set cookies directly on it |
| Login redirects back to landing page (2) | Middleware `getUser()` ran on `/auth/callback`, overwrote PKCE code-verifier cookie | Excluded `/auth/callback` from proxy.ts middleware matcher |
| "Invalid API key" on `exchangeCodeForSession` | Vercel env vars had rotated/stale Supabase keys | Updated all 4 env vars in Vercel, redeployed |

### Production smoke test — all passed
- [x] Production URL loads
- [x] Google Sign-In works in production
- [x] Upload + chat works in production
- [x] Language toggle works
- [x] Delete document works
- [x] Sign out works
- [x] 404 page shows for unknown routes
- [x] No build errors in Vercel logs

---

## Phase 8 — Documentation & Portfolio ✅ COMPLETE (2026-05-21)

- [x] README: project name, live URL, screenshots, stack, local setup, architecture
- [x] CV `projects` section updated in cv-build-may.js
- [x] CV cover letter updated (Para 2 + Para 4)
- [x] CV rebuilt: `node C:/tmp/cv-build-may.js`
- [x] Repo public on GitHub: github.com/adyelmoro/dokumentai

### Post-ship manual tasks (Ayyad does these)
- [ ] Pin dokumentai repo on GitHub profile
- [ ] Pin stromvei-project repo on GitHub profile
- [ ] Update LinkedIn — remove "Aspiring", add both live projects

---

## Bugs Log

| Date | Bug | Status | Fix |
|------|-----|--------|-----|
| 2026-05-20 | Embedding failed — wrong model name `text-embedding-004` | ✅ Fixed | Renamed to `gemini-embedding-001` + `outputDimensionality: 768` |
| 2026-05-20 | `gemini-2.0-flash` free tier quota = 0 | ✅ Fixed | Switched to `gemini-2.5-flash` |
| 2026-05-21 | `redirect_uri_mismatch` on Google OAuth in production | ✅ Fixed | Correct Supabase callback URI in Google Cloud Console |
| 2026-05-21 | Session cookies lost on OAuth redirect | ✅ Fixed | Cookies set directly on `NextResponse.redirect()` object |
| 2026-05-21 | PKCE verifier cleared by middleware before route handler | ✅ Fixed | Excluded `/auth/callback` from middleware matcher in proxy.ts |
| 2026-05-21 | "Invalid API key" on `exchangeCodeForSession` | ✅ Fixed | Updated stale keys in Vercel env vars, redeployed |
