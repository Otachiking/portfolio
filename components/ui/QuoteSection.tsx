'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import clsx from 'clsx';

interface Quote {
  id: string;
  text: string;
  author: string;
  source: string;
  context?: string;
}

interface QuoteSectionProps {
  quotes: Quote[];
}

/**
 * Calculate display duration based on quote length
 */
function calculateDuration(text: string): number {
  const baseDuration = 2000;
  const msPerCharacter = 25;
  const maxDuration = 8000;
  
  const duration = baseDuration + (text.length * msPerCharacter);
  return Math.min(duration, maxDuration);
}

export function QuoteSection({ quotes }: QuoteSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [showAttribution, setShowAttribution] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const goToNext = useCallback(() => {
    if (isAnimating || quotes.length <= 1) return;

    setIsAnimating(true);
    setShowAttribution(false);

    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % quotes.length);
      setIsAnimating(false);

      setTimeout(() => {
        setShowAttribution(true);
      }, prefersReducedMotion ? 0 : 100);
    }, prefersReducedMotion ? 150 : 400);
  }, [isAnimating, quotes.length, prefersReducedMotion]);

  const goToPrev = useCallback(() => {
    if (isAnimating || quotes.length <= 1) return;

    setIsAnimating(true);
    setShowAttribution(false);

    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + quotes.length) % quotes.length);
      setIsAnimating(false);

      setTimeout(() => {
        setShowAttribution(true);
      }, prefersReducedMotion ? 0 : 100);
    }, prefersReducedMotion ? 150 : 400);
  }, [isAnimating, quotes.length, prefersReducedMotion]);

  // Auto-advance timer with dynamic duration
  useEffect(() => {
    if (quotes.length <= 1) return;

    const currentQuote = quotes[currentIndex];
    const duration = calculateDuration(currentQuote.text);

    timeoutRef.current = setTimeout(() => {
      goToNext();
    }, duration);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentIndex, goToNext, quotes]);

  if (!quotes.length) return null;

  const currentQuote = quotes[currentIndex];

  const getAnimationClass = () => {
    if (prefersReducedMotion) {
      return isAnimating ? 'opacity-0' : 'opacity-100';
    }

    if (isAnimating) {
      return '-translate-x-[10%] opacity-0';
    }
    return 'translate-x-0 opacity-100';
  };

  return (
    <section
      ref={containerRef}
      className="relative border-t border-text/10 bg-background py-8 sm:py-10"
      aria-label="Inspirational quotes"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Previous Arrow - positioned on left edge */}
      {quotes.length > 1 && (
        <button
          type="button"
          onClick={goToPrev}
          className={clsx(
            'absolute left-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center text-text/30 transition-all duration-300 hover:text-text/70 focus:text-text/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
            isHovered ? 'opacity-100' : 'opacity-0'
          )}
          aria-label="Previous quote"
        >
          <span className="material-icons text-3xl">chevron_left</span>
        </button>
      )}

      {/* Next Arrow - positioned on right edge */}
      {quotes.length > 1 && (
        <button
          type="button"
          onClick={goToNext}
          className={clsx(
            'absolute right-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center text-text/30 transition-all duration-300 hover:text-text/70 focus:text-text/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
            isHovered ? 'opacity-100' : 'opacity-0'
          )}
          aria-label="Next quote"
        >
          <span className="material-icons text-3xl">chevron_right</span>
        </button>
      )}

      <div className="container-main">
        <div
          className="text-center min-h-[160px] sm:min-h-[180px] flex flex-col justify-center"
          role="region"
          aria-live="polite"
          aria-atomic="true"
        >
          {/* Quote Content - vertically centered */}
          <blockquote
            className={clsx(
              'transition-all duration-400 ease-out',
              getAnimationClass()
            )}
          >
            <p className="text-xl font-medium leading-relaxed tracking-tight text-text sm:text-2xl md:text-3xl whitespace-pre-line">
              &ldquo;{currentQuote.text}&rdquo;
            </p>

            <footer
              className={clsx(
                'mt-6 transition-opacity duration-300',
                showAttribution && !isAnimating ? 'opacity-100' : 'opacity-0'
              )}
            >
              <cite className="not-italic text-text/60">
                <span className="text-sm sm:text-base">
                  — {currentQuote.author},{' '}
                  <em className="text-text/50">{currentQuote.source}</em>
                  {currentQuote.context && (
                    <span className="text-text/40">
                      {' '}
                      ({currentQuote.context})
                    </span>
                  )}
                </span>
              </cite>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
