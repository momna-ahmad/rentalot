'use client';

import { useActionState, useState } from 'react';
import { handleSubmit } from '@/lib/action';
import SearchLocation from '@/components/search-location';

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
    return;
  }

  setSelectedImages(totalFiles);

  // Combine existing and new previews
  const newPreviews = newFiles.map(file => URL.createObjectURL(file));
  setPreviews(prev => [...prev, ...newPreviews]);
};


  return (
    <form
      action={formAction}
      key={JSON.stringify(state)}
      className="space-y-6 p-6 border border-gray-300 rounded-lg shadow-md max-w-md mx-auto bg-white"
    >
      {state.error && (
        <p className="text-red-500 text-sm mt-2 text-center">{state.error}</p>
      )}

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          name="title"
          type="text"
          placeholder="Enter descriptive title"
          defaultValue={state.title}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
        name="description"
        defaultValue={state.description}
        placeholder="Add detailed description"
        rows={5} // you can increase or decrease based on your UI
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
        />

      </div>

      {/* Price */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
        <input
          name="price"
          type="text"
          defaultValue={state.price}
          placeholder="Add price"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Unit */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
        <select
          name="unit"
          defaultValue={state.unit}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>Select unit</option>
          <option value="day">Day</option>
          <option value="hour">Hour</option>
        </select>
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
        <select
          name="category"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          defaultValue={state.category}
        >
          <option value="" disabled>Select a category</option>
          <option value="homes">Homes</option>
          <option value="vehicles">Vehicles</option>
          <option value="halls">Halls</option>
          <option value="others">Others</option>
        </select>
      </div>

      {/* Images Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Images (max 5)
        </label>
        <input
          name="images"
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="w-full"
        />

        {/* Image Previews */}
        {previews.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-2">
            {previews.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Preview ${index + 1}`}
                className="w-full h-24 object-cover rounded border"
              />
            ))}
          </div>
        )}
      </div>

      {/* Location */}
      <SearchLocation location={state.location} />

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        Submit
      </button>
    </form>
  );
}
