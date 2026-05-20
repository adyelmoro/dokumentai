'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import type { ChatMessage } from '@/lib/types';

export default function ChatMessageComponent({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user';
  const { t } = useLanguage();

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className="max-w-[85%] space-y-2">
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
            isUser
              ? 'bg-indigo-500/65 backdrop-blur-sm text-white border border-indigo-400/30 rounded-br-sm shadow-lg shadow-indigo-900/20'
              : 'bg-white/10 backdrop-blur-xl border border-white/15 text-white/90 rounded-bl-sm shadow-lg shadow-black/10'
          }`}
        >
          {message.content}
        </div>

        {message.sources && message.sources.length > 0 && (
          <div className="space-y-1 pl-1">
            {message.sources.map((source, i) => (
              <details key={i} className="text-xs group">
                <summary className="cursor-pointer text-white/35 hover:text-white/60 transition-colors select-none list-none flex items-center gap-1">
                  <span className="group-open:rotate-90 transition-transform inline-block">▶</span>
                  {t.chat.source(i + 1, source.chunk_index + 1)}
                </summary>
                <div className="mt-1.5 pl-3 border-l-2 border-white/15 text-white/45 leading-relaxed">
                  {source.content.slice(0, 300)}
                  {source.content.length > 300 ? '…' : ''}
                </div>
              </details>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
