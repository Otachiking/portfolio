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
 * 
 * Formula: baseDuration + (characterCount * msPerCharacter)
 * - Base duration: 2000ms (minimum time to read)
 * - Reading speed: ~25ms per character (average reading speed ~200-250 WPM)
 * - This means:
 *   - 50 chars  → 2000 + (50 × 25)  = 3250ms (~3.3s)
 *   - 100 chars → 2000 + (100 × 25) = 4500ms (~4.5s)
 *   - 150 chars → 2000 + (150 × 25) = 5750ms (~5.8s)
 *   - 200 chars → 2000 + (200 × 25) = 7000ms (~7s)
 */
function calculateDuration(text: string): number {
  const baseDuration = 2000; // Minimum 2 seconds
  const msPerCharacter = 25; // ~25ms per character
  const maxDuration = 8000; // Cap at 8 seconds
  
  const duration = baseDuration + (text.length * msPerCharacter);
  return Math.min(duration, maxDuration);
}

export function QuoteSection({ quotes }: QuoteSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [showAttribution, setShowAttribution] = useState(true);
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

      // Delay attribution appearance
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
      className="border-t border-text/10 bg-background py-12 sm:py-16"
      aria-label="Inspirational quotes"
    >
      <div className="container-main">
        <div
          className="mx-auto max-w-4xl text-center"
          role="region"
          aria-live="polite"
          aria-atomic="true"
        >
          {/* Quote Content */}
          <blockquote
            className={clsx(
              'transition-all duration-400 ease-out',
              getAnimationClass()
            )}
          >
            <p className="text-xl font-medium leading-relaxed tracking-tight text-text sm:text-2xl md:text-3xl">
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
