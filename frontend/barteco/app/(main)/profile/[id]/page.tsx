import Image from "next/image";
import api from "@/hooks/axiosInstance";
import ReviewsSlider from "@/components/user-reviews";
// Import FiPhone for a cleaner detail look
import { FiPhone, FiInfo } from 'react-icons/fi';

export default async function Profile(props: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await props.params;
  
  // Fetch both profile and reviews in one call
  const profileRes = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/get-profile/${id}`);
  
  // Assuming the backend response structure is { profile: { ... }, reviews: [...] }
  const { profile, reviews } = profileRes.data; 

  return (
    // Updated container for full width and two-column flexibility
    <div className="min-h-screen bg-white py-12 px-6 sm:px-10 lg:px-20">
      
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10 items-start">

        {/* 1. LEFT COLUMN: Profile Info Card (Fixed Width) */}
        <div className="w-full lg:w-1/3 flex-shrink-0 bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          
          {/* Profile Header */}
          <div className="flex flex-col items-center text-center">
            <div className="relative w-32 h-32 mb-4">
              <Image
                src={profile?.profile || "/default-avatar.svg"}
                alt="Profile picture"
                width={128}
                height={128}
                className="object-cover w-full h-full rounded-full border-4 border-white shadow-md"
              />
            </div>

            <h1 className="text-3xl font-semibold text-gray-900">
              {profile?.name || "Unnamed User"}
            </h1>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 my-8"></div>

          {/* Info Section */}
          <div className="space-y-6">
            
            {/* Phone Number */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide flex items-center gap-2 mb-1">
                <FiPhone className="w-4 h-4" /> Phone Number
              </h3>
              <p className="text-gray-800 text-lg">
                {profile?.phone || "Not provided"}
              </p>
            </div>

            {/* About */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide flex items-center gap-2 mb-1">
                <FiInfo className="w-4 h-4" /> About
              </h3>
              <p className="text-gray-800 mt-1 leading-relaxed whitespace-pre-line">
                {profile?.about || "No information provided."}
              </p>
            </div>
          </div>
        </div>

        {/* 2. RIGHT COLUMN: Reviews Slider (Takes Remaining Width) */}
        <div className="w-full lg:w-2/3">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">User Reviews</h2>
          
          {/* Pass the retrieved reviews to the ReviewsSlider component */}
          <ReviewsSlider reviews={reviews} /> 
        </div>

      </div>
    </div>
  );
}