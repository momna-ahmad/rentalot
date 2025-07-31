import { cookies } from 'next/headers';
import Link from 'next/link';

export default async function Listings(){
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session');
    console.log(sessionCookie);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-user-listings`, {
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `session=${sessionCookie?.value}`
          },
          
    });
    const listings = await res.json()  ;
    
    return (
      
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {listings.length === 0 ? (
        <div className="text-center text-gray-600">You have no listings yet.</div>
      ) : (
        listings.map((listing: any) => (
          
          <div
            key={listing.id}
            className="border border-gray-300 rounded-lg shadow-sm p-6 hover:shadow-md transition duration-200 bg-white"
          >
            <Link href={`/dashboard/lister/${listing.id}`}>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              <span className="opacity-0 group-hover:opacity-100 transform transition-opacity duration-200 text-gray-500 text-sm">
                →
              </span>
              {listing.title}</h2>
            <p className="text-gray-600 mb-1">
              <span className="font-medium">Price:</span> {listing.price} per {listing.unit}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Category:</span> {listing.category}
            </p>
            </Link>
          </div>
          
        ))
      )}
    </div>
  );
}
