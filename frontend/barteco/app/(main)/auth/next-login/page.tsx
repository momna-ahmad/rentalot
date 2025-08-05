'use client'

import { useEffect , useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import { handleSupabaseLogin } from '@/lib/action'

export default function NextLogin() {
   const formRef = useRef<HTMLFormElement>(null) ;
  const router = useRouter()

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

        // Populate form input and submit
        const input = document.createElement('input')
        input.type = 'hidden'
        input.name = 'token'
        input.value = access_token
        formRef.current?.appendChild(input)

        formRef.current?.requestSubmit();
    }
  }

    doLogin()
  
  }, [])


  
  return (
    <>
    <form ref={formRef} action={handleSupabaseLogin} />
    <p>Logging you in...</p>
    </>
    
  ) 
}
