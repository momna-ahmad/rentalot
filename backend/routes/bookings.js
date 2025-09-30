import express from 'express' ;
import supabase from '../utils/supabase-client.js';
import authenticate from '../middleware/authentication.js';
import fetchUser from '../utils/fetchuser.js';

const router = express.Router() ;

router.post('/book-listing', authenticate, async (req, res) => {
    const user = await fetchUser(req.user.sub);
    const { listing, unit, start, duration , cost} = req.body;

    const total_cost = cost*duration ;
    let start_date_time = new Date(start); // 'start' is in ISO/timestamptz format
    let end_date_time = new Date(start_date_time); // clone the date

    if (unit === 'day') {
        // Add number of days
        end_date_time.setDate(end_date_time.getDate() + duration);
    } else if (unit === 'hour') {
        // Add number of hours
        end_date_time.setHours(end_date_time.getHours() + duration);
    } else {
        return res.status(400).json({ error: 'Invalid unit. Must be "day" or "hour".' });
    }

    const { data, error } = await supabase
        .from('bookings')
        .insert([
            {
                listing,
                customer: user,
                start_date_time,
                end_date_time,
                duration,
                cost: total_cost
            }
        ]);

    if (error) {
        console.error(error);
        return res.status(422).json({ error });
    }

    return res.status(200).json({ message: "Listing booked", data });
});

router.get('/my-bookings' , authenticate , async(req , res)=>{
    const user = await fetchUser(req.user.sub);
    const { data, error } = await supabase
  .from('bookings')
  .select(`
    *,
    listing:listing (*) 
  `) //populates listing column
  .eq('customer',user)
  .gte('start_date_time', new Date().toISOString())
  .order('start_date_time', { ascending: true });

  return res.status(200).json(data) ;
}) ;

router.get('/customer-bookings' , authenticate , async(req , res)=>{
    const user = await fetchUser(req.user.sub);
    const { data, error } = await supabase
  .from('bookings')
  .select(`
    *,
    listing:listing (*) 
  `) //populates listing column
  .eq('listing.owner',user) //foreign table filtering
  .gte('start_date_time', new Date().toISOString())
  .order('start_date_time', { ascending: true });

  console.log(data) ;
  return res.status(200).json(data) ;
});

router.get('/bookings-for-listing/:id'  , async(req , res)=>{
    const {id} = req.params ;
    const { data, error } = await supabase
  .from('bookings')
  .select(`
    *,
    listing:listing (*) 
  `) //populates listing column
  .eq('listing',id) //foreign table filtering
  .gte('start_date_time', new Date().toISOString())
  .order('start_date_time', { ascending: true });
    console.log('bookings' , data) ;
    if(error)
        return res.status(500).json({error}) ;
    return res.status(200).json(data) ;
});

export default router ;