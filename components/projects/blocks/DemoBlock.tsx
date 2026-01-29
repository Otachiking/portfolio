'use client';

import { useState } from 'react';

interface DemoBlockProps {
  url: string;
  title?: string;
}

export function DemoBlock({ url, title = 'Live Demo' }: DemoBlockProps) {
  const [loadError, setLoadError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Show external link button if iframe fails or for non-embeddable URLs
  if (loadError) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 border border-text/10 bg-text/5 p-8 text-center">
        <p className="text-text/60">
          This demo cannot be embedded. Click the button below to open it in a new tab.
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-primary bg-primary px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-primary/90"
        >
          Open Demo
          <span aria-hidden="true">↗</span>
          <span className="sr-only">(opens in new tab)</span>
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-[4/3] w-full overflow-hidden border border-text/10 bg-text/5">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 animate-spin border-2 border-text/20 border-t-primary" />
          </div>
        )}
        <iframe
          src={url}
          title={title}
          className="absolute inset-0 h-full w-full"
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          onLoad={() => setIsLoading(false)}
          onError={() => setLoadError(true)}
        />
      </div>
      <p className="text-center text-sm text-text/60">
        Having trouble? Go to:{' '}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline underline-offset-2 transition-colors hover:text-primary/80"
        >
          {(() => {
            try {
              return new URL(url).hostname;
            } catch {
              return url;
            }
          })()}
          <span className="sr-only">(opens in new tab)</span>
        </a>
      </p>
    </div>
  );
}
