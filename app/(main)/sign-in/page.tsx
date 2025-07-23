'use client';

import { useRouter  } from "next/navigation";
import { useAuth } from "@/app/useAuth";
import Link from 'next/link';

export default function Page() {
  
  const { replace } = useRouter();
  const { request , loading , error } = useAuth() ;

  // This is a simple sign-up page component
  async function handleSubmit(event : React.FormEvent<HTMLFormElement>){
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

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign In</h2>
        <span>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}  
        </span>
        <form action="submit" onSubmit={handleSubmit} className="space-y-4">
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

          

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
            disabled={loading}
          >
            Sign In
          </button>

          {
            loading && <p className="text-blue-500 text-sm mt-2">Loading...</p>
          }

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
