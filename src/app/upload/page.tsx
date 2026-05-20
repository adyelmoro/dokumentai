import NavBar from '@/components/ui/NavBar';
import UploadPageContent from '@/components/upload/UploadPageContent';
import ErrorBoundary from '@/components/ui/ErrorBoundary';

export const metadata = { title: 'Last opp — DokumentAI' };

export default function UploadPage() {
  return (
    <>
      <NavBar />
      <ErrorBoundary label="opplastingen">
        <UploadPageContent />
      </ErrorBoundary>
    </>
  );
}
