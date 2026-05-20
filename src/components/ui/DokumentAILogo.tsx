export default function DokumentAILogo({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="DokumentAI logo"
    >
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <linearGradient id="glassSheen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.30)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.04)" />
        </linearGradient>
      </defs>

      {/* Background rounded square */}
      <rect width="32" height="32" rx="8" fill="url(#logoGrad)" />

      {/* Glass sheen overlay */}
      <rect width="32" height="16" rx="8" fill="url(#glassSheen)" />
      <rect y="8" width="32" height="8" fill="url(#glassSheen)" />

      {/* Document shape */}
      <path
        d="M9 7h9l5 5v13a1 1 0 01-1 1H9a1 1 0 01-1-1V8a1 1 0 011-1z"
        fill="rgba(255,255,255,0.92)"
      />

      {/* Folded corner */}
      <path d="M18 7l5 5h-4a1 1 0 01-1-1V7z" fill="rgba(99,102,241,0.5)" />

      {/* Document lines */}
      <line x1="11" y1="14" x2="21" y2="14" stroke="rgba(99,102,241,0.7)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="11" y1="17" x2="21" y2="17" stroke="rgba(99,102,241,0.7)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="11" y1="20" x2="17" y2="20" stroke="rgba(99,102,241,0.7)" strokeWidth="1.5" strokeLinecap="round" />

      {/* AI sparkle — top-right */}
      <g transform="translate(20, 5)">
        <path
          d="M4 0 L4.6 2.4 L7 3 L4.6 3.6 L4 6 L3.4 3.6 L1 3 L3.4 2.4 Z"
          fill="rgba(255,255,255,0.95)"
        />
      </g>
    </svg>
  );
}
