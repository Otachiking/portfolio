'use client';

import { HeroBackground } from './HeroBackground';
import { HeroHeadline } from './HeroHeadline';
import { HeroSubheadline } from './HeroSubheadline';
import { HeroCTA } from './HeroCTA';
import { HeroPortrait } from './HeroPortrait';
import { useHeroAnimation } from './useHeroAnimation';

export function HeroSection() {
  const { isAnimating, reducedMotion } = useHeroAnimation();

  return (
    <section
      className="relative min-h-screen overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Background with rotating cube decorations */}
      <HeroBackground reducedMotion={reducedMotion} />

      {/* Main content - wider layout, breaking padding rules for hero */}
      <div className="relative z-10 min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          {/* Text content - left side with padding */}
          <div className="flex flex-col justify-center px-6 sm:px-10 lg:px-16 xl:px-24 py-20 lg:py-0">
            <div className="max-w-xl space-y-6">
              {/* Subheadline - now first */}
              <HeroSubheadline
                isAnimating={isAnimating}
                reducedMotion={reducedMotion}
              />

              {/* Headline */}
              <HeroHeadline
                isAnimating={isAnimating}
                reducedMotion={reducedMotion}
              />

              {/* CTA Buttons */}
              <div className="pt-4">
                <HeroCTA
                  isAnimating={isAnimating}
                  reducedMotion={reducedMotion}
                />
              </div>
            </div>
          </div>

          {/* Portrait - right side, edge to edge, 195% height */}
          <div className="relative lg:absolute lg:right-0 lg:top-0 lg:bottom-0 lg:w-1/2 xl:w-[45%]">
            <HeroPortrait
              isAnimating={isAnimating}
              reducedMotion={reducedMotion}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
