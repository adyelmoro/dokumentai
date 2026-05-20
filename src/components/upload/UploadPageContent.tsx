'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import UploadZone from './UploadZone';

export default function UploadPageContent() {
  const { t } = useLanguage();

  return (
    <main className="max-w-2xl mx-auto px-4 py-6 sm:py-12">
      <h1 className="text-2xl font-bold text-white mb-2">{t.uploadPage.title}</h1>
      <p className="text-white/50 mb-8">{t.uploadPage.desc}</p>
      <UploadZone />
    </main>
  );
}
