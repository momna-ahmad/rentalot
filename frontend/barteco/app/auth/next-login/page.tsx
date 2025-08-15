'use client'

import { useEffect , useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'



export default function NextLogin() {
  const router = useRouter();

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const doLogin = async () => {
      const hash = window.location.hash
      if (!hash) return

      const params = new URLSearchParams(hash.substring(1))
      const access_token = params.get('access_token')
      const refresh_token = params.get('refresh_token')

      console.log(access_token) ;
      if (access_token && refresh_token) {
        await supabase.auth.setSession({ access_token, refresh_token })

        // ✅ Call your route handler 
        const res =
         await fetch('/api', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: access_token }),
        })

        if (res.ok) {
            console.log('✅ Signed in successfully');
            // 3. Redirect to dashboard or wherever you want
            router.push('/dashboard/lister');
          } else {
            console.error('Failed to sign in via API route');
          } 

    }
  }

    doLogin()
  
  }, [])


  
  return (
    <>
    <p>Logging you in...</p>
    </>
    
  ) 
}
