// app/api/supabase-signin/route.ts
import { NextRequest } from 'next/server'
import { signIn } from '@/auth'

export async function POST(req: NextRequest) {
    
  const body = await req.json()
  const token = body.token;
  console.log(token); 
  
  const res = await signIn('credentials', {
    token
  })

  console.log('route.ts');

  return new Response(JSON.stringify({ success: true }), { status: 200 })
}
