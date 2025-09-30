import express from 'express' ;
import supabase from '../utils/supabase-client.js';

const router = express.Router() ;

router.get('/' , async (req , res)=>{
    const { data:listings , error} = await supabase.from('listings').select('*') ;
    if(error)
        return res.send({error: "an error occurred. visit later"}) ;
    
    return res.send(listings) ;
});

//generic route for fetchings listings of a particular category
router.get('/get-listings/:category' , async(req, res)=>{
    const {category } = req.params ;
    console.log(category);
    const {data , error} = await supabase.from('listings').select('*').eq('category',category) ;
    if(error)
        return res.json({message: 'unexpected error'}) ;
    console.log(data) ;
    return res.status(200).json({
        data
    })
})

router.get('/listing-detail/:id' , async(req, res)=>{
    const {id} = req.params ;
    const {data:listing , error} = await supabase.from('listings').select('*').eq('id',id).single();
    if(error)
    {
        console.log(error) ;
        return res.status(404).json({message : error}) ;
    }
        
    console.log(listing) ;
    return res.status(200).json({listing}) ;
});

router.get('/search-listings' , async(req , res)=>{
    const { query, page = 1 , category } = req.query;

    const listingsPerPage = 10;
    const offset = (parseInt(page) - 1) * listingsPerPage;

    // Start the Supabase query
    let supabaseQuery = supabase
    .from('listings')
    .select('*', { count: 'exact' }) // include count for pagination
    .range(offset, offset + listingsPerPage - 1);

     // Step 1: Filter by category (if provided)
  if (category) {
    supabaseQuery = supabaseQuery.eq('category', category);
  }

  // Step 2: Filter by search keyword in title, location, or description
  if (query) {
    supabaseQuery = supabaseQuery.or(
      `title.ilike.%${query}%,location.ilike.%${query}%,description.ilike.%${query}%`
    );
  }

  // Execute the query
  const { data, error, count } = await supabaseQuery;
  if (error) {
    console.error('Error fetching listings:', error);
    return res.status(500).json({ message: 'Server error', error });
  }

  console.log('data in search ' , data) ;
  res.status(200).json({
    data,
    total: count,
    currentPage: parseInt(page),
    totalPages: Math.ceil(count / listingsPerPage)
  });

});

export default router ;
