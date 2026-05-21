'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import AuthButton from '@/components/auth/AuthButton';
import LanguageToggle from '@/components/ui/LanguageToggle';
import DokumentAILogo from '@/components/ui/DokumentAILogo';

export default function LandingContent() {
  const { t } = useLanguage();
  const l = t.landing;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-12">
      <div className="max-w-md w-full text-center space-y-8">

        {/* Hero */}
        <div className="space-y-3">
          <div className="inline-flex items-center justify-center mb-2">
            <DokumentAILogo size={72} />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white">DokumentAI</h1>
          <p className="text-white/60 text-lg">{l.subtitle}</p>
        </div>

        {/* Glass feature card */}
        <div className="bg-white/8 backdrop-blur-2xl rounded-2xl border border-white/12 p-6 text-left space-y-4 shadow-xl shadow-black/20">
          <Feature
            icon={<DocIcon />}
            title={l.feature1Title}
            desc={l.feature1Desc}
          />
          <div className="border-t border-white/8" />
          <Feature
            icon={<SearchIcon />}
            title={l.feature2Title}
            desc={l.feature2Desc}
          />
          <div className="border-t border-white/8" />
          <Feature
            icon={<CiteIcon />}
            title={l.feature3Title}
            desc={l.feature3Desc}
          />
        </div>

        <AuthButton />

        <div className="flex items-center justify-center">
          <LanguageToggle />
        </div>

        <p className="text-xs text-white/30">{l.footer}</p>
      </div>
    </main>
  );
}

function Feature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex gap-3 items-start">
      <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
        {icon}
      </div>
      <div>
        <p className="font-medium text-white/90">{title}</p>
        <p className="text-sm text-white/50 mt-0.5">{desc}</p>
      </div>
    </div>
  );
}

function DocIcon() {
  return (
    <svg className="w-4 h-4 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg className="w-4 h-4 text-violet-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function CiteIcon() {
  return (
    <svg className="w-4 h-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  );
}
