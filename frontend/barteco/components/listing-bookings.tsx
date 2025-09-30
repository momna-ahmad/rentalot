'use client'

import { useState } from "react";
import { Booking } from "./my-bookings";
import BookingCalendar from "./booking-calender";

export default function ListingBookings({unit , bookings} : { unit : string ,bookings : Booking[]}){
    const [startDateTime, setStartDateTime] = useState<string | null>(null);

    const handleDateSelect = (selectInfo: any) => {
    const start = selectInfo.startStr;
    setStartDateTime(start);
  };

    return (
        <>
        <BookingCalendar unit={unit} onDateSelect={handleDateSelect} bookings={bookings} />
        </>
    )
}