import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' });

export const metadata: Metadata = {
  title: 'DokumentAI — Norsk dokumentassistent',
  description:
    'Last opp PDF- og Word-dokumenter og still spørsmål om innholdet med kunstig intelligens.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nb" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full bg-gray-50 text-gray-900 flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
