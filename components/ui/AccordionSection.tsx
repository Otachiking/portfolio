'use client';

import { useState, useId } from 'react';
import clsx from 'clsx';

interface AccordionSectionProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function AccordionSection({
  title,
  defaultOpen = false,
  children,
  className,
}: AccordionSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentId = useId();
  const buttonId = useId();

  return (
    <section
      className={clsx(
        'border border-text/10 bg-background',
        className
      )}
    >
      <h2 className="m-0">
        <button
          id={buttonId}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls={contentId}
          className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition-colors hover:bg-text/5 sm:px-6"
        >
          <span className="text-lg font-semibold text-text">
            {title}
          </span>
          <span
            aria-hidden="true"
            className={clsx(
              'flex h-8 w-8 shrink-0 items-center justify-center text-xl text-text/60 transition-transform duration-200',
              isOpen && 'rotate-180'
            )}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 7.5L10 12.5L15 7.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="square"
                strokeLinejoin="miter"
              />
            </svg>
          </span>
        </button>
      </h2>
      <div
        id={contentId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!isOpen}
        className={clsx(
          'overflow-hidden transition-all duration-200',
          isOpen ? 'animate-accordion-down' : 'animate-accordion-up'
        )}
      >
        <div className="border-t border-text/10 px-4 py-6 sm:px-6">
          {children}
        </div>
      </div>
    </section>
  );
}
