'use client';

import { useRouter  } from "next/navigation";
import api from "@/hooks/axiosInstance";
import GoogleSignIn from "@/components/google-signIn";

export default function Page() {
  
  const { replace } = useRouter();

  // This is a simple sign-up page component
  async function handleSubmit(event : React.FormEvent<HTMLFormElement>){
    event.preventDefault() ;

    const email = event.currentTarget.email.value as string;
    const password = event.currentTarget.password.value as string;

    const res = await api.post('/sign-up', { email, password });
    if(res && res.status === 200){
      console.log('Redirecting to dashboard...');
      replace('/sign-in');
    }

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>
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
            
          >
            Sign Up
          </button>

        </form>
        <GoogleSignIn />
      </div>
    </div>
  );
}
