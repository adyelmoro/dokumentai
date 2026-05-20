import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="max-w-sm w-full text-center space-y-6">

        {/* Glass card */}
        <div className="bg-white/8 backdrop-blur-2xl border border-white/12 rounded-2xl p-10 shadow-xl shadow-black/20">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-white/8 border border-white/12 flex items-center justify-center">
            <svg className="w-8 h-8 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <p className="text-5xl font-bold text-white/20 mb-2 tracking-tight">404</p>
          <h1 className="text-lg font-semibold text-white/80 mb-1">Siden finnes ikke</h1>
          <p className="text-sm text-white/40">
            Dokumentet eller siden du leter etter eksisterer ikke eller har blitt slettet.
          </p>
        </div>

        <Link
          href="/library"
          className="inline-flex items-center gap-2 bg-indigo-500/70 backdrop-blur-sm border border-indigo-400/30 text-white text-sm font-medium px-6 py-3 rounded-xl hover:bg-indigo-400/80 transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Tilbake til biblioteket
        </Link>

      </div>
    </main>
  );
}
