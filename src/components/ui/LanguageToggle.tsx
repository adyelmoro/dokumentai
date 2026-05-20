'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageToggle() {
  const { lang, toggle } = useLanguage();

  return (
    <button
      onClick={toggle}
      aria-label="Toggle language"
      className="flex items-center gap-0.5 text-xs font-semibold rounded-md px-2 py-1 border border-white/20 hover:border-white/40 bg-white/8 hover:bg-white/12 backdrop-blur-sm transition-all select-none"
    >
      <span className={lang === 'no' ? 'text-white' : 'text-white/40'}>NO</span>
      <span className="text-white/20 mx-0.5">|</span>
      <span className={lang === 'en' ? 'text-white' : 'text-white/40'}>EN</span>
    </button>
  );
}
