'use client';

import { ReactNode, use } from 'react';
import DisplayImg from "./display-images";
import Link from 'next/link';

interface Listing {
  id : string
  title: string;
  img_urls: string[];
  price: number;
  unit: string;
  owner: string
}

export default function Listings({ listings, children }: { listings: Listing[]; children?: ReactNode }) {
  
  console.log(listings);

  return (
    <div className="px-4 py-6">
      {/* 👇 Children rendered at the top */}
      <div className="mb-6">
        {children}
      </div>

      {/* 👇 Listings in a grid below */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {listings?.map((listing: Listing, index: number) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
          >
            {listing.img_urls?.length > 0 && (
              <DisplayImg imgs={listing.img_urls} />
            )}
            <Link href={`/detail/${listing.id}`}>
            <div className="p-4 flex flex-col flex-grow">
              <h2 className="text-lg font-semibold mb-2">{listing.title}</h2>
              <div className="mt-auto">
                <p className="text-xl font-bold text-gray-900">
                  PKR {listing.price} per {listing.unit}
                </p>
              </div>
            </div>
            </Link>
            <Link href={`/dashboard/chat/${listing.owner}`}>
            Chat with owner
            </Link>
          </div>
          
        ))}
      </div>
    </div>
  );
}
