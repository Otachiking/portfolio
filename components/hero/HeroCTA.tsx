'use client';

import { forwardRef, useCallback } from 'react';
import Link from 'next/link';

interface HeroCTAProps {
  isAnimating: boolean;
  reducedMotion: boolean;
}

export const HeroCTA = forwardRef<HTMLDivElement, HeroCTAProps>(
  function HeroCTA({ isAnimating, reducedMotion }, ref) {
    const handleCollaborateClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      
      const targetSection = document.querySelector('[aria-labelledby="cta-heading"]');
      if (!targetSection) return;

      // Smooth scroll to target
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Add highlight effect after scroll
      setTimeout(() => {
        targetSection.classList.add('ring-2', 'ring-primary/50', 'ring-offset-4', 'ring-offset-background');
        
        // Remove highlight after a brief moment
        setTimeout(() => {
          targetSection.classList.remove('ring-2', 'ring-primary/50', 'ring-offset-4', 'ring-offset-background');
        }, 2000);

        // Set focus for accessibility
        const heading = targetSection.querySelector('#cta-heading');
        if (heading instanceof HTMLElement) {
          heading.setAttribute('tabindex', '-1');
          heading.focus();
        }
      }, 800);
    }, []);

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
      return { transitionDelay: isAnimating ? '0ms' : '1000ms' };
    };

    return (
      <div
        ref={ref}
        className={`flex flex-wrap gap-4 ${getAnimationClass()}`}
        style={getStyle()}
      >
        <Link
          href="/projects"
          className="inline-flex items-center justify-center border-2 border-primary bg-primary px-8 py-3 font-semibold text-white transition-all duration-200 hover:bg-primary/90 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98]"
        >
          View All Projects
        </Link>
        <button
          onClick={handleCollaborateClick}
          className="inline-flex items-center justify-center border-2 border-text/20 bg-transparent px-8 py-3 font-semibold text-text transition-all duration-200 hover:border-secondary hover:text-secondary hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98]"
        >
          Let&apos;s collaborate
        </button>
      </div>
    );
  }
);
