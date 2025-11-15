import ActionsOnListings from "@/components/actions-on-listings";
import DisplayImg from "@/components/display-images";
import ListingProvider from "@/context/useListingContext";
import ListingBookingsCalendar from "@/components/listing-bookings-calender";
import { FiMapPin } from 'react-icons/fi';


function capitalizeFirstWord(str: string) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default async function Listing(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;

  const [listingRes, bookingRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-listing/${id}`, {
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    }),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings-for-listing/${id}`, {
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    }),
  ]);

  const [listing, bookings] = await Promise.all([
    listingRes.json(),
    bookingRes.json(),
  ]);

  return (
    <main className="min-h-screen bg-white pt-8 pb-20 px-4 sm:px-6 lg:px-10 xl:px-20">
      
      {/* 1. TOP HEADER ROW: TITLE, ACTIONS, AND CALENDAR (Float) */}
      <div className="max-w-6xl mx-auto mb-6 flex justify-between items-start relative">
        
        {/* LEFT GROUP: Title, Location, and Actions (Grouped together) */}
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8 flex-grow"> 
          
          {/* Title and Location Container */}
          <div>
            <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 capitalize inline-block">
              {capitalizeFirstWord(listing.title)}
            </h1>
            <p className="text-gray-600 text-base mt-1 underline">
              {listing.location || "Location Not Provided"}
            </p>
          </div>
          
          {/* Actions (Now positioned immediately next to the title on the baseline) */}
          <div className="mt-2 sm:mt-0 flex-shrink-0">
            <ListingProvider value={listing}>
              <ActionsOnListings />
            </ListingProvider>
          </div>
          
        </div>
        
        {/* RIGHT GROUP: Calendar (Floating to the Top Right) */}
        <div className="absolute top-0 right-0 z-10 hidden lg:block">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <ListingBookingsCalendar bookings={bookings} />
          </div>
        </div>
      </div>
      
      {/* 2. Listing Image Section */}
      <div className="max-w-6xl mx-auto mb-10">
        <div className="rounded-xl overflow-hidden">
          <DisplayImg imgs={listing.img_urls} />
        </div>
      </div>
      
      {/* 3. Main Content Layout: Two-column for details (Left) and calendar (Right - Mobile/Tablet only) */}
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 mt-10">
        
        {/* Left Column: Listing Detail */}
        <div className="relative w-full lg:w-7/12 xl:w-8/12">
            
          {/* Calendar on Mobile/Tablet (Visible until large screens) */}
          <div className="w-full mb-8 block lg:hidden">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <ListingBookingsCalendar bookings={bookings} />
            </div>
          </div>
          
          {/* Description Section */}
          <div className="border-b border-gray-100 pb-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Description</h2>
            <p className="text-gray-800 leading-relaxed whitespace-pre-line">
              {listing.description}
            </p>
          </div>
          
          {/* Category Section */}
          <div className="border-b border-gray-100 pt-6 pb-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Category</h2>
            <p className="text-gray-800 capitalize">{listing.category}</p>
          </div>

          {/* Location Section */}
          <div className="border-b border-gray-100 pt-6 pb-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <FiMapPin className="text-gray-600" /> Location
            </h2>
            <p className="text-gray-800 capitalize">{listing.location || "Not provided"}</p>
          </div>
          
        </div>

        {/* Right Column: Empty Spacer for large screens */}
        <div className="hidden lg:block w-full lg:w-5/12 xl:w-4/12">
          {/* Empty spacer */}
        </div>
      </div>
    </main>
  );
}