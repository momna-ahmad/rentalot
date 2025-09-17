'use client';

import { Timestamp } from "next/dist/server/lib/cache-handlers/types"; 
import { Listing } from "@/context/useListingContext";
import { use } from "react";

import { format } from "date-fns";

interface Booking {
  start_date_time: Timestamp;
  end_date_time: Timestamp;
  cost: number;
  duration: number;
  listing: Listing;
}

export default function MyBookings({ bookingsPromise }: { bookingsPromise: Promise<Booking[]> }) {
  const bookings = use(bookingsPromise);

  if (!bookings || bookings.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        <p className="text-lg">No upcoming bookings.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Bookings</h2>
      <div className="flex flex-col space-y-6">
        {bookings.map((booking, index) => (
          <article
            key={index}
            className="w-full bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-3 truncate">
              {booking.listing.title}
            </h3>

            <div className="text-sm text-gray-600 mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M8 7V3M16 7V3M3 11h18M5 21h14a2 2 0 0 0 2-2v-7H3v7a2 2 0 0 0 2 2z"/></svg>
              <time dateTime={booking.start_date_time as any}>
                {format(new Date(booking.start_date_time as any), 'PPP p')}
              </time>
              <span className="text-gray-400">→</span>
              <time dateTime={booking.end_date_time as any}>
                {format(new Date(booking.end_date_time as any), 'PPP p')}
              </time>
            </div>

            <div className="flex items-center gap-2 text-sm text-purple-600 mb-3">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span>Duration: {booking.duration} {booking.listing.unit}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-green-600 font-semibold">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M12 1v22M17 5H9a4 4 0 0 0 0 8h6a4 4 0 0 1 0 8H7"/></svg>
              <span>Total Cost: ${booking.cost.toFixed(2)}</span>
            </div>

            <div className="mt-4">
              <span className="inline-block bg-gray-200 text-gray-700 text-xs font-medium px-3 py-1 rounded-full select-none">
                {booking.listing.category}
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
