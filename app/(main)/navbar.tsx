
import './globals.css';
import SignInButton from './sign-in-button';

export default function Navbar() {

    return(
        <div className="flex items-center justify-between p-4 bg-green-color text-black">
            <div className="font-bold text-2xl">
                Rentalot.
            </div>
            <SignInButton>
            </SignInButton>
            
            
        </div>
    )
}