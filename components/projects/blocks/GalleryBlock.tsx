'use client';

import { useState, useEffect, useCallback } from 'react';

interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

interface GalleryBlockProps {
  images: GalleryImage[];
  title?: string;
}

export function GalleryBlock({ images, title = "Gallery" }: GalleryBlockProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!selectedImage) return;
    
    if (e.key === 'Escape') {
      setSelectedImage(null);
    } else if (e.key === 'ArrowRight') {
      const nextIndex = (selectedIndex + 1) % images.length;
      setSelectedIndex(nextIndex);
      setSelectedImage(images[nextIndex]);
    } else if (e.key === 'ArrowLeft') {
      const prevIndex = (selectedIndex - 1 + images.length) % images.length;
      setSelectedIndex(prevIndex);
      setSelectedImage(images[prevIndex]);
    }
  }, [selectedImage, selectedIndex, images]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedImage]);

  const openLightbox = (image: GalleryImage, index: number) => {
    setSelectedImage(image);
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIndex = (selectedIndex + 1) % images.length;
    setSelectedIndex(nextIndex);
    setSelectedImage(images[nextIndex]);
  };

  const goToPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prevIndex = (selectedIndex - 1 + images.length) % images.length;
    setSelectedIndex(prevIndex);
    setSelectedImage(images[prevIndex]);
  };

  if (!images || images.length === 0) return null;

  return (
    <section className="mt-12 mb-8">
      {/* Section Title */}
      <h2 className="heading-3 mb-6">{title}</h2>

      {/* Horizontal Scrollable Gallery */}
      <div className="relative group/gallery">
        {/* Scroll hint gradient - left */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none opacity-0 group-hover/gallery:opacity-100 transition-opacity" />
        
        {/* Scroll hint gradient - right */}
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none opacity-0 group-hover/gallery:opacity-100 transition-opacity" />

        {/* Gallery container */}
        <div 
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-text/20 scrollbar-track-transparent hover:scrollbar-thumb-text/40 scroll-smooth snap-x snap-mandatory"
          role="list"
          aria-label="Project gallery images"
        >
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => openLightbox(image, index)}
              className="group flex-shrink-0 snap-start focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              role="listitem"
              aria-label={`View ${image.alt || `image ${index + 1}`} in fullscreen`}
            >
              <figure className="relative">
                <div className="overflow-hidden border border-text/10 bg-text/5 transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-lg group-hover:shadow-primary/10">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-[200px] sm:h-[240px] lg:h-[280px] w-auto max-w-[400px] sm:max-w-[480px] lg:max-w-[560px] object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/30">
                    <span className="material-icons text-white text-3xl opacity-0 transform scale-75 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
                      zoom_in
                    </span>
                  </div>
                </div>
                {image.caption && (
                  <figcaption className="mt-2 text-left text-sm text-text/60 max-w-[400px] truncate">
                    {image.caption}
                  </figcaption>
                )}
              </figure>
            </button>
          ))}
        </div>

        {/* Scroll indicator */}
        {images.length > 2 && (
          <div className="flex items-center justify-center gap-2 mt-4 text-xs text-text/40">
            <span className="material-icons text-base">swipe</span>
            <span>Scroll to see more</span>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 p-2 text-white/70 hover:text-white transition-colors"
            aria-label="Close lightbox"
          >
            <span className="material-icons text-3xl">close</span>
          </button>

          {/* Navigation - Previous */}
          {images.length > 1 && (
            <button
              onClick={goToPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 text-white/70 hover:text-white transition-colors hover:bg-white/10 rounded-full"
              aria-label="Previous image"
            >
              <span className="material-icons text-4xl">chevron_left</span>
            </button>
          )}

          {/* Navigation - Next */}
          {images.length > 1 && (
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 text-white/70 hover:text-white transition-colors hover:bg-white/10 rounded-full"
              aria-label="Next image"
            >
              <span className="material-icons text-4xl">chevron_right</span>
            </button>
          )}

          {/* Image container */}
          <div 
            className="relative max-w-[90vw] max-h-[85vh] animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-[85vh] w-auto h-auto object-contain"
            />
            
            {/* Caption and counter */}
            <div className="absolute -bottom-12 left-0 right-0 text-center">
              {selectedImage.caption && (
                <p className="text-white/80 text-sm mb-1">{selectedImage.caption}</p>
              )}
              <p className="text-white/50 text-xs">
                {selectedIndex + 1} / {images.length}
              </p>
            </div>
          </div>

          {/* Keyboard hints */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-4 text-white/40 text-xs">
            <span>← → Navigate</span>
            <span>ESC Close</span>
          </div>
        </div>
      )}
    </section>
  );
}
