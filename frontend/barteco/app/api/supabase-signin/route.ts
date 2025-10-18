// app/api/supabase-signin/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { signIn } from '@/auth';

export async function POST(req: NextRequest) {
  console.log('✅ POST request received at /api/supabase-signin');
  
  const { token } = await req.json();
  console.log('Received token:', token);

  try {
    const res = await signIn('credentials', { token });
    console.log('Sign in successful:', res);
    
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error in supabase-signin route:', err);
    return NextResponse.json({ success: false, error: 'Failed to sign in' }, { status: 500 });
  }
}
