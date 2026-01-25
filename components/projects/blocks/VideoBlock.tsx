interface VideoBlockProps {
  url: string;
  title?: string;
}

function getYouTubeEmbedUrl(url: string): string | null {
  // Handle various YouTube URL formats
  const patterns = [
    // Standard watch URL: youtube.com/watch?v=VIDEO_ID
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    // Short URL: youtu.be/VIDEO_ID
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    // Embed URL: youtube.com/embed/VIDEO_ID
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    // Shorts URL: youtube.com/shorts/VIDEO_ID
    /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
  }

  return null;
}

function getVimeoEmbedUrl(url: string): string | null {
  // Handle Vimeo URLs: vimeo.com/VIDEO_ID
  const match = url.match(/vimeo\.com\/(\d+)/);
  if (match && match[1]) {
    return `https://player.vimeo.com/video/${match[1]}`;
  }
  return null;
}

export function VideoBlock({ url, title = 'Video Demonstration' }: VideoBlockProps) {
  const youtubeEmbed = getYouTubeEmbedUrl(url);
  const vimeoEmbed = getVimeoEmbedUrl(url);
  const embedUrl = youtubeEmbed || vimeoEmbed;

  if (!embedUrl) {
    // Fallback for unknown video platforms - show as external link
    return (
      <div className="flex items-center justify-center border border-text/10 bg-text/5 p-8">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary underline underline-offset-2 transition-colors hover:text-primary/80"
        >
          Watch video externally
          <span aria-hidden="true">↗</span>
          <span className="sr-only">(opens in new tab)</span>
        </a>
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden border border-text/10 bg-black">
      <iframe
        src={embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
        loading="lazy"
      />
    </div>
  );
}
