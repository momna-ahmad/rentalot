'use client';

import { useContext } from 'react';
import { ListingContext } from '@/context/useListingContext';
import { useRouter } from 'next/navigation';

export default function Delete() {
  const listing = useContext(ListingContext);
  const router = useRouter();

  async function handleDelete() {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/delete-listing/${listing?.id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    router.push('/dashboard/lister');
  }

  return (
    <button
      onClick={handleDelete}
      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-150 ease-in-out shadow-sm"
    >
      Delete Listing
    </button>
  );
}
