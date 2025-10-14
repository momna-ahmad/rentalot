import ActionsOnListings from "@/components/actions-on-listings";
import DisplayImg from "@/components/display-images";
import ListingProvider from "@/context/useListingContext";
import ListingBookingsCalendar from "@/components/listing-bookings-calender";

interface PageProps {
  params: { id: string };
}

function capitalizeFirstWord(str: string) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default async function Listing({ params }: PageProps) {
  const { id } = await params;

  const [listingRes, bookingRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-listing/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings-for-listing/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }),
  ]);

  const [listing, bookings] = await Promise.all([
    listingRes.json(),
    bookingRes.json(),
  ]);

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6 sm:px-10 md:px-20">
      <div className="flex flex-col md:flex-row gap-10 items-start">

        {/* Left Column: Listing Detail (3/5) */}
        <div className="w-full md:w-3/5 bg-white rounded-xl shadow-md p-6 space-y-8">

          {/* Image Preview */}
          {listing.img_urls?.length > 0 && (
            <div className="rounded-lg overflow-hidden shadow-sm">
              <DisplayImg imgs={listing.img_urls} />
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight leading-snug">
            {capitalizeFirstWord(listing.title)}
          </h1>

          {/* Description */}
          <p className="text-gray-600 text-lg leading-relaxed">
            {listing.description}
          </p>

          {/* Key Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <span className="block text-sm font-medium text-gray-500 mb-1">Price</span>
              <span className="text-xl font-semibold text-gray-800">PKR {listing.price}</span>
            </div>

            <div>
              <span className="block text-sm font-medium text-gray-500 mb-1">Unit</span>
              <span className="text-xl font-semibold text-gray-800 capitalize">{listing.unit}</span>
            </div>

            <div>
              <span className="block text-sm font-medium text-gray-500 mb-1">Category</span>
              <span className="text-xl font-semibold text-gray-800 capitalize">{listing.category}</span>
            </div>

            <div>
              <span className="block text-sm font-medium text-gray-500 mb-1">Location</span>
              <span className="text-xl font-semibold text-gray-800 capitalize">
                {listing.location || "Not provided"}
              </span>
            </div>
          </div>

          {/* Actions */}
          <ListingProvider value={listing}>
            <ActionsOnListings />
          </ListingProvider>
        </div>

        {/* Right Column: Booking Calendar (2/5) */}
        <div className="w-full md:w-2/5 bg-white rounded-xl shadow-md p-6">
          <ListingBookingsCalendar bookings={bookings} />
        </div>
      </div>
    </main>
  );
}
