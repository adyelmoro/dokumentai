// One-time script to generate PWA PNG icons from the SVG logo.
// Run: node scripts/generate-icons.js
// Requires: npm install sharp (temporary — can uninstall after running)

const sharp = require('sharp');
const path = require('path');

// SVG source — scaled up version of icon.svg for rasterisation
const svg = `<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#6366f1"/>
      <stop offset="100%" stop-color="#7c3aed"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="112" fill="url(#g)"/>
  <path d="M144 112h144l80 80v208a16 16 0 01-16 16H144a16 16 0 01-16-16V128a16 16 0 0116-16z" fill="rgba(255,255,255,0.92)"/>
  <path d="M288 112l80 80h-64a16 16 0 01-16-16V112z" fill="rgba(99,102,241,0.5)"/>
  <line x1="176" y1="224" x2="336" y2="224" stroke="rgba(99,102,241,0.7)" stroke-width="20" stroke-linecap="round"/>
  <line x1="176" y1="272" x2="336" y2="272" stroke="rgba(99,102,241,0.7)" stroke-width="20" stroke-linecap="round"/>
  <line x1="176" y1="320" x2="272" y2="320" stroke="rgba(99,102,241,0.7)" stroke-width="20" stroke-linecap="round"/>
  <path d="M384 48 L393.6 86.4 L432 96 L393.6 105.6 L384 144 L374.4 105.6 L336 96 L374.4 86.4 Z" fill="rgba(255,255,255,0.95)"/>
</svg>`;

const svgBuffer = Buffer.from(svg);
const publicDir = path.join(__dirname, '..', 'public');

async function generate() {
  await sharp(svgBuffer).resize(192, 192).png().toFile(path.join(publicDir, 'icon-192.png'));
  console.log('Generated icon-192.png');

  await sharp(svgBuffer).resize(512, 512).png().toFile(path.join(publicDir, 'icon-512.png'));
  console.log('Generated icon-512.png');

  // Apple touch icon — 180x180 with no rounded corners (iOS adds them)
  await sharp(svgBuffer).resize(180, 180).png().toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('Generated apple-touch-icon.png');

  console.log('All PWA icons generated successfully.');
}

generate().catch(console.error);
