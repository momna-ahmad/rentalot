import DisplayImg from "@/components/display-images";
import api from "@/hooks/axiosInstance";
import Link from "next/link";
import BookListing from "@/components/book-listing";
import ContactOwner from "@/components/contact-owner";

type Params = {
  params: {
    id: string;
  };
};

export default async function ListingDetail({ params }: Params) {
  const [listingRes, bookingsRes] = await Promise.all([
    api.get(`${process.env.NEXT_PUBLIC_API_URL}/listing-detail/${params.id}`),
    api.get(`${process.env.NEXT_PUBLIC_API_URL}/bookings-for-listing/${params.id}`)
  ]);

  const { listing } = listingRes.data;
  const bookings = bookingsRes.data;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-3xl p-8 sm:p-10 max-w-3xl w-full">
        
        {/* Listing Image */}
        <div className="w-full rounded-2xl overflow-hidden mb-8">
          <DisplayImg imgs={listing.img_urls} />
        </div>

        {/* Title + Price */}
        <div className="border-b border-gray-100 pb-5 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {listing.title}
          </h1>
          <p className="text-2xl font-semibold text-green-600">
            PKR {listing.price}{" "}
            <span className="text-gray-600 text-base font-medium">per {listing.unit}</span>
          </p>
        </div>

        {/* Details Section */}
        <div className="space-y-5 text-gray-700 leading-relaxed">
          <div>
            <span className="block font-medium text-gray-900 mb-1">Description</span>
            <p>{listing.description}</p>
          </div>

          <div>
            <span className="block font-medium text-gray-900 mb-1">Location</span>
            <p>{listing.location || "Not Provided"}</p>
          </div>

          <div>
            <span className="block font-medium text-gray-900 mb-1">Category</span>
            <p>{listing.category}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <ContactOwner ownerId={listing.owner} />

          <Link href={`/profile/${listing.owner}`} className="flex-1">
            <button className="w-full border border-gray-300 py-2.5 px-4 rounded-lg hover:bg-gray-100 font-medium transition">
              View Profile
            </button>
          </Link>

          <div className="flex-1">
            <BookListing
              id={params.id}
              unit={listing.unit}
              cost={listing.price}
              bookings={bookings}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
