'use client';

import { useState, useEffect } from 'react';
import type { BackgroundMode } from './useHeroAnimation';

interface BackgroundHintProps {
  currentMode: BackgroundMode;
  reducedMotion: boolean;
  onModeChange: (mode: BackgroundMode) => void;
}

export function BackgroundHint({ currentMode, reducedMotion, onModeChange }: BackgroundHintProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Show hint after initial animation completes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  const modeNames: Record<BackgroundMode, string> = {
    1: 'Floating Cubes',
    2: 'Prism Grid',
    3: 'Geometric Cascade',
  };

  return (
    <div 
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-lg bg-card-bg/90 backdrop-blur-sm border border-text/10 px-4 py-3 shadow-lg transition-all duration-500"
      style={{ 
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      }}
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col gap-1">
        <span className="text-xs font-medium text-text/50 uppercase tracking-wider">
          Background
        </span>
        <span className="text-sm font-semibold text-text">
          {modeNames[currentMode]}
        </span>
      </div>
      
      <div className="h-8 w-px bg-text/10" aria-hidden="true" />
      
      <div className="flex gap-1">
        {([1, 2, 3] as const).map((mode) => (
          <button
            key={mode}
            onClick={() => onModeChange(mode)}
            className={`flex h-7 w-7 items-center justify-center rounded border text-xs font-mono transition-all duration-200 ${
              currentMode === mode
                ? 'bg-primary border-primary text-white'
                : 'bg-background border-text/20 text-text/60 hover:border-primary/50 hover:text-text'
            }`}
            aria-label={`Switch to ${modeNames[mode]} background`}
            aria-pressed={currentMode === mode}
          >
            {mode}
          </button>
        ))}
      </div>

      <span className="text-xs text-text/40 hidden sm:block">
        or press 1-3
      </span>
    </div>
  );
}
