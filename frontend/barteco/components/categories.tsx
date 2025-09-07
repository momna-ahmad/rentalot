'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Listings from './listings';
import { list } from 'postcss';

interface Listing {
  id : string,
  title: string;
  img_urls: string[];
  price: number;
  unit: string;
  owner: string
}

export default function Categories() {
  const [listings, setListings] = useState<Listing[]>([]);
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

  useEffect(() => {
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
  }, [selectedCategory]);

  return (
    <>
      <div className="flex justify-center gap-4 py-6">
        {['homes', 'vehicles', 'halls', 'others'].map((category) => (
          <div
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 py-2 rounded-md capitalize cursor-pointer transition-colors ${
              selectedCategory === category
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            {category}
          </div>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading listings...</div>
      ) : (
        <Listings listings={listings} />
      )}
    </>
  );
}
