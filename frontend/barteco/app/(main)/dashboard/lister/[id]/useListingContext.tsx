'use client'
 
import { createContext } from 'react'

interface Listing{
    id: number
    title: string ,
    description : string ,
    price : number ,
    unit : string ,
    category : string
}
export const ListingContext = createContext<Listing | null>(null);
 
export default function ListingProvider({
  children,
  value,
}: {
  children: React.ReactNode,
  value: Listing;
}) {
  return <ListingContext.Provider value={value} >{children}</ListingContext.Provider>
}