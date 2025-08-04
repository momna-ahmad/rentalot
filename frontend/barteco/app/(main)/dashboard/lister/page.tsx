
import './styles.css';
import Link from 'next/link';
import UserListings from '../../../../components/user-listings';
import { Suspense } from 'react';
import Loading from './loading' ;

export default function Page() {
  
  return (
    <>
    <Link href="/dashboard/lister/add-listing">
    <div 
    className='font-sans text-blue-600 border border-blue-500 rounded-lg 
         p-6 text-center shadow-sm w-full max-w-md mx-auto my-auto 
        flex items-center justify-center text-xl font-semibold'
    >
      Add to your listings
    </div>
    </Link>
    {/* Any content wrapped in a <Suspense> boundary will be streamed */}
    <Suspense fallback={<Loading/>}>
      <UserListings />
    </Suspense>

    </>
    
  );
}