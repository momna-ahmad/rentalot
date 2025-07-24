'use client';

import { useRouter  } from "next/navigation";
import { useAuth } from "@/app/useAuth";
import Link from 'next/link';
import { useActionState } from 'react';
import { authenticate } from '@/app/lib/action';
import { useSearchParams } from 'next/navigation';


export default function Page() {

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('redirectTo') || '/dashboard/lister';
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );
  //await createSession(); // Replace with actual user ID after authentication

  
  //const { replace } = useRouter();
  //const { request , loading , error } = useAuth() ;

  // This is a simple sign-up page component
  /*async function handleSubmit(event : React.FormEvent<HTMLFormElement>){
    event.preventDefault() ;

    const email = event.currentTarget.email.value as string;
    const password = event.currentTarget.password.value as string;

    const res = await request('post', '/sign-in', { email, password });
    if(res && res.status === 200){
      console.log('Redirecting to dashboard...');
      
      //change to role based redirect
      // For now, redirect to lister dashboard
      replace('/dashboard/lister');
    }

  }*/

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign In</h2>
        
        <form action={formAction} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              name='email'
              type="email"
              id="email"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              name='password'
              type="password"
              id="password"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          
          <input type="hidden" name="redirectTo" value={callbackUrl} />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
            
          >
            Sign In
          </button>
          {errorMessage && (
            <p className="text-red-500 text-sm mt-2 text-center">
              {errorMessage}
            </p>
          )}


          <p className="text-sm text-gray-600 text-center mt-4">
            or
          </p>

          <Link href={"/sign-up"} className="text-blue-600 hover:text-blue-700 text-sm text-center block mt-4">
          Sign up 
          </Link>

        </form>
      </div>
    </div>
  );
}
