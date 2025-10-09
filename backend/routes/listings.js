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
router.get('/get-listings', async (req, res) => {
  
  try {

    const { category, page } = req.query;

    const listingsPerPage = 12;
    const currentPage = parseInt(page) || 1;
    const from = (currentPage - 1) * listingsPerPage;
    const to = from + listingsPerPage - 1;

    let query = supabase.from('listings').select('*', { count: 'exact' });

    // Filter by category if provided
    if (category) {
      query = query.eq('category', category);
    }

    // Apply range for pagination
    const { data, error, count } = await query.range(from, to);

    if (error) {
      console.error(error);
      return res.status(500).json({ message: 'Unexpected error' });
    }

    const totalPages = Math.ceil((count || 0) / listingsPerPage);

    return res.status(200).json({
      listings: data,
      totalPages,
      currentPage,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Unexpected server error' });
  }
});


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
  console.log('search route');
    const { query, page , category } = req.query;

    const currentPage = parseInt(page) || 1;
    const listingsPerPage = 12;
    const offset = (parseInt(currentPage) - 1) * listingsPerPage;

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

  res.status(200).json({
    data,
    total: count,
    currentPage: parseInt(page),
    totalPages: Math.ceil(count / listingsPerPage)
  });

});

export default router ;
