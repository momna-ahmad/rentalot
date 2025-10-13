import './styles.css';
import Link from 'next/link';
import UserListings from '../../../../components/user-listings';
import { Suspense } from 'react';
import Loading from './loading';

// Icons
import { FiPlusCircle, FiCalendar, FiBook } from 'react-icons/fi';

export default function Page() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 font-[Quicksand]">

      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-200 p-6">
        <nav className="flex flex-col space-y-2 text-black text-base font-medium">
          <Link
            href="/dashboard/lister/add-listing"
            className="flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-gray-100"
          >
            <FiPlusCircle className="text-xl" />
            Add to your listings
          </Link>

          <Link
            href="/dashboard/lister/customer-bookings"
            className="flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-gray-100"
          >
            <FiCalendar className="text-xl" />
            Customer Bookings
          </Link>

          <Link
            href="/dashboard/lister/my-bookings"
            className="flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-gray-100"
          >
            <FiBook className="text-xl" />
            My Bookings
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