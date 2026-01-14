'use client';

import Link from 'next/link';
import { DarkModeToggle } from './DarkModeToggle';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-text/10 bg-background/80 backdrop-blur-md">
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
          >
            Portfolio
          </Link>

          <div className="flex items-center gap-6">
            <ul className="flex items-center gap-6" role="list">
              <li>
                <Link
                  href="/"
                  className="text-sm font-medium transition-colors hover:text-primary focus:text-primary"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-sm font-medium transition-colors hover:text-primary focus:text-primary"
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
