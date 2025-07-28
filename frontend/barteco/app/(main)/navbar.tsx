
import './globals.css';
import SignInButton from './sign-in-button';
import { cookies } from 'next/headers';
import Link from 'next/link';
import {signout } from '@/app/lib/action' ;

export default async function Navbar() {
    const cookieStore = await cookies();
    const session = cookieStore.get('session') ;
    console.log('session' , session) ;
    return(
        <div className="flex items-center justify-between p-4 bg-green-color text-black">
            <div className="font-bold text-2xl">
                Rentalot.
            </div>
            {
            session === null || session === undefined? 
            <Link href="/sign-in" className="text-lg hover:text-gray-700"  >
                Sign In
            </Link> :
            <form action={signout}>
          <button type="submit" className="text-lg hover:text-gray-700">
            Log out
          </button>
        </form>

            }
            
            
        </div>
    )
}