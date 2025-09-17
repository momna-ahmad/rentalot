'use client'

import { useContext, useActionState } from 'react';
import { ProfileContext } from '@/context/useProfileContext';
import Image from 'next/image';
import { editProfile } from '@/lib/action';

export default function ProfileForm() {
  const profile = useContext(ProfileContext);

  const [error , formAction, isPending] = useActionState(
        editProfile,
        null
      );

  return (
    <form
      action={formAction}
      className="w-full max-w-2xl mx-auto p-8 bg-white rounded-xl shadow space-y-6"
    >
        {error && (
        <div className="text-red-600 bg-red-100 px-4 py-2 rounded">
          {error}
        </div>
      )}

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

        <input
          type="file"
          name='image'
          accept="image/*"
          
          className="text-sm text-gray-600"
        />
      </div>

      {/* Name Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input
          name="name"
          defaultValue={profile?.name}
          type="text"
          className="w-full bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg px-4 py-2 outline-none transition"
        />
      </div>

      {/* Phone Number */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
        <input
          name="phone"
          defaultValue={profile?.phone}
          type="text"
          className="w-full bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg px-4 py-2 outline-none transition"
        />
      </div>

      {/* About Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">About</label>
        <textarea
          name="about"
          defaultValue={profile?.about}
          rows={4}
          className="w-full bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg px-4 py-2 outline-none transition resize-none"
        />
      </div>

      {/* Save Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Save Changes
      </button>
    </form>
  );
}
