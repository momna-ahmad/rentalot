import { auth } from "@/auth";
import ListingBookingsCalendar from "@/components/listing-bookings-calender";
import api from "@/hooks/axiosInstance";

export default async function CustomerBookings(){

     // fetch user bookings 
      const session = await auth();
      console.log("session", session);
    
      const res = await api.get('/customer-bookings', {
        headers: {
          Authorization: `Bearer ${(session?.user as any).token}`,
        },
      });

      console.log('customer bookings ' , res.data) ;
    return (
        <>
        <ListingBookingsCalendar bookings={res.data}/>
        </>
    )
}