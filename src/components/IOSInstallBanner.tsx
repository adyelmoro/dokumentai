'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const DISMISSED_KEY = 'dokumentai-ios-install-dismissed';

function isIOSSafari(): boolean {
  if (typeof window === 'undefined') return false;
  const ua = window.navigator.userAgent;
  const isIOS = /iPad|iPhone|iPod/.test(ua);
  const isNotOtherBrowser = !/CriOS|FxiOS|EdgiOS|OPiOS/.test(ua);
  const isStandalone =
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
  return isIOS && isNotOtherBrowser && !isStandalone;
}

export default function IOSInstallBanner() {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!isIOSSafari()) return;
    if (localStorage.getItem(DISMISSED_KEY)) return;

    const timer = setTimeout(() => {
      setMounted(true);
      // Two rAF ticks so the element is in the DOM before the transition fires
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setShow(true));
      });
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  function dismiss() {
    setShow(false);
    localStorage.setItem(DISMISSED_KEY, '1');
    setTimeout(() => setMounted(false), 350);
  }

  if (!mounted) return null;

  return (
    <div
      aria-label="Installasjonsveiledning"
      style={{
        position: 'fixed',
        left: '16px',
        right: '16px',
        bottom: 'calc(env(safe-area-inset-bottom, 0px) + 72px)',
        transform: show ? 'translateY(0)' : 'translateY(120%)',
        transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
        zIndex: 9999,
      }}
    >
      <div className="bg-white/12 backdrop-blur-2xl border border-white/20 rounded-2xl p-4 flex items-center gap-3 shadow-2xl shadow-black/40">
        <Image
          src="/icon-192.png"
          alt="DokumentAI ikon"
          width={44}
          height={44}
          className="rounded-xl flex-shrink-0"
        />

        <div className="flex-1 min-w-0">
          <p className="text-white font-semibold text-sm leading-tight">
            Installer DokumentAI
          </p>
          <p className="text-white/60 text-xs mt-0.5 leading-snug">
            Trykk <ShareIcon /> og velg «Legg til på Hjem-skjerm»
          </p>
        </div>

        <button
          onClick={dismiss}
          aria-label="Lukk"
          className="flex-shrink-0 p-1 text-white/40 hover:text-white/80 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M12 4L4 12M4 4l8 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

function ShareIcon() {
  return (
    <svg
      style={{ display: 'inline', verticalAlign: '-2px', margin: '0 1px' }}
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6.5 1v7.5M4 3.5L6.5 1 9 3.5M1.5 8.5v3a.5.5 0 00.5.5h9a.5.5 0 00.5-.5v-3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
