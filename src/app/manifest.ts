import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'DokumentAI',
    short_name: 'DokumentAI',
    description:
      'Last opp PDF- og Word-dokumenter og still spørsmål om innholdet. Upload Norwegian business documents and ask questions in Norwegian or English.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f172a',
    theme_color: '#6366f1',
    orientation: 'portrait-primary',
    categories: ['productivity', 'business'],
    lang: 'nb',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
