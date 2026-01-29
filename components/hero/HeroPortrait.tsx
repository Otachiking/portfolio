'use client';

import { forwardRef } from 'react';
import Image from 'next/image';

interface HeroPortraitProps {
  isAnimating: boolean;
  reducedMotion: boolean;
}

export const HeroPortrait = forwardRef<HTMLDivElement, HeroPortraitProps>(
  function HeroPortrait({ isAnimating, reducedMotion }, ref) {
    const getContainerAnimationClass = () => {
      if (reducedMotion) {
        return isAnimating 
          ? 'opacity-0' 
          : 'opacity-100 transition-opacity duration-700';
      }

      const baseTransition = 'transition-all duration-1000 ease-out';

      if (!isAnimating) {
        return `${baseTransition} opacity-100 translate-x-0`;
      }

      return `${baseTransition} opacity-0 translate-x-16`;
    };

    const getStyle = () => {
      if (reducedMotion) {
        return { transitionDelay: isAnimating ? '0ms' : '300ms' };
      }
      return { transitionDelay: isAnimating ? '0ms' : '500ms' };
    };

    return (
      <div
        ref={ref}
        className={`relative h-full ${getContainerAnimationClass()}`}
        style={getStyle()}
      >
        {/* Image container - 195% height for dramatic effect, cropped, transparent bg */}
        <div className="relative w-full h-[195%] min-h-[500px] lg:min-h-[650px]">
          {/* Image - always black & white, no background frame */}
          <Image
            src="/images/myself.png"
            alt="Iqbal Rasyid - Design-led Engineer"
            fill
            priority
            className="object-cover object-top grayscale contrast-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          />
        </div>
      </div>
    );
  }
);
