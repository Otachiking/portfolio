interface ImageBlockProps {
  src: string;
  alt: string;
  caption?: string;
}

export function ImageBlock({ src, alt, caption }: ImageBlockProps) {
  return (
    <figure role="figure" aria-labelledby={caption ? 'image-caption' : undefined}>
      <div className="overflow-hidden border border-text/10 bg-text/5">
        <img
          src={src}
          alt={alt}
          className="w-full object-cover"
          loading="lazy"
        />
      </div>
      {caption && (
        <figcaption
          id="image-caption"
          className="mt-3 text-center text-sm text-text/60"
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
