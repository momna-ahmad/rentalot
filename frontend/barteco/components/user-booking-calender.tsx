'use client';

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Bookings, { Booking } from './bookings';

interface UserBookingsCalendarProps {
    bookings: Booking[];
    allowReviews: boolean;
}

export default function UserBookingsCalendar({ bookings, allowReviews }: UserBookingsCalendarProps) {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    // Find bookings for a date
    const getBookingsForDate = (date: Date) => {
        return bookings.filter((b) => {
            const start = new Date(b.start_date_time);
            const end = new Date(b.end_date_time);
            const startOfDay = new Date(start.setHours(0, 0, 0, 0));
            const endOfDay = new Date(end.setHours(23, 59, 59, 999));
            return date >= startOfDay && date <= endOfDay;
        });
    };

    const selectedBookings =
        selectedDate && getBookingsForDate(selectedDate).length > 0
            ? getBookingsForDate(selectedDate)
            : [];

    return (
        <div className="p-8 max-w-6xl mx-auto bg-white rounded-xl shadow-2xl border border-gray-100">
            
            <div className="flex gap-10 items-start"> 

                {/* Calendar Section (Left Side) */}
                <div className="flex-shrink-0 p-4 rounded-lg bg-gray-50 border border-gray-200">
                    <h3 className="text-lg font-semibold mb-4 text-gray-700">Available Dates</h3>
                    <div className="text-lg scale-110">
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date: Date | null) => setSelectedDate(date)}
                            inline
                            highlightDates={bookings.map((b) => new Date(b.start_date_time))}
                            dayClassName={(date: Date) =>
                                getBookingsForDate(date).length > 0 ? 'bg-red-50 text-red-700 font-bold rounded-full border border-red-200' : ''
                            }
                            calendarClassName="!scale-100"
                            wrapperClassName="w-full"
                        />
                    </div>
                </div>

                {/* Selected Day Bookings (Right Side) - Detail Panel */}
                <div className="flex-grow pt-4"> 
                    <h3 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">
                        Booking Details
                    </h3>

                    {/* Display Bookings if selected */}
                    {selectedBookings.length > 0 ? (
                        <div className="py-2"> 
                            <Bookings 
                                bookings={selectedBookings} 
                                allowReviews={allowReviews}
                            />
                        </div>
                    ) : (
                        <div className="mt-8 p-10 text-center text-gray-500 bg-white border border-dashed border-gray-300 rounded-lg h-48 flex items-center justify-center">
                            <p className="text-md italic">
                                Select a date from the calendar to view associated bookings.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}