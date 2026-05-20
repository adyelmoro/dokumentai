import NavBar from '@/components/ui/NavBar';
import UploadPageContent from '@/components/upload/UploadPageContent';

export const metadata = { title: 'Last opp — DokumentAI' };

export default function UploadPage() {
  return (
    <>
      <NavBar />
      <UploadPageContent />
    </>
  );
}
