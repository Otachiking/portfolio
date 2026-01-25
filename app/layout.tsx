import type { Metadata } from 'next';
import { Header, Footer, QuoteSection } from '@/components/ui';
import { getQuotes } from '@/lib';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Portfolio | Design-Led Development',
    template: '%s | Portfolio',
  },
  description:
    'A design-forward portfolio showcasing work at the intersection of technology and creativity. UI/UX, ML/AI, and Web Development projects.',
  keywords: ['portfolio', 'design', 'development', 'UI/UX', 'machine learning', 'web development'],
  authors: [{ name: 'Portfolio' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Portfolio',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const quotes = getQuotes();

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedTheme = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col">
        {/* Skip Link for Accessibility */}
        <a href="#main" className="skip-link">
          Skip to main content
        </a>

        <Header />

        <main id="main" className="flex-1" role="main">
          {children}
        </main>

        <QuoteSection quotes={quotes} />
        <Footer />
      </body>
    </html>
  );
}
