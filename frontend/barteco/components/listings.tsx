'use client';

import { ReactNode } from 'react';
import DisplayImg from './display-images';
import Link from 'next/link';

interface Listing {
  id: string;
  title: string;
  img_urls: string[];
  price: number;
  unit: string;
  owner: string;
  location?: string;
}

export default function Listings({
  listings,
  children,
}: {
  listings: Listing[];
  children?: ReactNode;
}) {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-10">
      {children && <div className="mb-8">{children}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {listings.map((listing) => (
          <div
            key={listing.id}
            className="bg-white rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col cursor-pointer"
          >
            {/* Image wrapper */}
            <Link href={`/detail/${listing.id}`}>
              <div className="overflow-hidden rounded-t-3xl h-52 relative">
                {listing.img_urls?.length > 0 && (
                  <img
                    src={listing.img_urls[0]}
                    alt={listing.title}
                    className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                )}
              </div>
            </Link>

            {/* Content */}
            <div className="p-4 flex flex-col flex-grow">
              <Link href={`/detail/${listing.id}`}>
                <h3 className="text-sm font-semibold text-gray-900 truncate capitalize">
                  {listing.title}
                </h3>
                {listing.location && (
                  <p className="text-xs text-gray-500 truncate">{listing.location}</p>
                )}
                <p className="mt-1 text-sm font-bold text-gray-900">
                  PKR {listing.price}{' '}
                  <span className="font-normal text-gray-500">/ {listing.unit}</span>
                </p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
