'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Listings from './listings';

interface Listing {
  id : string,
  title: string;
  img_urls: string[];
  price: number;
  unit: string;
  owner: string
}

export default function Categories({listings} : {listings : Listing[]}) {
  //const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  let selectedCategory = searchParams.get('category') || '';

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category) {
      params.set('category', category);
    } else {
      params.delete('category');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  /*useEffect(() => {
    if (!selectedCategory) 
      selectedCategory = 'homes';

    const fetchListings = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-listings/${selectedCategory}`)
        const json = await res.json();
        setListings(json.data || []);
        console.log(json.data) ;
      } catch (error) {
        console.error('Error fetching listings:', error);
        setListings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [selectedCategory]);*/

  return (
    <>
      <div className="flex gap-4 mt-6 justify-center">
        {['homes', 'vehicles', 'halls', 'others'].map((category) => (
          <div
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-6 py-2 rounded-md font-medium shadow text-sm sm:text-base transition-colors duration-200 ease-in-out cursor-pointer ${
              selectedCategory === category
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
            }`}
          >
            {category}
          </div>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading listings...</div>
      ) : listings.length === 0 ? (
      <div className="text-center py-10 text-gray-500">No listings found.</div>
    ) : (
    <Listings listings={listings} />
    )}

    </>
  );
}
