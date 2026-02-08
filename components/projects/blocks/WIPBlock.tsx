'use client';

import { useEffect, useState } from 'react';

interface WIPBlockProps {
  title?: string;
  message?: string;
}

export function WIPBlock({ 
  title = "Work in Progress", 
  message = "This section is still being crafted. Check back soon for updates!"
}: WIPBlockProps) {
  const [dots, setDots] = useState('');
  const [pulse, setPulse] = useState(false);

  // Animated loading dots
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Pulse animation trigger
  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 1000);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="mb-12">
      <div className="relative overflow-hidden border-2 border-dashed border-secondary/40 bg-secondary/5 p-8 sm:p-12">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 10px,
                currentColor 10px,
                currentColor 11px
              )`,
            }}
          />
        </div>

        {/* Animated corner accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-secondary/60" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-secondary/60" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-secondary/60" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-secondary/60" />

        <div className="relative flex flex-col items-center text-center">
          {/* Animated icon */}
          <div className={`mb-6 transition-transform duration-500 ${pulse ? 'scale-110' : 'scale-100'}`}>
            <div className="relative">
              {/* Outer ring with animation */}
              <div className={`absolute inset-0 rounded-full border-2 border-secondary/30 ${pulse ? 'animate-ping' : ''}`} 
                   style={{ width: '80px', height: '80px', margin: '-4px' }} />
              
              {/* Main icon container */}
              <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-secondary/10 text-4xl">
                🚧
              </div>
            </div>
          </div>

          {/* Title with animated dots */}
          <h3 className="heading-3 mb-3 text-secondary">
            {title}<span className="inline-block w-8 text-left">{dots}</span>
          </h3>

          {/* Message */}
          <p className="max-w-md text-text/60">
            {message}
          </p>

          {/* Progress indicator */}
          <div className="mt-6 flex items-center gap-2 text-sm text-text/40">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
            </span>
            <span>Content coming soon</span>
          </div>
        </div>

        {/* Decorative animated line at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-transparent via-secondary/40 to-transparent animate-shimmer"
            style={{
              backgroundSize: '200% 100%',
              animation: 'shimmer 2s infinite linear',
            }}
          />
        </div>
      </div>

      {/* Shimmer animation keyframes */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite linear;
        }
      `}</style>
    </section>
  );
}
