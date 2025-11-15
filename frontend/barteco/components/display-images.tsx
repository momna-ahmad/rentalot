'use client'

import { useState } from 'react';

export default function DisplayImg({ imgs, className = "" }: { imgs: string[], className?: string }) {
  const [displayAll, setDisplayAll] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const nextImage = () => {
    setActiveIndex((prev) => (prev + 1) % imgs.length);
  };

  const prevImage = () => {
    setActiveIndex((prev) => (prev - 1 + imgs.length) % imgs.length);
  };

  // If used for single image rendering within the ListingDetail grid
  if (imgs.length === 1 && className) {
    return (
      <button
        onClick={() => {
          setActiveIndex(0);
          setDisplayAll(true);
        }}
        className={`w-full h-full`}
      >
        <img
          src={imgs[0]}
          alt={`Listing Image 1`}
          // Apply the className passed from the parent (which controls the hover effect/sizing)
          className={className} 
        />
      </button>
    );
  }

  // If no images are available
  if (imgs.length === 0) {
    return null;
  }

  return (
    <>
      {/* Fullscreen Image Viewer (Modal) */}
      {displayAll && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          {/* Close button */}
          <button
            onClick={() => setDisplayAll(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 text-3xl font-bold"
          >
            ✕
          </button>

          {/* Left button */}
          <button
            onClick={prevImage}
            className="absolute left-4 text-white hover:text-gray-300 text-5xl"
          >
            ❮
          </button>

          {/* Main Image */}
          <img
            key={activeIndex}
            src={imgs[activeIndex]}
            alt={`Listing Image ${activeIndex + 1}`}
            className="max-h-[80vh] max-w-[80vw] object-contain rounded-lg shadow-lg"
          />

          {/* Right button */}
          <button
            onClick={nextImage}
            className="absolute right-4 text-white hover:text-gray-300 text-5xl"
          >
            ❯
          </button>
        </div>
      )}

      {/* Grid View of All Images (Fallback/Mobile display) */}
      <div className="grid grid-cols-3 gap-2 mt-4">
        {imgs.map((img, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveIndex(index);
              setDisplayAll(true);
            }}
          >
            <img
              src={img}
              alt={`Listing Image ${index + 1}`}
              // MODIFICATION: Increased height from h-32 to h-48 for medium size
              className="w-full h-48 object-cover rounded-md border border-gray-200 hover:opacity-80 transition"
            />
          </button>
        ))}
      </div>
    </>
  );
}