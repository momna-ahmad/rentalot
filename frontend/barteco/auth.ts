//to spread auth config object
//credentials for sign in and sign up 
 
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';


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
        const { user  } = await res.json();
        
        //stored in auth for sessions
        return user;
      }
        
    }
  })],
});