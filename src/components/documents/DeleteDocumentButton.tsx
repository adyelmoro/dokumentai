'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DeleteDocumentButton({ documentId }: { documentId: string }) {
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    if (!confirming) {
      setConfirming(true);
      setTimeout(() => setConfirming(false), 3000);
      return;
    }
    setLoading(true);
    await fetch(`/api/documents/${documentId}`, { method: 'DELETE' });
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className={`text-xs font-medium transition-colors ${
        confirming ? 'text-red-500 hover:text-red-700' : 'text-gray-400 hover:text-gray-600'
      } disabled:opacity-50`}
    >
      {loading ? '...' : confirming ? 'Bekreft sletting' : 'Slett'}
    </button>
  );
}
