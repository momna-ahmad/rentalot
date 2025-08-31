import express from 'express';
import supabase from '../utils/supabase-client.js';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import { storage } from '../utils/cloudinary.js';
import authenticate from '../middleware/authentication.js';
import handleMulterErrors from '../middleware/multer.js';
import handleMulter from '../middleware/handle-multer.js';

const router = express.Router();
router.use(cookieParser());
const upload = multer({ storage });

router.post('/sign-up', async (req, res) => {
    const { email, password } = req.body;
    const { data , error} = await supabase.from('users').select('*')
    .eq('email', email)
    .limit(1);

    
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
      let token = authData.session.access_token ;
      
      res.status(200).json({
        user : {
          email: userData[0].email,
          role: userData[0].role,
          id: userData[0].id,
          token ,
        },
        
        
      })
    }
 
}) ;

router.post("/add-listings/:id", authenticate ,handleMulterErrors, async (req, res) => {
  console.log('Adding listing...');

  try {
    const id = req.params.id;

    let imageUrls = null;
    if (req.files && req.files.length > 0) {
      imageUrls = req.files.map(file => file.path);
    }

    const {
      title,
      description,
      price,
      category,
      unit,
      location
    } = req.body;

    const { data, error } = await supabase.from('listings').insert([
      {
        title,
        description,
        price,
        category,
        unit,
        owner: id,
        location ,
        img_urls: imageUrls,
      }
    ]);

    if (error) {
      console.error("Supabase insert error:", error.message);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ message: 'Listing added successfully' });

  } catch (err) {
    console.error("Unhandled error in /add-listings route:", err);
    return res.status(500).json({ error: "An unexpected error occurred.", details: err.message });
  }
});


router.get("/get-user-listings/:id", authenticate ,async (req , res)=>{
  const id = req.params.id ;
  const{ data: listings , error : err} = await supabase.from('listings').select('*').eq('owner' , id) ;
  
  if(err)
    return res.send(err);
  
  return res.send(listings) ;
});

router.get("/get-listing/:id",async (req , res)=>{
  const id = req.params.id ;
  
  const {data , error} = await supabase.from('listings').select('*').eq('id',id).limit(1) ;
  
  if(error)
    return res.send(error) ;
  res.send(data[0]) ;

});

router.get("/delete-listing/:id",async (req , res)=>{
  const id = req.params.id ;
  
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

      
      const {data : userData , error : userError } = await supabase.from('users').select('*').eq('user_uid',userInfo.user.id).limit(1) ;
      if(userError)
          console.log(userError)
      
      if(userData?.length>0)
      {
        
        return res.status(200).json({
        user : {
          email: userData[0].email,
          role: userData[0].role,
          id: userData[0].id,
          token: token ,
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

        
        res.status(200).json({
        user : {
          email: user.email,
          role: user.role,
          id: user.id,
          token: token,
        }, 
        
      });
    }

});

router.get('/get-user-profile' , authenticate , async( req , res)=>{
  const uid = req.user.sub ; 
  const { data : user , error} = await supabase.from('users').select('*').eq('user_uid',uid) ;
  
  return res.status(200).json(user[0]) ;
});

router.post('/edit-profile' , authenticate , handleMulter ,   async(req, res)=>{
  console.log('edit profile') ;
  const uid = req.user.sub ;
  const image = req.file;
  console.log('Uploaded Image:', image);
  const {name , about , phone} = req.body ;
  
  const { data : user , error} = await supabase.from('users').update({
      name,
      about,
      phone ,
      profile: image ? image.path : null, // or URL if uploaded
    })
    .eq('user_uid',uid).select().single() ;
    if(error)
      return console.log(error);
    console.log(user) ;
  return res.status(200).json({
    message : 'success'
});
});

router.get('/logout' , (req , res)=>{
  res.clearCookie('token') ;
  return res.status(200).json({message : 'success'}) ;
}) ;

export default router;