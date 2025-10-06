import './styles.css';
import Link from 'next/link';
import UserListings from '../../../../components/user-listings';
import { Suspense } from 'react';
import Loading from './loading';

export default function Page() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 font-sans">

      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-200 p-6">
        <h2 className="text-2xl font-semibold text-blue-700 mb-8">Dashboard</h2>

        <nav className="flex flex-col space-y-4 text-gray-700">
          <Link
            href="/dashboard/lister/add-listing"
            className="hover:text-blue-600 transition-colors"
          >
            Add to your listings
          </Link>

          <Link
            href="/dashboard/lister/customer-bookings"
            className="hover:text-blue-600 transition-colors"
          >
            Customer Bookings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Suspense fallback={<Loading />}>
          <UserListings />
        </Suspense>
      </main>

    </div>
  );
}
