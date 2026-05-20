import NavBar from '@/components/ui/NavBar';
import UploadZone from '@/components/upload/UploadZone';

export const metadata = { title: 'Last opp dokument — DokumentAI' };

export default function UploadPage() {
  return (
    <>
      <NavBar />
      <main className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Last opp dokument</h1>
        <p className="text-gray-500 mb-8">
          PDF eller Word-dokument, maks 10 MB. Dokumentet vil bli analysert og gjort søkbart med AI.
        </p>
        <UploadZone />
      </main>
    </>
  );
}
