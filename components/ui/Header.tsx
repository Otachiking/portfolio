'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { DarkModeToggle } from './DarkModeToggle';

export function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const pathname = usePathname();
  
  // Only hide header on homepage
  const isHomePage = pathname === '/';

  useEffect(() => {
    // On non-home pages, always show header
    if (!isHomePage) {
      setIsVisible(true);
      setHasScrolled(true);
      return;
    }

    const handleScroll = () => {
      // Get hero section height (approximately viewport height or 600px minimum)
      const heroHeight = Math.max(window.innerHeight * 0.6, 400);
      const scrollY = window.scrollY;

      if (scrollY > heroHeight) {
        setIsVisible(true);
        setHasScrolled(true);
      } else {
        setIsVisible(false);
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  return (
    <header
      className={clsx(
        'fixed left-0 right-0 top-0 z-50 border-b border-text/10 bg-background/80 backdrop-blur-md transition-transform duration-300 ease-out',
        isVisible ? 'translate-y-0' : '-translate-y-full'
      )}
      aria-hidden={!isVisible && isHomePage}
    >
      <div className="container-main">
        <nav
          className="flex h-16 items-center justify-between"
          role="navigation"
          aria-label="Main navigation"
        >
          <Link
            href="/"
            className="text-xl font-bold tracking-tight transition-colors hover:text-primary focus:text-primary"
            aria-label="Go to homepage"
            tabIndex={isVisible ? 0 : -1}
          >
            Portfolio
          </Link>

          <div className="flex items-center gap-6">
            <ul className="flex items-center gap-6" role="list">
              <li>
                <Link
                  href="/"
                  className={clsx(
                    'text-sm font-medium transition-colors hover:text-primary focus:text-primary',
                    pathname === '/' && 'text-primary'
                  )}
                  tabIndex={isVisible ? 0 : -1}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className={clsx(
                    'text-sm font-medium transition-colors hover:text-primary focus:text-primary',
                    pathname?.startsWith('/projects') && 'text-primary'
                  )}
                  tabIndex={isVisible ? 0 : -1}
                >
                  Projects
                </Link>
              </li>
            </ul>
            <DarkModeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
