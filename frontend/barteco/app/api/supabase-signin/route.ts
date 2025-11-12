// app/api/supabase-signin/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { signIn } from '@/auth';
import { redirect } from 'next/navigation'; // Import the redirect function

export async function POST(req: NextRequest) {
  console.log('✅ POST request received at /api/supabase-signin');

  const { token } = await req.json();
  console.log('Received token:', token);

  try {
    // 1. Call signIn. If successful, it throws the NEXT_REDIRECT signal.
    await signIn('credentials', { token });

    // 2. This line should theoretically never be reached if sign-in succeeds
    // and throws the redirect signal.
    return NextResponse.json({ success: true, message: 'Sign in complete (no redirect expected)' });
  } catch (err) {
    // 3. CATCH THE REDIRECT EXCEPTION
    
    // Check if the error is the expected NEXT_REDIRECT signal
    if (err instanceof Error && 'digest' in err && typeof err.digest === 'string' && err.digest.includes('NEXT_REDIRECT')) {
      // Re-throw the redirect signal to Next.js so it can execute the actual redirect
      throw err; 
    }

    // 4. Handle actual, unexpected errors
    console.error('Error in supabase-signin route:', err);
    return NextResponse.json({ success: false, error: 'Failed to sign in' }, { status: 500 });
  }
}