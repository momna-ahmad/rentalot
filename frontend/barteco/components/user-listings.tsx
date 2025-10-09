import Link from 'next/link';
import DisplayImg from './display-images';
import { auth } from '@/auth';

export default async function UserListings() {
  const session = await auth();
  const id = session?.user?.id;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-user-listings/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${(session?.user as any).token}`,
    },
    cache: 'no-store',
  });

  const listings = await res.json();
  console.log('listings', listings);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {listings.length === 0 ? (
        <div className="text-center text-gray-600">You have no listings yet.</div>
      ) : (
        listings.map((listing: any) => (
          <div
            key={listing.id}
            className="group/item flex items-start gap-4 border border-gray-300 rounded-lg shadow-sm p-6 hover:shadow-md transition duration-200 bg-white"
          >
            {/* Left: Image */}
            {listing.img_urls?.length > 0 && (
              <div className="w-32 h-32 flex-shrink-0 rounded-md overflow-hidden border">
                <img
                src={listing.img_urls[0]}
                alt={listing.title}
                className="w-full h-full object-cover"
                />
                </div>
              )}


            {/* Right: Listing Info */}
            <div className="flex-1">
              <Link href={`/dashboard/lister/${listing.id}`} className="block space-y-2">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-800">{listing.title}</h2>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="group/edit invisible group-hover/item:visible size-5 group-hover/edit:translate-x-0.5 group-hover/edit:text-gray-500"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </div>

                <p className="text-gray-600">
                  <span className="font-medium">Price:</span> {listing.price} per {listing.unit}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Category:</span> {listing.category}
                </p>
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
