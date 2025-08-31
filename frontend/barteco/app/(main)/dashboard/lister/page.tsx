import './styles.css';
import Link from 'next/link';
import UserListings from '../../../../components/user-listings';
import { Suspense } from 'react';
import Loading from './loading';

export default function Page() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start gap-6 p-6">
      {/* Left: Listings */}
      <div className="flex-1">
        <Suspense fallback={<Loading />}>
          <UserListings />
        </Suspense>
      </div>

      {/* Right: Add Listing Button */}
      <Link href="/dashboard/lister/add-listing" className="w-full md:w-auto">
        <div
          className="font-sans text-blue-600 border border-blue-500 rounded-lg 
          px-6 py-4 text-center shadow-sm text-xl font-semibold 
          hover:bg-blue-50 transition w-full md:w-64"
        >
          Add to your listings
        </div>
      </Link>
    </div>
  );
}
