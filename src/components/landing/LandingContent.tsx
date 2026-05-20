'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import AuthButton from '@/components/auth/AuthButton';
import LanguageToggle from '@/components/ui/LanguageToggle';

export default function LandingContent() {
  const { t } = useLanguage();
  const l = t.landing;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4">
            <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">DokumentAI</h1>
          <p className="text-gray-500 text-lg">{l.subtitle}</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 text-left space-y-4">
          <Feature icon="📄" title={l.feature1Title} desc={l.feature1Desc} />
          <Feature icon="🔍" title={l.feature2Title} desc={l.feature2Desc} />
          <Feature icon="📎" title={l.feature3Title} desc={l.feature3Desc} />
        </div>

        <AuthButton />

        <div className="flex items-center justify-center">
          <LanguageToggle />
        </div>

        <p className="text-xs text-gray-400">{l.footer}</p>
      </div>
    </main>
  );
}

function Feature({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="flex gap-3 items-start">
      <span className="text-xl leading-none mt-0.5">{icon}</span>
      <div>
        <p className="font-medium text-gray-900">{title}</p>
        <p className="text-sm text-gray-500">{desc}</p>
      </div>
    </div>
  );
}
