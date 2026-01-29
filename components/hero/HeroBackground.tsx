'use client';

import { forwardRef } from 'react';

interface HeroBackgroundProps {
  reducedMotion: boolean;
}

export const HeroBackground = forwardRef<HTMLDivElement, HeroBackgroundProps>(
  function HeroBackground({ reducedMotion }, ref) {
    // Generate grid lines - denser grid
    const generateGridLines = (count: number) => {
      const lines = [];
      for (let i = 1; i < count; i++) {
        const percent = (i / count) * 100;
        lines.push(percent);
      }
      return lines;
    };

    const horizontalLines = generateGridLines(14);
    const verticalLines = generateGridLines(20);

    // Animation class for slow rotation
    const rotateClass = reducedMotion ? '' : 'animate-slow-spin';
    const rotateReverseClass = reducedMotion ? '' : 'animate-slow-spin-reverse';

    return (
      <div ref={ref} className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Base background */}
        <div className="absolute inset-0 bg-background" />

        {/* Grid lines - always visible, dense */}
        <div className="absolute inset-0">
          {/* Horizontal lines */}
          {horizontalLines.map((percent, i) => (
            <div
              key={`h-${i}`}
              className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-text/[0.04] to-transparent dark:via-text/[0.06]"
              style={{ top: `${percent}%` }}
            />
          ))}
          
          {/* Vertical lines */}
          {verticalLines.map((percent, i) => (
            <div
              key={`v-${i}`}
              className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-text/[0.04] to-transparent dark:via-text/[0.06]"
              style={{ left: `${percent}%` }}
            />
          ))}
        </div>

        {/* Floating Cubes with slow rotation */}
        <div className="absolute inset-0">
          {/* Large cube group - top right */}
          <div className={`absolute -top-20 -right-20 w-80 h-80 ${rotateClass}`} style={{ transformOrigin: 'center center' }}>
            <div className="absolute inset-0 border border-secondary/20 dark:border-secondary/30" />
          </div>
          <div className={`absolute -top-16 -right-16 w-72 h-72 ${rotateReverseClass}`} style={{ transformOrigin: 'center center' }}>
            <div className="absolute inset-0 border border-secondary/10 dark:border-secondary/20" />
          </div>
          
          {/* Medium cube group - bottom left */}
          <div className={`absolute -bottom-10 -left-10 w-48 h-48 ${rotateReverseClass}`} style={{ transformOrigin: 'center center' }}>
            <div className="absolute inset-0 border border-primary/20 dark:border-primary/30" />
          </div>
          <div className={`absolute -bottom-6 -left-6 w-40 h-40 ${rotateClass}`} style={{ transformOrigin: 'center center' }}>
            <div className="absolute inset-0 border border-primary/10 dark:border-primary/20" />
          </div>

          {/* Small floating cubes */}
          <div className={`absolute top-1/4 left-1/4 w-16 h-16 ${rotateClass}`} style={{ transformOrigin: 'center center' }}>
            <div className="absolute inset-0 border border-secondary/15" />
          </div>
          <div className={`absolute top-1/3 right-1/3 w-12 h-12 ${rotateReverseClass}`} style={{ transformOrigin: 'center center' }}>
            <div className="absolute inset-0 border border-primary/15" />
          </div>
          <div className={`absolute bottom-1/4 left-1/2 w-20 h-20 ${rotateClass}`} style={{ transformOrigin: 'center center' }}>
            <div className="absolute inset-0 border border-secondary/10" />
          </div>
        </div>

        {/* Subtle gradient overlays - geometric style */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-secondary/[0.02] to-transparent dark:from-secondary/[0.05]" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-primary/[0.02] to-transparent dark:from-primary/[0.05]" />
      </div>
    );
  }
);
