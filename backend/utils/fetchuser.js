//fetches user data from req.user.sub 

import supabase from '../utils/supabase-client.js';

export default async function fetchUser(uid){
    const { data, error } = await supabase
    .from('users')
    .select('id')
    .eq('user_uid', uid)
    .single();

    return data.id ;
}