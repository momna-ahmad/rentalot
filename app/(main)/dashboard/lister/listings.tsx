//'use client' ;
export default async function Listings(){
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/listings`, {
        cache: 'no-store',
    });
    const listings = res.body  ;
    return (
        <>

        </>
    );
}
