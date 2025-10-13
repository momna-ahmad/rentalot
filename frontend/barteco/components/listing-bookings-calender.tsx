'use client';

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Bookings, { Booking } from './bookings';
import { format, isSameDay } from 'date-fns';

export default function ListingBookingsCalendar({ bookings }: { bookings: Booking[] }) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // ✅ Find bookings for a date
  const getBookingsForDate = (date: Date) => {
    return bookings.filter((b) => {
      const start = new Date(b.start_date_time);
      const end = new Date(b.end_date_time);
      const startOfDay = new Date(start.setHours(0, 0, 0, 0));
      const endOfDay = new Date(end.setHours(23, 59, 59, 999));
      return date >= startOfDay && date <= endOfDay;
    });
  };

  // ✅ Highlight booked dates in the calendar
  const highlightWithRanges = bookings.map((b) => ({
    "react-datepicker__day--highlighted": {
      "start": new Date(b.start_date_time),
      "end": new Date(b.end_date_time)
    }
  }));

  const selectedBookings =
    selectedDate && getBookingsForDate(selectedDate).length > 0
      ? getBookingsForDate(selectedDate)
      : [];

  return (
    <div className="p-8 max-w-6xl mx-auto bg-white border border-gray-200 rounded-lg">

      <div className="flex justify-center">
        <div className="text-xl scale-125">
          <DatePicker
            selected={selectedDate}
            onChange={(date: Date | null) => setSelectedDate(date)}
            inline
            highlightDates={bookings.map((b) => new Date(b.start_date_time))}
            dayClassName={(date: Date) =>
              getBookingsForDate(date).length > 0 ? 'bg-red-100 text-red-700 rounded' : ''
            }
            calendarClassName="!scale-100"
            wrapperClassName="w-full"
          />
        </div>
      </div>

      {/* Selected Day Bookings */}
      {selectedBookings.length > 0 && (
        
        <div className="mt-8 border-t pt-6">
          <Bookings bookings={selectedBookings} />
        </div>
      )}
    </div>
  );
}