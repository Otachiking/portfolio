interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

interface GalleryBlockProps {
  images: GalleryImage[];
}

export function GalleryBlock({ images }: GalleryBlockProps) {
  return (
    <section className="my-12" aria-labelledby="gallery-heading">
      <h2 id="gallery-heading" className="sr-only">
        Project Gallery
      </h2>
      <div
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        role="list"
        aria-label="Project images"
      >
        {images.map((image, index) => (
          <figure
            key={index}
            className="group"
            role="listitem"
          >
            <div className="overflow-hidden border border-text/10 bg-text/5">
              <img
                src={image.src}
                alt={image.alt}
                className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            {image.caption && (
              <figcaption className="mt-2 text-sm text-text/60">
                {image.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </section>
  );
}
