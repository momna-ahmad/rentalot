import Categories from "@/components/categories"
import api from "@/hooks/axiosInstance";
//repetetive logic , this component isnt being rendered anywhere
export default async function Browse(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    category?: string;
  }>;
}){
    const searchParams = await props.searchParams;
  const category = searchParams?.category || '';
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  console.log(' cateogry query page' , category , query , currentPage) ;
  //fetch data only if query is present 
  
    const res = await api.get('/search-listings' , {
      params : {
        query ,
        page : currentPage ,
        category ,
      }
    });
    return (
        <>
        <Categories listings={res.data.data}  />
        </>
    )
}