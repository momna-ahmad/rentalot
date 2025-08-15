
import Listings from "@/components/listings";
import Categories from "@/components/categories";

interface PageProps{
    params : {category : string} 
}

export default function Page({ params }: PageProps){
    const { category }=  params ;
    //generic route
    /*const listings  = fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-listings/${category}`)
    .then(data =>{
        return data.json() ;
    })*/
    return (
        <>
            <Categories/>
        </>
    )
}