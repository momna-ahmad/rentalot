import express from 'express';
import supabase from './supabase-client.js';

const router = express.Router();

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

router.post('/sign-in', async (req, res) => {
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
      res.status(200).json({
        user : {
          email: userData[0].email,
          role: userData[0].role,
          id: userData[0].id,
        },
        token: authData.session ,
        
      })
    }
 
}) ;

router.post("/add-listings" , async (req, res) => {
  
  const {
    title,
    description,
    price,
    category,
    userId  
  } = req.body ;

  const { data, error } = await supabase.from('listings').insert([
    {
      title,
      description,
      price,
      category,
      image_url: imageUrl,
      user_id: userId
    }
  ]);
  if (error) {
    return res.status(400).json({ error: error.message });
  }else{
    res.status(200).json({ message: 'Listing added successfully'});
  }
});

export default router;