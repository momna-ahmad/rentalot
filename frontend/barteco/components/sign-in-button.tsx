'use client' ;
import Link from 'next/link';
import { cookies } from 'next/headers'
import {useState , useEffect} from 'react';

const SignInButton = () => {
    const [hasSession, setHasSession] = useState(false);
    useEffect(() => {
    const cookies = document.cookie; // returns a string like 'key=value; key2=value2'
    setHasSession(cookies.includes('session='));
  }, []);
    return (
        <>
         {
            hasSession? 
            <Link href="/sign-in" className="text-lg hover:text-gray-700"  >
                Sign In
            </Link> :
            <button className="text-lg hover:text-gray-700" >
                Log out
            </button>

            }
        </>
       
    );
}
export default SignInButton;