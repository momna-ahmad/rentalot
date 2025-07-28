//to spread auth config object
//credentials for sign in and sign up 
 
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { createSession } from '@/app/lib/session'

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [Credentials({
    async authorize(credentials) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sign-in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials?.email,
          password: credentials?.password,
        }),
      }
      );
      if(!res)
        return null;
      else
      {
        const { user , token } = await res.json();
        const userId = user.id; 
        await createSession(userId, token);
        console.log('User signed in successfully created session in auth.ts');
        return user;
      }
        
    }
  })],
});