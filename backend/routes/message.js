import express from 'express' ;
import supabase from '../utils/supabase-client.js';
import authenticate from '../middleware/authentication.js';
import fetchUser from '../utils/fetchuser.js';

const router = express.Router() ;

router.post('/message' , async(req , res)=>{
    let {message , sender , user2  } = req.body ;
    let {chat} = req.body ;
    
    console.log(message , sender , user2 , chat) ;
    //check if users have a chat room
    if(!chat)
    {
        const { data : chatData , error} = await supabase.from('chats').insert({user_id : sender , user2_id : user2}).select().single() ;
        if(error)
            console.log(error) ;
        console.log(chatData);
        chat = chatData.id ;
    }
    //insert message in chat room
    const {data ,error } = await supabase.from('messages').insert({content: message , chat , sender}) ;
    if(error){
        console.log(error)
        return res.send(error)
    }
        
    return res.status(200).json({
        chat
    }) ;
});

router.get('/inbox', authenticate, async (req, res) => {
  const user = req.user.sub;

  const { data, error } = await supabase
    .from('users')
    .select('id')
    .eq('user_uid', user)
    .single();

  if (error) return res.status(400).json({ error: error.message });

  const currentUser = data.id;

  const { data: chats, error: chatsError } = await supabase
    .from('chats')
    .select('*')
    .or(`user_id.eq.${currentUser},user2_id.eq.${currentUser}`);

  if (chatsError) return res.status(400).json({ error: chatsError.message });

  if (!chats || chats.length === 0) return res.status(200).json([]);

  // figure out the "other user" for each chat
  const otherUserIds = chats.map((chat) =>
    chat.user_id === currentUser ? chat.user2_id : chat.user_id
  );

  // fetch details of those users
  const { data: otherUsers, error: usersError } = await supabase
    .from('users')
    .select('id, name') // use 'id' if that's the primary key
    .in('id', otherUserIds);

  if (usersError) return res.status(400).json({ error: usersError.message });

  // merge chats with the other user's info
  const inbox = chats.map((chat) => {
    const otherUserId = chat.user_id === currentUser ? chat.user2_id : chat.user_id;
    const otherUser = otherUsers.find((u) => u.id === otherUserId);
    return {
      ...chat, //contains inbox data like chat id
      otherUser, //contains other user data like id and name
    };
  });

  return res.status(200).json(inbox);
});

//modify to accept token and send messages in form of message and sent field with true or false (whether current user sent or received said message)
router.get('/messages/:chatId' , authenticate , async (req, res) => {
  const { chatId } = req.params ;
  const user = await fetchUser(req.user.sub) ;
  console.log(user) ;
  const { data , error} = await supabase.from('messages').select('*').eq('chat' , chatId).order('created_at', { ascending: true }) ;
  if(error)
    return res.status(400).json({error: error.message}) ;
  let messages = 
  data.map((message)=>{
    const sent = user === message.sender? true : false ;
    const content = message.content ;
    return {
      sent,
      content
    }
  }) ;
  return res.status(200).json(messages) ;
});

export default router ;