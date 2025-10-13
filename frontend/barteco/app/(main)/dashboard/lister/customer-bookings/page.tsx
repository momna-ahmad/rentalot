import { auth } from "@/auth";
import ListingBookingsCalendar from "@/components/listing-bookings-calender";
import api from "@/hooks/axiosInstance";
import { CustomSessionUser } from "@/auth.config";

export default async function CustomerBookings(){

     // fetch user bookings 
      const session = await auth();
        const user = session?.user as CustomSessionUser;

      console.log("session", session);
    
      const res = await api.get('/customer-bookings', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      console.log('customer bookings ' , res.data) ;
    return (
        <>
        <ListingBookingsCalendar bookings={res.data}/>
        </>
    )
}