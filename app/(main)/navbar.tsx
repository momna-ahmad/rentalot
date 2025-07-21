import './globals.css';
import Link from 'next/link';

export default function Navbar() {
    return(
        <div className="flex items-center justify-between p-4 bg-green-color text-black">
            <div className="font-bold text-2xl">
                Rentalot.
            </div>
            <Link href="/sign-in" className="text-lg hover:text-gray-700"  >
                Sign In
            </Link>
        </div>
    )
}