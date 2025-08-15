import type { NextAuthConfig } from 'next-auth';
 
//using v5 beta version of next-auth due to app router


export const authConfig = {
  pages: {
    signIn: '/sign-in',
  },
  callbacks: {
    async jwt({ token, user }) {
  if (user) {
    token.id = (user as any).id;
    token.email = (user as any).email;
    token.role = (user as any).role;
    token.token = (user as any).token ;
  }
  return token;
}
,
 async session({ session, token }) {
    // Attach custom fields from token to session
    if (session.user) {
      session.user.id = (token as any).id;
      (session.user as any).role = (token as any).role ;
      (session.user as any).email = (token as any).email ;
      (session.user as any).token = (token as any).token ;
    }
    return session;
  },
    authorized({ auth, request: { nextUrl } }) {
      
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn)
          {
            return true
          } ;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        if(nextUrl.pathname === '/sign-in')
          return Response.redirect(new URL('/dashboard/lister', nextUrl));
        return true
        
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;