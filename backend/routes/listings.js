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
})

export default router ;
