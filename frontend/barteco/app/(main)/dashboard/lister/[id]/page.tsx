import ActionsOnListings from "@/components/actions-on-listings";
import DisplayImg from "@/components/display-images";
import ListingProvider from "@/context/useListingContext";

interface PageProps {
  params: { id: string };
}

export default async function Listing({ params }: PageProps) {
  const { id } = params;
  console.log(id);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-listing/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    // Optional: add cache policy
    cache: 'no-store',
  });

  const listing = await res.json();
  console.log('listing ', listing);

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4 md:px-10">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{listing.title}</h1>
        
        <p className="text-gray-600 text-lg mb-6">{listing.description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <span className="block text-sm text-gray-500">Price</span>
            <span className="text-xl font-semibold text-gray-700">${listing.price}</span>
          </div>

          <div>
            <span className="block text-sm text-gray-500">Unit</span>
            <span className="text-xl font-semibold text-gray-700">{listing.unit}</span>
          </div>

          <div>
            <span className="block text-sm text-gray-500">Category</span>
            <span className="text-xl font-semibold text-gray-700 capitalize">{listing.category}</span>
          </div>

        </div>

        {/* Image Preview */}
        {listing.img_urls?.length > 0 && (
          <DisplayImg imgs={listing.img_urls} />
        )}

        <ListingProvider value={listing}>
          <ActionsOnListings />
        </ListingProvider>
      </div>
    </main>
  );
}
