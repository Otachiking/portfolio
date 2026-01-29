'use client';

import { forwardRef } from 'react';

interface HeroSubheadlineProps {
  isAnimating: boolean;
  reducedMotion: boolean;
}

export const HeroSubheadline = forwardRef<HTMLParagraphElement, HeroSubheadlineProps>(
  function HeroSubheadline({ isAnimating, reducedMotion }, ref) {
    const getAnimationClass = () => {
      if (reducedMotion) {
        return isAnimating 
          ? 'opacity-0' 
          : 'opacity-100 transition-opacity duration-500';
      }

      const baseTransition = 'transition-all duration-700 ease-out';

      if (!isAnimating) {
        return `${baseTransition} opacity-100 translate-y-0`;
      }

      return `${baseTransition} opacity-0 translate-y-4`;
    };

    const getStyle = () => {
      return { transitionDelay: isAnimating ? '0ms' : '200ms' };
    };

    return (
      <p
        ref={ref}
        className={`text-lg sm:text-xl text-text/60 ${getAnimationClass()}`}
        style={getStyle()}
      >
        My name is <strong className="font-semibold text-text">Iqbal Rasyid</strong>.
      </p>
    );
  }
);
