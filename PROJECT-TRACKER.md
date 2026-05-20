# DokumentAI — Project Tracker

**Last updated:** 2026-05-20

---

## Phase 1 — Foundation
- [ ] Scaffold Next.js app ✅
- [ ] Install dependencies ✅
- [ ] Write planning docs ✅
- [ ] Configure Supabase (pgvector, tables, storage, RLS, RPC)
- [ ] Set up .env.local
- [ ] Supabase Auth (Google Sign-In)
- [ ] Root layout + NavBar
- [ ] Language toggle (NO/EN)
- [ ] Landing page (auth wall)
- [ ] Middleware (protect /library, /upload)

## Phase 2 — Document Upload
- [ ] UploadZone component (react-dropzone, 10MB limit, pdf/docx only)
- [ ] POST /api/upload route
- [ ] pdf-parse integration
- [ ] mammoth integration
- [ ] Text chunker (500 tokens, 50 overlap)
- [ ] Gemini text-embedding-004 embed each chunk
- [ ] Save document + chunks to Supabase
- [ ] Upload progress UI

## Phase 3 — Q&A Chat
- [ ] Chat UI (ChatWindow, ChatMessage, ChatInput)
- [ ] POST /api/chat route
- [ ] Embed question with text-embedding-004
- [ ] pgvector match_chunks RPC call
- [ ] Gemini 2.0 Flash answer generation
- [ ] Source citations displayed in chat
- [ ] Conversation history passed to Gemini

## Phase 4 — Document Library
- [ ] Library page (DocumentLibrary, DocumentCard)
- [ ] Document detail page (metadata + chat)
- [ ] DELETE /api/documents/[id] route
- [ ] Delete confirmation UI
- [ ] Empty state
- [ ] Loading skeletons

## Phase 5 — Polish + Deploy
- [ ] Norwegian strings complete (all UI text)
- [ ] English strings complete
- [ ] Error boundaries
- [ ] Mobile responsive pass
- [ ] Production build passes (next build)
- [ ] Deploy to Vercel
- [ ] Environment vars set in Vercel
- [ ] README written with screenshots
- [ ] .env.example committed
- [ ] CV updated

---

## Bugs / Issues
_None yet_

## Decisions Made This Session
- Gemini 2.0 Flash for chat, text-embedding-004 for embeddings (free tier)
- No LangChain — direct SDK for cleaner, readable code
