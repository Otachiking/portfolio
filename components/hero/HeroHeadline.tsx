'use client';

import { forwardRef } from 'react';

interface HeroHeadlineProps {
  isAnimating: boolean;
  reducedMotion: boolean;
}

export const HeroHeadline = forwardRef<HTMLHeadingElement, HeroHeadlineProps>(
  function HeroHeadline({ isAnimating, reducedMotion }, ref) {
    
    const getWordAnimationClass = (wordIndex: number) => {
      if (reducedMotion) {
        return isAnimating 
          ? 'opacity-0' 
          : 'opacity-100 transition-opacity duration-500';
      }

      const baseTransition = 'transition-all duration-500 ease-out';

      if (!isAnimating) {
        return `${baseTransition} opacity-100 translate-y-0`;
      }

      return `${baseTransition} opacity-0 translate-y-4`;
    };

    const getWordStyle = (wordIndex: number) => {
      const delay = wordIndex * 80 + 400;
      return { transitionDelay: isAnimating ? '0ms' : `${delay}ms` };
    };

    // Words with their styling - new headline
    const words = [
      { text: "I'm", class: '' },
      { text: 'a', class: '' },
      { text: 'designer,', class: 'text-secondary dark:drop-shadow-[0_0_20px_rgb(var(--color-secondary)/0.4)]' },
      { text: 'who', class: '' },
      { text: 'codes,', class: 'text-dark-grey' },
      { text: 'and', class: '' },
      { text: 'driven', class: '' },
      { text: 'by', class: '' },
      { text: 'data.', class: 'text-primary dark:drop-shadow-[0_0_20px_rgb(var(--color-primary)/0.4)]' },
    ];

    return (
      <h1
        ref={ref}
        id="hero-heading"
        className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1]"
      >
        {words.map((word, index) => (
          <span
            key={index}
            className={`inline-block mr-[0.25em] ${word.class} ${getWordAnimationClass(index)}`}
            style={getWordStyle(index)}
          >
            {word.text}
          </span>
        ))}
      </h1>
    );
  }
);
