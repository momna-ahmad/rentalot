'use server'

//server actions for sign in 

import { signIn } from '@/auth' ;
import { AuthError  } from 'next-auth';

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