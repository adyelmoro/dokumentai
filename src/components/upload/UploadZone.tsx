'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useRouter } from 'next/navigation';
import type { UploadState } from '@/lib/types';

export default function UploadZone() {
  const [state, setState] = useState<UploadState>({ status: 'idle' });
  const router = useRouter();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setState({ status: 'processing' });

      const formData = new FormData();
      formData.append('file', file);

      try {
        const res = await fetch('/api/upload', { method: 'POST', body: formData });
        const data = await res.json();

        if (!res.ok) {
          setState({ status: 'error', message: data.error || 'Opplasting mislyktes' });
          return;
        }

        setState({ status: 'done', documentId: data.documentId, chunkCount: data.chunkCount });
        setTimeout(() => router.push(`/library/${data.documentId}`), 1500);
      } catch {
        setState({ status: 'error', message: 'Nettverksfeil – prøv igjen' });
      }
    },
    [router]
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxSize: 10 * 1024 * 1024,
    multiple: false,
    disabled: state.status === 'processing' || state.status === 'done',
  });

  if (state.status === 'done') {
    return (
      <div className="border-2 border-green-300 bg-green-50 rounded-2xl p-14 text-center">
        <div className="text-4xl mb-3">✅</div>
        <p className="font-semibold text-green-800">Dokumentet er klart!</p>
        <p className="text-sm text-green-600 mt-1">
          {state.chunkCount} avsnitt indeksert — sender deg til chat...
        </p>
      </div>
    );
  }

  if (state.status === 'processing') {
    return (
      <div className="border-2 border-blue-200 bg-blue-50 rounded-2xl p-14 text-center">
        <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
        <p className="font-medium text-blue-800">Analyserer dokumentet...</p>
        <p className="text-sm text-blue-500 mt-1">Deler opp og indekserer innholdet</p>
      </div>
    );
  }

  const rejectionMessage = fileRejections[0]?.errors[0]?.code === 'file-too-large'
    ? 'Filen er for stor (maks 10 MB)'
    : fileRejections.length > 0
    ? 'Kun PDF og DOCX støttes'
    : null;

  return (
    <div className="space-y-3">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-2xl p-14 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-blue-400 bg-blue-50'
            : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
        }`}
      >
        <input {...getInputProps()} />
        <div className="text-5xl mb-4">📄</div>
        <p className="font-semibold text-gray-900 text-lg">
          {isDragActive ? 'Slipp filen her' : 'Dra og slipp filen din her'}
        </p>
        <p className="text-sm text-gray-500 mt-2">eller klikk for å velge fil</p>
        <p className="text-xs text-gray-400 mt-4">PDF eller DOCX · Maks 10 MB</p>
      </div>

      {(state.status === 'error' || rejectionMessage) && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
          {state.status === 'error' ? state.message : rejectionMessage}
        </div>
      )}
    </div>
  );
}
