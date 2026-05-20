'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';
import SignOutButton from './SignOutButton';

export default function NavBarClient({ email }: { email?: string }) {
  const { t } = useLanguage();

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link
          href="/library"
          className="flex items-center gap-2 font-semibold text-gray-900 hover:opacity-80 transition-opacity"
        >
          <span className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </span>
          DokumentAI
        </Link>

        <div className="flex items-center gap-3">
          <LanguageToggle />
          <Link
            href="/upload"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            {t.nav.upload}
          </Link>
          {email && (
            <>
              <span className="text-sm text-gray-400 hidden sm:block">{email}</span>
              <SignOutButton label={t.nav.signOut} />
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
