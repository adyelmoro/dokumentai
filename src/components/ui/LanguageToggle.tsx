'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageToggle() {
  const { lang, toggle } = useLanguage();

  return (
    <button
      onClick={toggle}
      aria-label="Toggle language"
      className="flex items-center gap-0.5 text-xs font-semibold rounded-md px-2 py-1 border border-gray-200 hover:border-gray-400 transition-colors select-none"
    >
      <span className={lang === 'no' ? 'text-gray-900' : 'text-gray-400'}>NO</span>
      <span className="text-gray-300 mx-0.5">|</span>
      <span className={lang === 'en' ? 'text-gray-900' : 'text-gray-400'}>EN</span>
    </button>
  );
}
