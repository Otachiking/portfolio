'use client';

import { useEffect, useState } from 'react';

export function Footer() {
  const [currentYear, setCurrentYear] = useState(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer
      className="border-t border-text/10 bg-background"
      role="contentinfo"
    >
      <div className="container-main min-h-[72px] px-4 py-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-text/50">
            © {currentYear} Iqbal&apos;s Portfolio. All rights reserved.
          </p>
          <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:gap-4">
            <a
              href="mailto:otachiking123@gmail.com"
              className="inline-flex items-center gap-1 text-sm text-text/50 transition-colors hover:text-primary"
            >
              <span className="material-icons text-base" aria-hidden="true">mail</span>
              <span className="truncate">otachiking123@gmail.com</span>
            </a>
            <span className="text-text/20 hidden sm:inline">|</span>
            <a
              href="https://github.com/Otachiking"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-text/50 transition-colors hover:text-primary"
            >
              GitHub
              <span aria-hidden="true">↗</span>
              <span className="sr-only">(opens in new tab)</span>
            </a>
            <span className="text-text/20 hidden sm:inline">|</span>
            <a
              href="https://linkedin.com/in/miqbalrasyid/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-text/50 transition-colors hover:text-primary"
            >
              LinkedIn
              <span aria-hidden="true">↗</span>
              <span className="sr-only">(opens in new tab)</span>
            </a>
            <span className="text-text/20 hidden sm:inline">|</span>
            <a
              href="https://instagram.com/otachiking"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-text/50 transition-colors hover:text-primary"
            >
              Instagram
              <span aria-hidden="true">↗</span>
              <span className="sr-only">(opens in new tab)</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
