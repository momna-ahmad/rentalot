'use client';

import { useContext, useState } from 'react';
import { ListingContext } from '@/context/useListingContext';
import { useRouter } from 'next/navigation';
import { FiEdit, FiMapPin } from 'react-icons/fi';
import SearchLocation from '@/components/search-location';

export default function EditListing() {
  const listing = useContext(ListingContext);
  const [open, setOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const categories = ['homes', 'vehicles', 'halls', 'Others'];
  const router = useRouter();

  async function handleEdit(formData: FormData) {
    setIsSaving(true);
    
    // Extract data
    const title = formData.get('title');
    const description = formData.get('description');
    const price = formData.get('price');
    const unit = formData.get('unit');
    const category = formData.get('category');
    const location = formData.get('location'); 

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/edit-listing/${listing?.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, price, unit, category, location }),
      });

      router.refresh();
      setOpen(false);
    } catch (error) {
        console.error("Failed to save listing:", error);
    } finally {
        setIsSaving(false);
    }
  }

  return (
    <>
      {/* Edit icon button - Compact and styled */}
      <button
        onClick={() => setOpen(true)}
        className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-150 ease-in-out shadow-md flex items-center justify-center"
        title="Edit Listing"
      >
        <FiEdit size={18} />
      </button>

      {open && (
        // 🛠️ FIX APPLIED HERE:
        // Changed bg-black bg-opacity-20 to bg-black/40 for better compatibility and contrast
        // Added backdrop-blur-md for a noticeable blur effect
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 backdrop-blur-md">
          {/* MODAL: Enhanced Styling */}
          <div className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg max-h-[95vh] overflow-y-auto border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Edit Listing Details</h2>

            <form action={handleEdit} className="space-y-6">
              
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-semibold text-gray-800 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  defaultValue={listing?.title}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                />
              </div>

              {/* Description (EXPANDED) */}
              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-gray-800 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  defaultValue={listing?.description}
                  rows={8}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y transition duration-150"
                />
              </div>

              {/* Price */}
              <div>
                <label htmlFor="price" className="block text-sm font-semibold text-gray-800 mb-2">
                  Price <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  defaultValue={listing?.price}
                  required
                  min="0"
                  step="0.01"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                />
              </div>

              {/* Unit */}
              <div>
                <label htmlFor="unit" className="block text-sm font-semibold text-gray-800 mb-2">
                  Unit <span className="text-red-500">*</span>
                </label>
                <select
                  id="unit"
                  name="unit"
                  defaultValue={listing?.unit || ''}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none transition duration-150"
                >
                  <option value="" disabled>
                    Select a unit
                  </option>
                  <option value="day">Day</option>
                  <option value="hour">Hour</option>
                </select>
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-semibold text-gray-800 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  defaultValue={listing?.category}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none transition duration-150"
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <FiMapPin className="size-4 text-blue-500"/> Location <span className="text-red-500">*</span>
                </label>
                <SearchLocation
                  location={listing?.location || ''}
                />
                {/* Hidden input to ensure 'location' field is included in FormData and required */}
                <input type="hidden" name="location" defaultValue={listing?.location} required />
              </div>

              {/* Save Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-150 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSaving ? (
                    <>
                      {/* Using a spinner is recommended here */}
                      Saving...
                    </>
                  ) : (
                    <>
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Cancel & Close */}
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setOpen(false)}
                className="text-sm text-gray-600 hover:text-red-600 font-medium transition"
              >
                Cancel
              </button>
            </div>

            {/* X icon in top-right for quick close */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-3xl transition"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
}