'use client'

import { useState } from "react" ;
import { useRouter } from 'next/navigation';
import api from "@/hooks/axiosInstance";
import { useHandleInboxChange } from "./inbox-users";
import { useSession } from 'next-auth/react';
import { CustomSessionUser } from "@/auth.config";

export default function ContactOwner({ ownerId }: { ownerId: string }) {
    const {replace} = useRouter();
    const handleInboxChange = useHandleInboxChange(); // use custom hook
    const { data: session } = useSession();
      const user = session?.user as CustomSessionUser;
    

    async function handleContactOwner() {
        //fetch owner info and set selected

        const res = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/inbox/${ownerId}` ,
            {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
        ) ;
        
        const inbox = res.data ;
        
        handleInboxChange(inbox)(); //invoke returned function
        // Redirect to inbox or open chat window
        replace('/dashboard/inbox');
    }
    return(
        <>
        <button
        onClick={handleContactOwner}
        className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition">
            Contact owner
        </button>
        </>
    )
}