import express from 'express' ;
import supabase from './supabase-client.js';

const router = express.Router() ;

router.get('/' , async (req , res)=>{
    const { data:listings , error} = await supabase.from('listings').select('*') ;
    if(error)
        return res.send({error: "an error occurred. visit later"}) ;
    console.log(listings) ;
    return res.send(listings) ;
});

//generic route for fetchings listings of a particular category
router.get('/get-listings/:category' , async(req, res)=>{
    const {category } = req.params ;
    const {data , error} = await supabase.from('listings').select('*').eq('category',category) ;
    if(error)
        return res.json({message: 'unexpected error'}) ;
    console.log(data) ;
    return res.status(200).json({
        data
    })
})

export default router ;
