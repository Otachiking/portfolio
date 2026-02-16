'use client';

import { useEffect, useMemo, useState } from 'react';
import type { Certificate } from '@/lib';

interface CertificatesSectionProps {
  certificates: Certificate[];
}

export function CertificatesSection({ certificates }: CertificatesSectionProps) {
  const [selected, setSelected] = useState<Certificate | null>(null);
  const [isCensored, setIsCensored] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const loopItems = useMemo(() => [...certificates, ...certificates], [certificates]);

  useEffect(() => {
    if (!selected) return;

    const handlePrintScreen = (event: KeyboardEvent) => {
      if (event.key === 'PrintScreen') {
        setIsCensored(true);
        setTimeout(() => setIsCensored(false), 1200);
      }
    };

    const handleWindowBlur = () => setIsCensored(true);
    const handleWindowFocus = () => setTimeout(() => setIsCensored(false), 400);

    window.addEventListener('keydown', handlePrintScreen);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);

    return () => {
      window.removeEventListener('keydown', handlePrintScreen);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
    };
  }, [selected]);

  useEffect(() => {
    if (!selected) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
      setIsCensored(false);
    };
  }, [selected]);

  if (!certificates.length) return null;

  return (
    <section className="border-t border-text/10 bg-background py-24" aria-labelledby="certificates-heading">
      <div className="container-main">
        <div className="mb-12 text-center">
          <h2 id="certificates-heading" className="heading-2">Certificates & Badges</h2>
        </div>

        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className="flex w-max gap-8"
            style={{
              animationName: 'certMarquee',
              animationDuration: isHovered ? '90s' : '28s',
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
            }}
          >
            {loopItems.map((item, index) => (
              <button
                key={`${item.id}-${index}`}
                type="button"
                className="group w-[220px] flex-shrink-0 text-left"
                onClick={() => setSelected(item)}
                aria-label={`Open ${item.title} badge`}
              >
                <div className="border border-text/10 bg-card-bg p-4 transition-colors group-hover:border-primary/40">
                  <div className="mb-4 flex h-[150px] items-center justify-center bg-background p-2">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="max-h-[130px] w-auto object-contain"
                      loading="lazy"
                      draggable={false}
                    />
                  </div>
                  <h3 className="text-base font-semibold leading-snug text-text">{item.title}</h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Certificate preview"
          onClick={() => setSelected(null)}
          onContextMenu={(event) => event.preventDefault()}
        >
          <button
            type="button"
            className="absolute right-4 top-4 p-2 text-white/70 transition-colors hover:text-white"
            onClick={() => setSelected(null)}
            aria-label="Close certificate preview"
          >
            <span className="material-icons text-3xl">close</span>
          </button>

          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-center text-xs text-white/55">
            Protected preview · Right click disabled · Screenshot deterrent active
          </div>

          <div
            className="relative max-h-[85vh] max-w-[90vw]"
            onClick={(event) => event.stopPropagation()}
            onContextMenu={(event) => event.preventDefault()}
          >
            <img
              src={selected.image}
              alt={selected.title}
              className="max-h-[85vh] max-w-[90vw] object-contain"
              draggable={false}
            />

            <div className="pointer-events-none absolute inset-0 bg-black/10 backdrop-blur-[1px]" />

            <div className="pointer-events-none absolute inset-0 grid grid-cols-3 grid-rows-3">
              {Array.from({ length: 9 }).map((_, index) => (
                <div key={index} className="flex items-center justify-center">
                  <span className="rotate-[-22deg] text-xs font-semibold tracking-widest text-white/20">
                    IQBAL RASYID • PROTECTED
                  </span>
                </div>
              ))}
            </div>

            {isCensored && (
              <div className="absolute inset-0 flex items-center justify-center bg-black">
                <span className="text-sm font-semibold tracking-wide text-white/80">PROTECTED PREVIEW</span>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes certMarquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
