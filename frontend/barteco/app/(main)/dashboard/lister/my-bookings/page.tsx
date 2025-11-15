
import Bookings from "@/components/bookings";
import { auth } from "@/auth";
import api from "@/hooks/axiosInstance";
import { CustomSessionUser } from "@/auth.config";
import UserBookingsCalendar from "@/components/user-booking-calender";

export default async function Page() {
  // fetch user bookings 
   const session = await auth();
   const user = session?.user as CustomSessionUser; 

  const response = await api.get('/my-bookings' , {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });

  const allowReviewsOnBookings = true;

  return (
          <>
          <UserBookingsCalendar bookings={response.data} allowReviews={allowReviewsOnBookings} />
          </>
      )
}
