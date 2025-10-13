import type { NextAuthConfig } from 'next-auth';

// Define custom types for your user and token
interface CustomUser {
  id: string;
  email: string;
  role: string;
  token: string;
}

interface CustomToken {
  id?: string;
  email?: string;
  role?: string;
  token?: string;
}

export interface CustomSessionUser {
  id?: string;
  email?: string;
  role?: string;
  token?: string;
  name?: string;
  image?: string;
}

//using v5 beta version of next-auth due to app router

export const authConfig = {
  pages: {
    signIn: '/sign-in',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const customUser = user as CustomUser;
        token.id = customUser.id;
        token.email = customUser.email;
        token.role = customUser.role;
        token.token = customUser.token;
      }
      return token;
    },
    async session({ session, token }) {
      // Attach custom fields from token to session
      if (session.user) {
        const customToken = token as CustomToken;
        const customUser = session.user as CustomSessionUser;
        
        customUser.id = customToken.id;
        customUser.role = customToken.role;
        customUser.email = customToken.email;
        customUser.token = customToken.token;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      
      if (isOnDashboard) {
        if (isLoggedIn) {
          return true;
        }
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        if (nextUrl.pathname === '/sign-in') {
          return Response.redirect(new URL('/dashboard/lister', nextUrl));
        }
        return true;
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;