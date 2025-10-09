'use client'
import Link from "next/link";
import { usePathname , useRouter } from "next/navigation"

export default function SwitchProfiles(){
    const path = usePathname() ;
      const router = useRouter()

    const navigateToBrowsing =( )=>{
        //router.replace('/dashboard/customer')
        router.replace('/')
    }

    const navigateToDashboard =( )=>{
        router.replace('/dashboard/lister') ;
    }

    return (
        <>
        {
            path.includes('/lister') ? 
             
            <button onClick={navigateToBrowsing}>
                Switch to browsing
            </button>

            :
            
            <button onClick={navigateToDashboard}>
                Switch to listing
            </button>
            
        }
        <button>
            
        </button>
        </>
    )
}