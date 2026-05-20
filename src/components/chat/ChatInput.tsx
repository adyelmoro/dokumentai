'use client';

import { KeyboardEvent, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ChatInput({
  onSend,
  disabled,
}: {
  onSend: (message: string) => void;
  disabled: boolean;
}) {
  const [value, setValue] = useState('');
  const { t } = useLanguage();

  function handleSend() {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue('');
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="flex gap-2 items-end pt-4 border-t border-white/10">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder={t.chat.placeholder}
        rows={2}
        className="flex-1 min-w-0 resize-none rounded-xl bg-white/8 backdrop-blur-sm border border-white/15 px-3 py-3 text-sm text-white/90 placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 focus:border-indigo-400/40 disabled:opacity-50 transition-all"
      />
      <button
        onClick={handleSend}
        disabled={disabled || !value.trim()}
        className="flex-shrink-0 bg-indigo-500/70 backdrop-blur-sm border border-indigo-400/30 text-white rounded-xl px-4 py-3 font-medium text-sm hover:bg-indigo-400/80 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        {t.chat.send}
      </button>
    </div>
  );
}
