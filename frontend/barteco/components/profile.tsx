'use client'

import { ProfileContext } from '@/context/useProfileContext';
import { useContext } from 'react';
import { useRouter , usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function Profile() {
  const profile = useContext(ProfileContext);
  

  if (!profile) {
    return null;
  }

  const hasImage = !!profile.profile; // true if image URL exists

  return (
    <Link href={'/dashboard/lister/profile'}>
    
    <div
      
      className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded transition"
    >
      {hasImage ? (
        <Image
          src={profile.profile}
          alt="Profile"
          width={32}
          height={32}
          className="rounded-full object-cover"
        />
      ) : (
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </div>
      )}

      {profile.name && (
        <span className="text-sm font-medium text-gray-800">
          {profile.name}
        </span>
      )}
    </div>
    </Link>
  );
}
