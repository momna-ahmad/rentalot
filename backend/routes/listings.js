import express from 'express' ;
import supabase from './supabase-client.js';

const router = express.Router() ;

router.get('/' , async (req , res)=>{
    const { data:listings , error} = await supabase.from('listings').select('*') ;
    if(error)
        return res.send({error: "an error occurred. visit later"}) ;
    console.log(listings) ;
    return res.send(listings) ;
})

export default router ;
