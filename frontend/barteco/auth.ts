//to spread auth config object
//credentials for sign in and sign up 
 
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import api from './hooks/axiosInstance';

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
        console.log("Google sign in with token: ", token);
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
    console.log("Email sign in with email: ", email);

      const res = await api.post(
  `${process.env.NEXT_PUBLIC_API_URL}/sign-in`,
  {
    email: credentials?.email,
    password: credentials?.password,
  },
  {
    headers: { 'Content-Type': 'application/json' },
  }
);

      console.log("Response from sign-in: ", res);
      
      if(!res) {
            console.error('sign-in failed - Status:', res);
            return null;
          }
      else
      {
        //const { user  } = await res.json();
        const user = res.data.user ;
         console.log("User from sign-in: ", user);
        //stored in auth for sessions
        return user;
      }
        
    }
  })],
});