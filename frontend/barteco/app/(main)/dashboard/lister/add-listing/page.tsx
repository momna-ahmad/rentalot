'use client';

import { useActionState, useState } from 'react';
import { handleSubmit } from '@/lib/action';
import SearchLocation from '@/components/search-location';
import { FiImage, FiMapPin, FiCheckCircle, FiAlertTriangle } from 'react-icons/fi'; // Icons for better style

const initialState = {
  title: '',
  description: '',
  price: '',
  unit: '',
  category: '',
  location: '',
  error: null,
};

export default function Page() {
  const [state, formAction, isPending] = useActionState(handleSubmit, initialState);

  // 👇 State to hold selected image files and preview URLs
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    const totalFiles = [...selectedImages, ...newFiles];

    if (totalFiles.length > 5) {
      alert("You can upload up to 5 images only.");
      // Clear the value so the user can try again
      e.target.value = ''; 
      return;
    }

    setSelectedImages(totalFiles);

    // Combine existing and new previews
    const newPreviews = newFiles.map(file => URL.createObjectURL(file));
    setPreviews(prev => [...prev, ...newPreviews]);
  };


  return (
    // ENHANCEMENT: Increased max-width for better visual space (max-w-xl) and added large padding/shadow
    <form
      action={formAction}
      key={JSON.stringify(state)}
      className="space-y-8 p-8 border border-gray-200 rounded-2xl shadow-xl max-w-xl mx-auto bg-white"
    >
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Create New Listing</h2>

      {state.error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 p-3 rounded-lg text-red-600">
            <FiAlertTriangle className="size-5" />
            <p className="text-sm">{state.error}</p>
        </div>
      )}

      {/* --- FORM FIELDS --- */}

      {/* Title (REQUIRED) */}
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">Title <span className="text-red-500">*</span></label>
        <input
          name="title"
          type="text"
          placeholder="Enter descriptive title"
          defaultValue={state.title}
          required // ADDED REQUIRED
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
        />
      </div>

      {/* Description (REQUIRED) */}
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">Description <span className="text-red-500">*</span></label>
        <textarea
        name="description"
        defaultValue={state.description}
        placeholder="Add detailed description"
        rows={5}
        required // ADDED REQUIRED
        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y transition duration-150"
        />
      </div>

      {/* Price (REQUIRED) */}
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">Price <span className="text-red-500">*</span></label>
        <input
          name="price"
          type="number" // Changed to number for price input
          placeholder="Add price"
          defaultValue={state.price}
          required // ADDED REQUIRED
          min="0"
          step="0.01"
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
        />
      </div>

      {/* Unit (REQUIRED) */}
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">Unit <span className="text-red-500">*</span></label>
        <select
          name="unit"
          defaultValue={state.unit}
          required // ADDED REQUIRED
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none transition duration-150"
        >
          <option value="" disabled>Select unit</option>
          <option value="day">Day</option>
          <option value="hour">Hour</option>
        </select>
      </div>

      {/* Category (REQUIRED) */}
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">Category <span className="text-red-500">*</span></label>
        <select
          name="category"
          required // ADDED REQUIRED
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none transition duration-150"
          defaultValue={state.category}
        >
          <option value="" disabled>Select a category</option>
          <option value="homes">Homes</option>
          <option value="vehicles">Vehicles</option>
          <option value="halls">Halls</option>
          <option value="others">Others</option>
        </select>
      </div>

      {/* Location (REQUIRED) */}
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <FiMapPin className="size-4 text-blue-500"/> Location <span className="text-red-500">*</span>
        </label>
        {/* We assume SearchLocation handles its own styling and includes a hidden input named 'location' */}
        <SearchLocation location={state.location} />
        {/* Add a client-side hidden input fallback to capture the required state, 
            assuming SearchLocation sets its value via state/JS */}
        <input type="hidden" name="location" defaultValue={state.location} required />
      </div>


      {/* Images Upload (Min 1 required - though HTML required attribute only works on file selection, not array length) */}
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <FiImage className="size-4 text-blue-500"/> Images (max 5)
        </label>
        <input
          name="images"
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          // ADDED required for at least one image file selected
          required={selectedImages.length === 0}
          className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition duration-150"
        />

        {/* Image Previews */}
        {previews.length > 0 && (
          <div className="mt-4 grid grid-cols-5 gap-3">
            {previews.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Preview ${index + 1}`}
                className="w-full aspect-square object-cover rounded-lg shadow-md border border-gray-200"
              />
            ))}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-150 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isPending ? (
            <>
                {/*  */}
                Submitting...
            </>
        ) : (
            <>
                Create Listing
            </>
        )}
      </button>
    </form>
  );
}