'use server'

//server actions for sign in 

import { signIn } from '@/auth' ;
import { AuthError  } from 'next-auth';
import { cookies } from 'next/headers';
import { signOut } from '@/auth';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
    console.log('Authenticating user... /app/lib/action ') ;
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function signout(){
  const cookieStore = await cookies();
  cookieStore.set('session', '', { path: '/', maxAge: 0 });
  await signOut({ redirectTo: '/' });

}


