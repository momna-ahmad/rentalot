// app/api/supabase-signin/route.ts
import { NextRequest } from 'next/server'
import { signIn } from '@/auth'
import { redirect } from 'next/navigation';

export async function POST(req: NextRequest) {
    console.log('post request received at /api/supabase-signin');
  const body = await req.json()
  const token = body.token;
  console.log(token); 
  
  const res = await signIn('credentials', {
    token
  })


  return redirect('/dashboard/lister') ;
}
