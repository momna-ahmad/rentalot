'use client' ;
import { useAuth } from "@/app/useAuth";
import Link from 'next/link';

const SignInButton = () => {
    const { isAuthenticated , logout } = useAuth();

    return (
        <>
         {
            isAuthenticated == null || isAuthenticated == false ? 
            <Link href="/sign-in" className="text-lg hover:text-gray-700"  >
                Sign In
            </Link> :
            <button className="text-lg hover:text-gray-700" onClick={logout}>
                Log out
            </button>

            }
        </>
       
    );
}
export default SignInButton;