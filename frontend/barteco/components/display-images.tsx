'use client'

import { useState } from 'react';

export default function DisplayImg({ imgs }: { imgs: string[] }) {
  const [displayAll, setDisplayAll] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const nextImage = () => {
    setActiveIndex((prev) => (prev + 1) % imgs.length);
  };

  const prevImage = () => {
    setActiveIndex((prev) => (prev - 1 + imgs.length) % imgs.length);
  };

  return (
    <>
      {/* Fullscreen Image Viewer */}
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

      {/* Grid View of All Images */}
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
              className="w-full h-32 object-cover rounded-md border hover:opacity-80 transition"
            />
          </button>
        ))}
      </div>
    </>
  );
}
