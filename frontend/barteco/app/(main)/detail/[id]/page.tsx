import DisplayImg from "@/components/display-images";
import api from "@/hooks/axiosInstance";
import Link from "next/link";
import BookListing from "@/components/book-listing";
import ContactOwner from "@/components/contact-owner";
import { FiMapPin } from 'react-icons/fi'; // Only need FiMapPin for location


export default async function ListingDetail(props: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await props.params;
  const [listingRes, bookingsRes] = await Promise.all([
    api.get(`${process.env.NEXT_PUBLIC_API_URL}/listing-detail/${id}`),
    api.get(`${process.env.NEXT_PUBLIC_API_URL}/bookings-for-listing/${id}`)
  ]);

  const { listing } = listingRes.data;
  const bookings = bookingsRes.data;

  return (
    // Reduced overall horizontal padding (px-4 to px-10)
    <div className="min-h-screen bg-white pt-8 pb-20 px-4 sm:px-6 lg:px-10 xl:px-10"> 
      
      {/* Title Section - Reduced width from max-w-7xl to max-w-6xl */}
      <div className="max-w-6xl mx-auto mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 capitalize">
            {listing.title}
          </h1>
          <p className="text-gray-600 text-base mt-1">
            <span className="underline">{listing.location || "Location Not Provided"}</span>
          </p>
        </div>
      </div>

      {/* Listing Image Section - Reduced width from max-w-7xl to max-w-6xl */}
      <div className="max-w-6xl mx-auto mb-10">
        <div className="rounded-xl overflow-hidden">
          {/* DisplayImg is used here and will now render the medium-sized layout */}
          <DisplayImg imgs={listing.img_urls} />
        </div>
      </div>


      {/* Main Content Layout: Two-column layout for details and booking/pricing. Reduced width to max-w-6xl */}
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 mt-10">
        
        {/* Left Column: Details */}
        <div className="lg:w-7/12 xl:w-8/12">
      
          
          {/* Section Separators are soft: border-t border-gray-100 */}
          <div className="border-t border-gray-100 pt-6 mt-6"> 
            <h3 className="font-semibold text-xl text-gray-900 mb-2">Description</h3>
            <p className="whitespace-pre-line text-gray-800 leading-relaxed">{listing.description}</p>
          </div>

          <div className="border-t border-gray-100 pt-6 mt-6">
            <h3 className="font-semibold text-xl text-gray-900 mb-2">Category</h3>
            <p className="text-gray-800">{listing.category}</p>
          </div>
          
          <div className="border-t border-gray-100 pt-6 mt-6">
            <h3 className="font-semibold text-xl text-gray-900 mb-2 flex items-center gap-2">
              <FiMapPin className="text-gray-600" /> Location
            </h3>
            <p className="text-gray-800">{listing.location || "Not Provided"}</p>
          </div>
          
          {/* Action Buttons */}
          <div className="border-t border-gray-100 pt-6 mt-10 grid sm:grid-cols-3 gap-4">
            <ContactOwner ownerId={listing.owner} />

            <Link href={`/profile/${listing.owner}`} className="w-full">
              <button className="w-full border border-gray-300 py-2.5 px-4 rounded-lg hover:bg-gray-100 font-medium transition">
                View Profile
              </button>
            </Link>
          </div>
          
        </div>

        {/* Right Column: Floating Booking Panel */}
        <div className="lg:w-5/12 xl:w-4/12 relative">
          <div className="lg:sticky lg:top-28"> 
            <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-lg">
              
              <div className="mb-4 flex items-baseline justify-between">
                <p className="text-2xl font-bold text-gray-900">
                  PKR {listing.price}
                  <span className="text-base font-normal text-gray-600"> / {listing.unit}</span>
                </p>
              </div>

              <BookListing
                id={id}
                owner={listing.owner}
                unit={listing.unit}
                cost={listing.price}
                bookings={bookings}
              />
              
              <p className="text-center text-sm text-gray-500 mt-4">You **won&apos;t** be charged yet</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}