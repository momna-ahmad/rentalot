import Image from "next/image";
import api from "@/hooks/axiosInstance";


export default async function Profile(props: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await props.params;
  const res = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/get-profile/${id}`);
  const { profile } = res.data;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-6 flex justify-center">
      <div className="bg-white rounded-3xl shadow-md max-w-2xl w-full p-8 sm:p-10">
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center">
          <div className="relative w-32 h-32 mb-4">
            <Image
              src={profile?.profile || "/default-avatar.svg"}
              alt="Profile picture"
              width={128}
              height={128}
              className="object-cover w-full h-full rounded-full border border-gray-200 shadow-sm"
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
          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              Phone Number
            </h3>
            <p className="text-gray-800 text-lg mt-1">
              {profile?.phone || "Not provided"}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              About
            </h3>
            <p className="text-gray-800 mt-1 leading-relaxed whitespace-pre-line">
              {profile?.about || "No information provided."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
