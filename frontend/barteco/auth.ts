//to spread auth config object
//credentials for sign in and sign up 
 
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { createSession } from '@/lib/session'

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [Credentials({
    name: 'Credentials or Supabase OAuth',
    credentials: {
    email: { label: 'Email', type: 'text' },
    password: { label: 'Password', type: 'password' },
    token: { label: 'Supabase Access Token', type: 'text' }, // optional
  },
    async authorize(credentials) {
    
      const { email, password, token } = credentials || {};
      if(token && !email && !password)
      {
        console.log('auth .ts google ' , token);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/google-sign-in`,{
          method: 'post' ,
          headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token
        }
        )
        })
        if(!res)
        return null;
      else
      {
        const { user  } = await res.json();
        console.log('User signed in successfully created session in auth.ts' , user);
        //stored in auth for sessions
        return user;
      }
      
      }
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
        console.log('User signed in successfully created session in auth.ts' , user);
        //stored in auth for sessions
        return user;
      }
        
    }
  })],
});