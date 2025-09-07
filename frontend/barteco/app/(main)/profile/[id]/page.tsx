import Image from 'next/image';
import api from '@/hooks/axiosInstance';

type Params = {
  params: {
    id: string;
  };
};

export default async function Profile({ params }: Params) {
  const res = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/get-profile/${params.id}`);
  const { profile } = res.data;
  console.log(profile) ;
  return (
    <>
      {/* Profile Image */}
      <div className="flex flex-col items-center space-y-2">
        <div className="w-28 h-28 rounded-full overflow-hidden border border-gray-300">
          <Image
            src={profile?.profile || '/default-avatar.svg'}
            alt="Profile"
            width={112}
            height={112}
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Name Field */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <div className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-gray-800">
          {profile?.name || 'N/A'}
        </div>
      </div>

      {/* Phone Number */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
        <div className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-gray-800">
          {profile?.phone || 'N/A'}
        </div>
      </div>

      {/* About Field */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">About</label>
        <div className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-gray-800 whitespace-pre-line">
          {profile?.about || 'N/A'}
        </div>
      </div>
    </>
  );
}
