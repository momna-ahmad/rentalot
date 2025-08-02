'use client'

import { useContext } from 'react' ;
import { ListingContext } from '@/context/useListingContext';
import Link from 'next/link';

export default function Delete(){
    const listing = useContext(ListingContext) ;
    console.log('listing accessed thro get context in delte component ' , listing) ;
    return (
        <>
        <Link href={'/dashboard/lister'}>
        
        <button onClick={async()=>{
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/delete-listing/${listing?.id}`,
    {
      headers: {
            'Content-Type': 'application/json',
          },
    });

        }}
        >
            Delete
        </button>
        </Link>
        </>
    )
}