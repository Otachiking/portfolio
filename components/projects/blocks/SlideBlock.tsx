interface SlideBlockProps {
  url: string;
  title?: string;
}

export function SlideBlock({ url, title = 'Slide Presentation' }: SlideBlockProps) {
  // Detect Canva URLs and convert to embed format
  const getCanvaEmbedUrl = (rawUrl: string): string | null => {
    // Canva design URLs: canva.com/design/...
    const match = rawUrl.match(/canva\.com\/design\/([^/]+)\/([^/]+)\//);
    if (match) {
      return `https://www.canva.com/design/${match[1]}/${match[2]}/view?embed`;
    }
    return null;
  };

  // Detect Google Slides and convert to embed format
  const getGoogleSlidesEmbedUrl = (rawUrl: string): string | null => {
    // Pattern: docs.google.com/presentation/d/PRESENTATION_ID/...
    const match = rawUrl.match(/docs\.google\.com\/presentation\/d\/([a-zA-Z0-9_-]+)/);
    if (match) {
      return `https://docs.google.com/presentation/d/${match[1]}/embed?start=false&loop=false`;
    }
    return null;
  };

  const canvaEmbed = getCanvaEmbedUrl(url);
  const googleSlidesEmbed = getGoogleSlidesEmbedUrl(url);
  const embedUrl = canvaEmbed || googleSlidesEmbed;

  if (!embedUrl) {
    // Fallback: show external link for unknown slide formats
    return (
      <div className="flex flex-col items-center justify-center gap-4 border border-text/10 bg-text/5 p-8 text-center">
        <span className="material-icons text-4xl text-text/30" aria-hidden="true">
          slideshow
        </span>
        <p className="text-text/60">Click below to open the presentation.</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-secondary bg-secondary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-secondary/90"
        >
          <span className="material-icons" style={{ fontSize: '18px' }}>open_in_new</span>
          Open Slides
          <span className="sr-only">(opens in new tab)</span>
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="relative w-full overflow-hidden border border-text/10 bg-text/5" style={{ aspectRatio: '16/9' }}>
        <iframe
          src={embedUrl}
          title={title}
          allow="fullscreen"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
          loading="lazy"
        />
      </div>
      <p className="text-center text-sm text-text/60">
        Having trouble?{' '}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline underline-offset-2 transition-colors hover:text-primary/80"
        >
          Open in new tab
          <span className="sr-only">(opens in new tab)</span>
        </a>
      </p>
    </div>
  );
}
