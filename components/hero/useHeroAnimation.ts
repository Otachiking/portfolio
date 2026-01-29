'use client';

import { useState, useEffect, useRef } from 'react';

interface UseHeroAnimationReturn {
  isAnimating: boolean;
  reducedMotion: boolean;
}

export function useHeroAnimation(): UseHeroAnimationReturn {
  const [isAnimating, setIsAnimating] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const isInitialMount = useRef(true);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Play initial animation on mount
  useEffect(() => {
    if (!isInitialMount.current) return;
    isInitialMount.current = false;

    // Small delay before starting the initial animation
    const startDelay = setTimeout(() => {
      setIsAnimating(false);
    }, 100);

    return () => clearTimeout(startDelay);
  }, []);

  return {
    isAnimating,
    reducedMotion,
  };
}
