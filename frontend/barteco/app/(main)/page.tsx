import SearchBar from "@/components/search-bar";
import Categories from "@/components/categories";
import api from "@/hooks/axiosInstance";

import { auth } from "@/auth";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    category?: string;
  }>;
}) {
  
  const searchParams = await props.searchParams;
  const category = searchParams?.category || 'homes'; //default category should be homes
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  
  //fetch data only if query is present 
  
    const res = await api.get('/search-listings' , {
      params : {
        query ,
        page : currentPage ,
        category ,
      }
    });
    console.log('search listings' , res.data) ;

  return (
    <>
      <div className="flex flex-col items-center justify-center px-4 sm:px-8 py-20 text-center font-sans gap-8">
        {/* Emoji Icons Row */}
        <div className="flex justify-center gap-4 text-4xl sm:text-5xl">
          <span>🏠</span>
          <span>🚗</span>
          <span>🛵</span>
          <span>🏢</span>
          <span>🛻</span>
          <span>🚲</span>
        </div>

        {/* Hero Text */}
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900">
          Rent smarter with your AI assistant
        </h1>
        <p className="text-gray-600 text-base sm:text-lg max-w-xl">
          RentaLot is a rental platform for homes, cars, halls,
          and more. Find and manage rentals effortlessly.
        </p>
      </div>

      {/* Centered SearchBar */}
      <div className="flex justify-center my-8 px-4">
        <div className="w-full max-w-xl">
          <SearchBar placeholder="Enter keyword" />
        </div>
      </div>

      {/* Categories section below hero */}
      <Categories listings={res.data.data} />
    </>
  );
}
