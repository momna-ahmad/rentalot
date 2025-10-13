import '@/app/(main)/globals.css';
import { auth } from '@/auth';
import Link from 'next/link';
import { signout } from '@/lib/action';
import Profile from './profile';
import SwitchProfiles from './switch-profiles';

export default async function Navbar() {
  const session = await auth();

  return (
    <div className="flex items-center justify-between px-6 py-4  ">
      {/* Left side: Logo */}
      <div className="font-bold text-2xl">
        RentaLot.
      </div>

      {/* Right side: Auth Buttons & Profile */}
      {
        session?.user == null ? (
          <Link href="/sign-in" prefetch={false}>
            <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:border-transparent hover:bg-blue-600 hover:text-white active:bg-blue-700 transition">
              Sign In
            </button>
          </Link>
        ) : (
          <div className="flex items-center gap-4">
            <SwitchProfiles />
            <form action={signout}>
              <button
                type="submit"
                className="border border-red-600 text-red-600 px-4 py-2 rounded-lg hover:border-transparent hover:bg-red-600 hover:text-white active:bg-red-700 transition"
              >
                Log out
              </button>
            </form>
            <Profile />
          </div>
        )
      }
    </div>
  );
}
