import ActionsOnListings from "../../../../../components/actions-on-listings";
import ListingProvider from "../../../../../context/useListingContext";

interface PageProps {
  params: { id: string };
}

export default async function Listing({ params }: PageProps) {
  const { id } = params;
  console.log(id) ;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-listing/${id}`,
    {
      headers: {
            'Content-Type': 'application/json',
          },
    }
  );

  const listing = await res.json()  ;
    console.log('listing ',listing);
  return(
    <>
    <p>listing</p>
    <h1>
      Title
      {listing.title}
    </h1>
    <h2>
      Description
      {listing.description}
    </h2>
    <ListingProvider value={listing}>
            {/*context provider used to reduce the amount of props sent to components*/}
      <ActionsOnListings />
     </ListingProvider>
    </>
  );
  
}