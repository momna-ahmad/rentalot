import { auth } from "@/auth";
import UserBookingsCalendar from "@/components/user-booking-calender";
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

      const allowReviewsOnBookings = false;
    return (
        <>
        <UserBookingsCalendar bookings={res.data}  allowReviews={allowReviewsOnBookings} />
        </>
    )
}