export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="border-t border-text/10 bg-background"
      role="contentinfo"
    >
      <div className="container-main min-h-[72px] px-4 py-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-text/50">
            © {currentYear} Portfolio. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-text/50 transition-colors hover:text-primary"
            >
              LinkedIn
              <span aria-hidden="true">↗</span>
              <span className="sr-only">(opens in new tab)</span>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-text/50 transition-colors hover:text-primary"
            >
              GitHub
              <span aria-hidden="true">↗</span>
              <span className="sr-only">(opens in new tab)</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
