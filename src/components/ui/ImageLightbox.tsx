import { useState } from 'react';

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

  if (!isOpen) return null;

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const goToPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
      onClick={onClose}
    >
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 z-10"
        aria-label="Close"
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
              onClick={goToPrev}
              className="absolute left-4 text-white text-4xl hover:text-gray-300"
              aria-label="Previous"
            >
              ‹
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 text-white text-4xl hover:text-gray-300"
              aria-label="Next"
            >
              ›
            </button>
            <div className="absolute bottom-4 flex gap-2">
              {images.map((_, idx) => (
                <button
                  key={idx}
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
