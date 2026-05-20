'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';
import SignOutButton from './SignOutButton';
import DokumentAILogo from './DokumentAILogo';

export default function NavBarClient({ email }: { email?: string }) {
  const { t } = useLanguage();

  return (
    <nav className="sticky top-0 z-50 bg-white/8 backdrop-blur-2xl border-b border-white/10">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link
          href="/library"
          className="flex items-center gap-2.5 font-semibold text-white hover:opacity-80 transition-opacity"
        >
          <DokumentAILogo size={28} />
          <span className="text-white font-semibold tracking-tight">DokumentAI</span>
        </Link>

        <div className="flex items-center gap-3">
          <LanguageToggle />
          <Link
            href="/upload"
            className="hidden sm:block text-sm font-medium text-white/70 hover:text-white transition-colors"
          >
            {t.nav.upload}
          </Link>
          {email && (
            <>
              <span className="text-sm text-white/40 hidden lg:block">{email}</span>
              <SignOutButton label={t.nav.signOut} />
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
