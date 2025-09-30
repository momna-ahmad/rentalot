import { auth } from "@/auth";
import MyBookings from "@/components/my-bookings";

export default async function CustomerBookings(){

     // fetch user bookings 
      const session = await auth();
      console.log("session", session);
    
      const res = fetch(`${process.env.NEXT_PUBLIC_API_URL}/customer-bookings`, {
        headers: {
          Authorization: `Bearer ${(session?.user as any).token}`,
        },
      }).then((res) => res.json());
    
    return (
        <>
        <MyBookings bookingsPromise={res}/>
        </>
    )
}