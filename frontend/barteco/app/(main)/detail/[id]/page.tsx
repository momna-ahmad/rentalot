import DisplayImg from "@/components/display-images";
import api from "@/hooks/axiosInstance";
import Link from "next/link";
import BookListing from "@/components/book-listing";

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
    <div className="min-h-screen bg-gray-50 flex justify-center items-start py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 max-w-3xl w-full">
        {/* Image */}
        <div className="flex justify-center mb-6">
          <div className="w-full rounded-xl overflow-hidden">
            <DisplayImg imgs={listing.img_urls} />
          </div>
        </div>

        {/* Title + Price */}
        <div className="border-b pb-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            {listing.title}
          </h1>
          <p className="text-xl font-semibold text-green-600">
            PKR {listing.price}{" "}
            <span className="text-gray-600 text-base">per {listing.unit}</span>
          </p>
        </div>

        {/* Details */}
        <div className="space-y-4 text-gray-700">
          <p>
            <span className="font-medium text-gray-900">Description:</span>{" "}
            {listing.description}
          </p>

          <p>
            <span className="font-medium text-gray-900">Location:</span>{" "}
            {listing.location || "Not Provided"}
          </p>

          <p>
            <span className="font-medium text-gray-900">Category:</span>{" "}
            {listing.category}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link
            href={`/dashboard/inbox/${listing.owner}`}
            className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Contact Owner
          </Link>

          <Link href={`/profile/${listing.owner}`} className="flex-1">
            <button className="w-full border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-100 transition">
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
