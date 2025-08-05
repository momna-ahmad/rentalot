import express from 'express';
import supabase from './supabase-client.js';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import { storage } from '../utils/cloudinary.js';
import authenticate from '../middleware/authentication.js';

const router = express.Router();
router.use(cookieParser());
const upload = multer({ storage });

router.post('/sign-up', async (req, res) => {
    const { email, password } = req.body;
    const { data , error} = await supabase.from('users').select('*')
    .eq('email', email)
    .limit(1);

    console.log('data' + data);
    if(data?.length > 0){
        return res.status(400).json({ error: 'Email already exists' });
    }
    else{
      const { data: authData , authError } = await supabase.auth.signUp({
    email,
    password,
  });

   if (authError) {
    return res.status(400).json({ error: error.message });
  }
  else
  {
    const { data: userData, error: userError } = await supabase.from('users').insert([
      { email: email , user_uid: authData.user.id }
    ]);

    if (userError) {
      return res.status(400).json({ error: userError.message });
  }
  else
    return res.status(200).json({message : "succes"}) ;

  }
}
 
}) ;

router.post('/sign-in',  async (req, res) => {
  console.log('sign-in route hit');
    const { email, password } = req.body;

    const { data , error} = await supabase.from('users').select('*')
    .eq('email', email)
    .limit(1);

    if(data == null || data.length === 0){
        return res.status(400).json({ error: 'no user exist please sign up' });
    }

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    if (authError) {
        return res.status(400).json({ error: authError.message });
    }
    else{
      const { data: userData, error: userError } = await supabase.from('users').select('*')
      .eq('user_uid' , authData.user.id).limit(1) ;
      console.log('userData' + userData[0].id);
      console.log('session' , authData) ;
      res.status(200).json({
        user : {
          email: userData[0].email,
          role: userData[0].role,
          id: userData[0].id,
          token: authData.session ,
        },
        
        
      })
    }
 
}) ;

router.post("/add-listings" , upload.array('images', 5), async (req, res) => {

  const session = JSON.parse(req.cookies.session);
  const userId = session.userId;
  let imageUrls ;
  if(req.files.length>0)
    imageUrls = req.files.map(file => file.path);
  else
    imageUrls = null ;
   
  const {
    title,
    description,
    price,
    category,
    unit,
  } = req.body ;

  console.log('DATA ' ,title, description , price , category , unit);
  
  if(!title || !description )
    res.status(400).json({error : "fields required"}) ;
  else{
  const { data, error } = await supabase.from('listings').insert([
    {
      title,
      description,
      price,
      category,
      unit,
      'owner' : userId,
      img_urls : imageUrls,
    }
  ]);
  if (error) {
    return res.status(400).json({ error: error.message });
  }else{
    res.status(200).json({ message: 'Listing added successfully'});
  }
}
});

router.get("/get-user-listings", async (req , res)=>{
  console.log(req.cookies.session);
  const session = JSON.parse(req.cookies.session);
  const userId = session.userId;
  console.log(userId);
  const {data , error} = await supabase.from('listings').select('*').eq('owner',userId) ;
  console.log(data) ;
  if(error)
    return res.send(error);
  res.send(data) ;
});

router.get("/get-listing/:id",async (req , res)=>{
  const id = req.params.id ;
  console.log(id) ;
  const {data , error} = await supabase.from('listings').select('*').eq('id',id).limit(1) ;
  console.log(data[0]) ;
  if(error)
    return res.send(error) ;
  res.send(data[0]) ;

});

router.get("/delete-listing/:id",async (req , res)=>{
  const id = req.params.id ;
  console.log('delete route hit' , id ) ;
  const {data , error} = await supabase.from('listings').delete().eq('id',id) ;
  if(error)
    return res.send(error) ;
  res.send('success') ;

});

router.post("/edit-listing/:id",async (req , res)=>{
  const id = req.params.id ;
  const {title , description , price , unit , category } = req.body ;
  const {data , error} = await supabase.from('listings').update({ title, description, price, unit, category }).eq('id',id) ;
  if(error)
    return res.send(error) ;
  res.send('success') ;

});

router.post('/google-sign-in' , async(req , res)=>{
  const {token} = req.body ;
    const { data: userInfo, error } = await supabase.auth.getUser(token);
      if (error || !userInfo?.user) return null;

      const {data : userData , error : userError } = await supabase.from('users').select('*').eq('email',userInfo.email).limit(1) ;
      if(userError)
          console.log(userError)
      if(userData?.length>0)
      {
        console.log(userData) ;
        return res.status(200).json({
        user : {
          email: userData[0].email,
          role: userData[0].role,
          id: userData[0].id,
          token: authData.session ,
        },
        
      })
      }
      else{
        //insert user in database
        const{data : user , error : err} = await supabase.from('users').insert({
           email: userInfo.user.email , user_uid: userInfo.user.id 
        }).select() ;
        if(err)
          console.log(err)
        console.log(user) ;
        res.status(200).json({
        user : {
          email: user.email,
          role: user.role,
          id: user.id,
          token,
        }, 
        
      })
      };

});



export default router;