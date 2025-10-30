import { useState, useEffect } from 'react';

interface ImageLightboxProps {
  images: { src: string; alt?: string }[];
  isOpen: boolean;
  initialIndex: number;
  onClose: () => void;
}

export default function ImageLightbox({
  images,
  isOpen,
  initialIndex,
  onClose,
}: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        goToPrev();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, currentIndex]);

  if (!isOpen) return null;

  const goToNext = () => setCurrentIndex((currentIndex + 1) % images.length);
  const goToPrev = () =>
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery"
    >
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 z-10"
        aria-label="Close gallery"
      >
        ×
      </button>

      <div className="relative w-full h-full flex items-center justify-center p-8">
        <img
          src={images[currentIndex].src}
          alt={images[currentIndex].alt || ''}
          className="max-w-full max-h-full object-contain"
          onClick={(e) => e.stopPropagation()}
        />

        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrev();
              }}
              className="absolute left-4 text-white text-4xl hover:text-gray-300"
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-4 text-white text-4xl hover:text-gray-300"
              aria-label="Next image"
            >
              ›
            </button>
            <div className="absolute bottom-4 flex gap-2">
              {images.map((_, idx) => (
                <button
                  key={images[idx].src}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(idx);
                  }}
                  className={`w-2 h-2 rounded-full ${
                    idx === currentIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
