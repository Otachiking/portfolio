import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="mt-auto border-t border-text/10 bg-background"
      role="contentinfo"
    >
      <div className="container-main py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link
              href="/"
              className="text-xl font-bold tracking-tight transition-colors hover:text-primary"
            >
              Portfolio
            </Link>
            <p className="text-sm text-text/70">
              Design-led work at the intersection of technology and creativity.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-text/50">
              Navigation
            </h3>
            <ul className="space-y-2" role="list">
              <li>
                <Link
                  href="/"
                  className="text-sm transition-colors hover:text-primary"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-sm transition-colors hover:text-primary"
                >
                  Projects
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-text/50">
              Categories
            </h3>
            <ul className="space-y-2" role="list">
              <li>
                <Link
                  href="/projects?category=UI/UX"
                  className="text-sm transition-colors hover:text-primary"
                >
                  UI/UX Design
                </Link>
              </li>
              <li>
                <Link
                  href="/projects?category=Data%20%26%20ML/AI"
                  className="text-sm transition-colors hover:text-primary"
                >
                  Data & ML/AI
                </Link>
              </li>
              <li>
                <Link
                  href="/projects?category=Web%20Dev"
                  className="text-sm transition-colors hover:text-primary"
                >
                  Web Development
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-text/50">
              Connect
            </h3>
            <ul className="space-y-2" role="list">
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm transition-colors hover:text-primary"
                >
                  LinkedIn
                  <span aria-hidden="true">↗</span>
                  <span className="sr-only">(opens in new tab)</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm transition-colors hover:text-primary"
                >
                  GitHub
                  <span aria-hidden="true">↗</span>
                  <span className="sr-only">(opens in new tab)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-text/10 pt-8 sm:flex-row">
          <p className="text-sm text-text/50">
            © {currentYear} Portfolio. All rights reserved.
          </p>
          <p className="text-sm text-text/50">
            Built with Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
