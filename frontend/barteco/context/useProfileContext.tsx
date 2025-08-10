'use client'
 
import { createContext } from 'react'

interface Profile{
    profile: string , 
    name : string , 
    phone : string ,
    about : string ,

}

export const ProfileContext = createContext<Profile | null>(null);
 
export default function ProfileProvider({
  children,
  value,
}: {
  children: React.ReactNode,
  value: Profile;
}) {
  return <ProfileContext.Provider value={value} >{children}</ProfileContext.Provider>
}