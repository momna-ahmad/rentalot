import supabase from "@/lib/supabase-client"


export default function GoogleSignIn(){
    return (
        <>
        <button onClick={async ()=>{
             const res = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/auth/next-login`, // <- your custom handler
                },
            });
        }}>
            Sign In with Google
        </button>
        </>
    )
}