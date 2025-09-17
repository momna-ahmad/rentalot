import ActionsOnListings from "@/components/actions-on-listings";
import DisplayImg from "@/components/display-images";
import ListingProvider from "@/context/useListingContext";
import BookingCalendar from "@/components/booking-calender";

interface PageProps {
  params: { id: string };
}

export default async function Listing({ params }: PageProps) {
  const { id } = params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-listing/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const listing = await res.json();
  console.log('listing' ,listing);

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6 sm:px-10 md:px-20">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 md:p-12">
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
          {listing.title}
        </h1>

        {/* Description */}
        <p className="text-gray-700 text-lg mb-8 leading-relaxed">
          {listing.description}
        </p>

        {/* Key Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div>
            <span className="block text-sm font-medium text-gray-500 mb-1">
              Price
            </span>
            <span className="text-2xl font-semibold text-gray-800">
              PKR {listing.price}
            </span>
          </div>

          <div>
            <span className="block text-sm font-medium text-gray-500 mb-1">
              Unit
            </span>
            <span className="text-2xl font-semibold text-gray-800">
              {listing.unit}
            </span>
          </div>

          <div>
            <span className="block text-sm font-medium text-gray-500 mb-1">
              Category
            </span>
            <span className="text-2xl font-semibold text-gray-800 capitalize">
              {listing.category}
            </span>
          </div>

          <div>
            <span className="block text-sm font-medium text-gray-500 mb-1">
              Location
            </span>
            {
              listing.location? (
                <span className="text-2xl font-semibold text-gray-800 capitalize">
              {listing.location}
            </span>
              ):
              <span className="text-2xl font-semibold text-gray-800 capitalize">
              Not provided
            </span>
              
            }
            
          </div>
        </div>

        {/* Image Preview */}
        {listing.img_urls?.length > 0 && (
          <div className="mb-10 rounded-lg overflow-hidden shadow-md">
            <DisplayImg imgs={listing.img_urls} />
          </div>
        )}

        {/* Actions */}
        <ListingProvider value={listing}>
          <ActionsOnListings />
        </ListingProvider>
      </div>
    </main>
  );
}
