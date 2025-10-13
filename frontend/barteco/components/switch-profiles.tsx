'use client';
import { usePathname, useRouter } from 'next/navigation';

export default function SwitchProfiles() {
  const path = usePathname();
  const router = useRouter();

  const navigateToBrowsing = () => {
    router.replace('/');
  };

  const navigateToDashboard = () => {
    router.replace('/dashboard/lister');
  };

  return (
    <div className="flex gap-4">
      {path.includes('/lister') ? (
        <button
          onClick={navigateToBrowsing}
          className="px-4 py-2 bg-white text-black rounded-md hover:bg-gray-100 transition-colors"
        >
          Switch to browsing
        </button>
      ) : (
        <button
          onClick={navigateToDashboard}
          className="px-4 py-2 bg-white text-black rounded-md hover:bg-gray-100 transition-colors"
        >
          Switch to listing
        </button>
      )}
    </div>
  );
}
