'use client' 

import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi'; 

// Define the expected Review type
interface Review {
  id: number;
  created_at: string;
  review: string; // The text content
  rating: number; // The star rating (1-5)
  listing: number | null;
  owner: number;
  reviewer: number | null;
}

const ReviewsSlider = ({ reviews }: { reviews: Review[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const arrowSize = 36;

  if (!reviews || reviews.length === 0) {
    return (
      // MODIFICATION: Reduced top margin for better alignment with content above
      <p className="text-center text-gray-500 mt-5">No reviews available.</p>
    );
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const currentReview = reviews[currentIndex];
  const rating = currentReview.rating || 0;

  // Helper to render stars
  const renderStars = (count: number) => {
    const totalStars = 5;
    return (
      <div className="flex justify-center text-yellow-500 mb-2"> {/* Reduced bottom margin mb-2 */}
        {[...Array(totalStars)].map((_, i) => (
          <FiStar
            key={i}
            className={`w-5 h-5 ${i < count ? 'fill-current' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div 
      // MODIFICATION: Reduced top/bottom margin mt-0 mb-5 for better vertical placement
      className="w-full mx-auto mt-0 mb-5 text-center font-sans p-0 shadow-none"
    >
      <div 
        // reviewWrapper styles converted
        className="flex items-center justify-between"
      >
        
        {/* Previous Arrow */}
        <span 
          onClick={handlePrev}
          className="cursor-pointer p-2 select-none text-gray-700 transition duration-200 hover:text-gray-900"
        >
          <FiChevronLeft size={arrowSize} />
        </span>
        
        {/* Review Card */}
        <div 
          // MODIFICATION: Increased horizontal padding px-10 to expand the card text area
          className="flex-grow mx-4 px-10 py-6 rounded-xl min-h-[150px] shadow-lg flex flex-col items-center justify-center bg-white border border-gray-100"
        >
          {/* Display Rating */}
          {renderStars(rating)}

          <p 
            // MODIFICATION: Added max-w-xl to constrain text width slightly for readability
            className="italic text-lg text-gray-700 leading-relaxed max-w-xl"
          >
            **&quot;**{currentReview.review}**&quot;**
          </p>
          
          {/* Optional: Display creation date */}
          <p className="text-xs text-gray-400 mt-3">
            — {new Date(currentReview.created_at).toLocaleDateString()}
          </p>
        </div>
        
        {/* Next Arrow */}
        <span 
          onClick={handleNext} 
          className="cursor-pointer p-2 select-none text-gray-700 transition duration-200 hover:text-gray-900"
        >
          <FiChevronRight size={arrowSize} />
        </span>
      </div>
      
      {/* Dot Indicators */}
      <div className="mt-5 flex justify-center gap-2">
        {reviews.map((_, index) => (
          <span 
            key={index}
            className={`w-2.5 h-2.5 rounded-full transition duration-300 ${
              index === currentIndex 
                ? 'bg-gray-800'
                : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ReviewsSlider;