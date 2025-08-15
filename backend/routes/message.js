import express from 'express' ;
import supabase from '../utils/supabase-client.js';

const router = express.Router() ;

router.post('/message' , async(req , res)=>{
    let {message , user , user2  } = req.body ;
    let {chat} = req.body ;
    
    console.log(message , user , user2 , chat) ;
    //check if users have a chat room
    if(!chat)
    {
        const { data : chatData , error} = await supabase.from('chats').insert({user_id : user , user2_id : user2}).select().single() ;
        if(error)
            console.log(error) ;
        console.log(chatData);
        chat = chatData.id ;
    }
    //insert message in chat room
    const {data ,error } = await supabase.from('messages').insert({content: message , chat}) ;
    if(error){
        console.log(error)
        return res.send(error)
    }
        
    return res.status(200).json({
        chat
    }) ;
});



export default router ;