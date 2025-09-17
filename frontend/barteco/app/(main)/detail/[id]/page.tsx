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
  const res = await api.get(
    `${process.env.NEXT_PUBLIC_API_URL}/listing-detail/${params.id}`
  );
  const { listing } = res.data;

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start py-10 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-3xl w-full">
        {/* Image */}
        <div className="flex justify-center mb-6">
          <DisplayImg imgs={listing.img_urls} />
        </div>

        {/* Title + Price */}
        <div className="border-b pb-4 mb-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {listing.title}
          </h1>
          <p className="text-xl font-semibold text-green-600">
            PKR {listing.price}{" "}
            <span className="text-gray-600 text-base">per {listing.unit}</span>
          </p>
        </div>

        {/* Details */}
        <div className="space-y-3 text-gray-700">
          <p>
            <span className="font-medium text-gray-900">Description:</span>{" "}
            {listing.description}
          </p>
      
          <div>
            {
              listing.location? (
                <p>
            <span className="font-medium text-gray-900">Location:</span>{" "}
            {listing.location}
          </p>
              ):
              <p>
            <span className="font-medium text-gray-900">Location:</span>{" "}
            Not Provided
          </p>
              
            }
            
          </div>
        
          <p>
            <span className="font-medium text-gray-900">Category:</span>{" "}
            {listing.category}
          </p>
        </div>

        {/* Call-to-Action */}
        <div className="mt-6 flex gap-4">
          <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition">
            Contact Owner
          </button>
          <Link href={`/profile/${listing.owner}`} >
          <button className="flex-1 border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-100 transition">
            View Profile
          </button>
          </Link>
          <BookListing id={params.id} unit={listing.unit} cost={listing.price} />
        </div>
      </div>
    </div>
  );
}
