import type { ChatMessage } from '@/lib/types';

export default function ChatMessageComponent({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className="max-w-[85%] space-y-2">
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
            isUser
              ? 'bg-blue-600 text-white rounded-br-sm'
              : 'bg-white border border-gray-200 text-gray-900 rounded-bl-sm shadow-sm'
          }`}
        >
          {message.content}
        </div>

        {message.sources && message.sources.length > 0 && (
          <div className="space-y-1 pl-1">
            {message.sources.map((source, i) => (
              <details key={i} className="text-xs group">
                <summary className="cursor-pointer text-gray-400 hover:text-gray-600 transition-colors select-none list-none flex items-center gap-1">
                  <span className="group-open:rotate-90 transition-transform inline-block">▶</span>
                  Kilde {i + 1} · avsnitt {source.chunk_index + 1}
                </summary>
                <div className="mt-1.5 pl-3 border-l-2 border-gray-200 text-gray-500 leading-relaxed">
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
