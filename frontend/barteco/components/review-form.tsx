'use client';

interface ReviewFormProps {
  rating: number;
  setRating: (rating: number) => void;
  reviewText: string;
  setReviewText: (text: string) => void;
  onClose: () => void;
  onSubmit: () => void; // parent will call form submit
}

const ReviewForm = ({
  rating,
  setRating,
  reviewText,
  setReviewText,
  onClose,
  onSubmit,
}: ReviewFormProps) => {

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50"> 
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-3">Submit a Review</h2>

        {/* Rating (hidden input for FormData) */}
        <input type="hidden" name="rating" value={rating} />

        {/* Rating Stars */}
        <div className="flex items-center mb-3">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={`cursor-pointer text-2xl ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
              onClick={() => setRating(i + 1)}
            >
              ★
            </span>
          ))}
        </div>

        {/* Review Text Area */}
        <textarea
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Write your review..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          name="reviewText" // ✅ add name here
        />

        <div className="mt-4 flex justify-end gap-2">
          <button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={onSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
