'use client'

import { ProfileContext } from '@/context/useProfileContext';
import { useContext } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function Profile() {
  const profile = useContext(ProfileContext);

  if (!profile) {
    return null;
  }

  const hasImage = !!profile.profile;

  return (
    <Link href="/dashboard/lister/profile">
      
        {hasImage ? (
          <div
        className="w-11 h-11 rounded-full overflow-hidden border border-gray-300 shadow"
        title="Your Profile"
      >
          <Image
            src={profile.profile}
            alt="Profile"
            width={32}
            height={32}
            className="object-cover w-full h-full"
          />
          </div>
        ) : (
          <div
        className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded transition"
        title="Your Profile"
      >
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
            {/* Better user icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-5 h-5"
            >
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12Zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v1.2h19.2v-1.2c0-3.2-6.4-4.8-9.6-4.8Z" />
            </svg>
          </div>
          </div>
        )}
      
    </Link>
  );
}
