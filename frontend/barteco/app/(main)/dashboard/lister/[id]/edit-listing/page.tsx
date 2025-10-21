'use client';

import { useContext, useState } from 'react';
import { ListingContext } from '@/context/useListingContext';
import { useRouter } from 'next/navigation';
import { FiEdit } from 'react-icons/fi';
import SearchLocation from '@/components/search-location';

export default function EditListing() {
  const listing = useContext(ListingContext);
  const [open, setOpen] = useState(false);
  const categories = ['homes', 'vehicles', 'halls', 'Others'];
  const router = useRouter();

  async function handleEdit(formData: FormData) {
    const title = formData.get('title');
    const description = formData.get('description');
    const price = formData.get('price');
    const unit = formData.get('unit');
    const category = formData.get('category');
    const location = formData.get('location');

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/edit-listing/${listing?.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description, price, unit, category, location }),
    });

    router.refresh();
    setOpen(false);
  }

  return (
    <>
      {/* Edit icon button */}
      <button
        onClick={() => setOpen(true)}
        className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-150 ease-in-out shadow-sm flex items-center justify-center"
        title="Edit Listing"
      >
        <FiEdit size={18} />
      </button>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="relative bg-white rounded-lg shadow-lg p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Edit Listing</h2>

            <form action={handleEdit} className="space-y-5">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  defaultValue={listing?.title}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  defaultValue={listing?.description}
                  rows={3}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Price */}
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  defaultValue={listing?.price}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Unit */}
              <div>
                <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-1">
                  Unit
                </label>
                <select
                  id="unit"
                  name="unit"
                  defaultValue={listing?.unit || ''}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
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
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  defaultValue={listing?.category}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <SearchLocation
                  location={listing?.location || ''}
                />
              </div>

              {/* Save Button */}
              <div className="flex justify-between items-center mt-6">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                >
                  Save Changes
                </button>
              </div>
            </form>

            {/* Cancel & Close */}
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setOpen(false)}
                className="text-sm text-gray-500 hover:text-gray-700 underline"
              >
                Cancel
              </button>
            </div>

            {/* X icon in top-right */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
}
