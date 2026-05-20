'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import type { UploadState } from '@/lib/types';

export default function UploadZone() {
  const [state, setState] = useState<UploadState>({ status: 'idle' });
  const router = useRouter();
  const { t } = useLanguage();
  const u = t.upload;

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
          setState({ status: 'error', message: data.error || u.errNetwork });
          return;
        }

        setState({ status: 'done', documentId: data.documentId, chunkCount: data.chunkCount });
        setTimeout(() => router.push(`/library/${data.documentId}`), 1500);
      } catch {
        setState({ status: 'error', message: u.errNetwork });
      }
    },
    [router, u]
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
      <div className="bg-emerald-500/12 backdrop-blur-xl border border-emerald-400/25 rounded-2xl p-14 text-center shadow-lg">
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-emerald-400/20 border border-emerald-400/30 flex items-center justify-center">
          <svg className="w-7 h-7 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="font-semibold text-white/90">{u.doneTitle}</p>
        <p className="text-sm text-emerald-300/80 mt-1">{u.doneDesc(state.chunkCount)}</p>
      </div>
    );
  }

  if (state.status === 'processing') {
    return (
      <div className="bg-indigo-500/10 backdrop-blur-xl border border-indigo-400/20 rounded-2xl p-14 text-center shadow-lg">
        <div className="w-10 h-10 border-2 border-indigo-400/30 border-t-indigo-400 rounded-full animate-spin mx-auto mb-4" />
        <p className="font-medium text-white/80">{u.processing}</p>
        <p className="text-sm text-white/45 mt-1">{u.processingDesc}</p>
      </div>
    );
  }

  const rejectionMessage =
    fileRejections[0]?.errors[0]?.code === 'file-too-large'
      ? u.errTooLarge
      : fileRejections.length > 0
      ? u.errType
      : null;

  return (
    <div className="space-y-3">
      <div
        {...getRootProps()}
        className={`rounded-2xl p-14 text-center cursor-pointer transition-all backdrop-blur-xl border-2 border-dashed shadow-lg ${
          isDragActive
            ? 'border-indigo-400/60 bg-indigo-500/18 scale-[1.01]'
            : 'border-white/15 bg-white/6 hover:border-indigo-400/40 hover:bg-white/10'
        }`}
      >
        <input {...getInputProps()} />
        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-white/8 border border-white/12 flex items-center justify-center">
          <svg className="w-7 h-7 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <p className="font-semibold text-white/85 text-lg">
          {isDragActive ? u.dragActive : u.dragIdle}
        </p>
        <p className="text-sm text-white/45 mt-2">{u.clickHint}</p>
        <p className="text-xs text-white/30 mt-4">{u.typeHint}</p>
      </div>

      {(state.status === 'error' || rejectionMessage) && (
        <div className="bg-red-500/12 backdrop-blur-sm border border-red-400/25 rounded-xl px-4 py-3 text-sm text-red-300">
          {state.status === 'error' ? state.message : rejectionMessage}
        </div>
      )}
    </div>
  );
}
