
import '@/app/(main)/globals.css';
import {auth} from '@/auth' ;
import Link from 'next/link';
import {signout } from '@/lib/action' ;

export default async function Navbar() {
    
    const session = await auth();

    console.log('User:', session?.user);

    return(
        <div className="flex items-center justify-between p-4 text-black">
            <div className="font-bold text-2xl">
                RentaLot.
            </div>
            {
            session === null || session === undefined? 
            <Link href="/sign-in"  prefetch={false} >
                <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:border-transparent hover:bg-blue-600 hover:text-white active:bg-blue-700 transition">
                    Sign In
                </button>

                
            </Link> :
            <form action={signout}>
          <button type="submit" className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:border-transparent hover:bg-blue-600 hover:text-white active:bg-blue-700 transition">
            Log out
          </button>
        </form>

            }
            
            
        </div>
    )
}