'use client';

import React, { useState, useEffect, useMemo } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DateSelectArg } from '@fullcalendar/core';
import { Booking } from './bookings';

export default function BookingCalendar({
  unit,
  onDateSelect,
  bookings,
}: {
  unit: string;
  onDateSelect: (arg: DateSelectArg) => void;
  bookings: Booking[];
}) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  /** ✅ Utility: Normalize a date to remove time */
  const normalizeDate = (date: Date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  };

  /** ✅ Check if a date is booked (for day view) */
  const isBookedDay = (date: Date) => {
    return bookings.some((booking) => {
      const start = normalizeDate(new Date(booking.start_date_time));
      const end = normalizeDate(new Date(booking.end_date_time));
      const check = normalizeDate(date);
      return check >= start && check <= end;
    });
  };

  /** ✅ Check if an hour slot is booked (for hour view) */
  const isBookedHour = (date: Date, hour: number) => {
    return bookings.some((booking) => {
      const start = new Date(booking.start_date_time);
      const end = new Date(booking.end_date_time);
      const slotStart = new Date(date);
      slotStart.setHours(hour, 0, 0, 0);
      const slotEnd = new Date(slotStart);
      slotEnd.setHours(hour + 1, 0, 0, 0);
      return slotStart < end && slotEnd > start; // overlapping
    });
  };

  /** ✅ Combine date + time for callback */
  const combineDateAndTime = (date: Date, hour: number) => {
    const combined = new Date(date);
    combined.setHours(hour, 0, 0, 0);
    return combined;
  };

  /** ✅ Fire callback when selected */
  useEffect(() => {
    if (selectedDate && (selectedTime !== null || unit === 'day')) {
      let start = selectedDate;
      let end = selectedDate;

      if (unit === 'hour' && selectedTime !== null) {
        const hour = parseInt(selectedTime, 10);
        start = combineDateAndTime(selectedDate, hour);
        end = combineDateAndTime(selectedDate, hour + 1);
      }

      // Use local time string (not UTC)
      const localISOString = start.toLocaleString('sv-SE').replace(' ', 'T');
      onDateSelect({
        start,
        end,
        startStr: localISOString,
        endStr: localISOString,
        allDay: unit === 'day',
        jsEvent: null as any,
        view: { type: unit } as any,
      });
    }
  }, [selectedDate, selectedTime, unit]);

  /** ✅ Hour slots list */
  const hourSlots = useMemo(() => Array.from({ length: 24 }, (_, i) => i), []);

  return (
    <div className="p-4 border border-gray-200 rounded-xl shadow-sm bg-white space-y-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        {unit === 'day' ? 'Select Date' : 'Select Hourly Slot'}
      </h2>

      {/* ✅ For "day" unit: Calendar Picker */}
      {unit === 'day' && (
        <DatePicker
          selected={selectedDate}
          onChange={(date) => {
            if (date && isBookedDay(date)) {
              alert('This date is already booked.');
              return;
            }
            setSelectedDate(date);
          }}
          inline
          dayClassName={(date) =>
            isBookedDay(date)
              ? 'booked-day bg-red-200 text-gray-500 rounded-md'
              : 'available-day'
          }
        />
      )}

      {/* ✅ For "hour" unit: Hourly slots for selected date */}
      {unit === 'hour' && selectedDate && (
        <div className="space-y-3">
          {/* Inline DatePicker to pick which day’s slots to view */}
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            inline
          />

          <div className="grid grid-cols-4 gap-2 mt-4">
            {hourSlots.map((hour) => {
              const booked = isBookedHour(selectedDate, hour);
              const label = `${hour === 0
                ? 12
                : hour > 12
                ? hour - 12
                : hour
              }:00 ${hour >= 12 ? 'PM' : 'AM'}`;
              return (
                <button
                  key={hour}
                  onClick={() => !booked && setSelectedTime(String(hour))}
                  disabled={booked}
                  className={`px-2 py-2 text-sm rounded-md border transition
                    ${booked
                      ? 'bg-red-200 text-gray-400 cursor-not-allowed'
                      : selectedTime === String(hour)
                      ? 'bg-blue-500 text-white border-blue-600'
                      : 'bg-gray-50 hover:bg-blue-50 border-gray-200'
                    }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center gap-2 mt-3 text-sm text-gray-600">
        <div className="w-4 h-4 bg-red-200 rounded-sm" />
        <span>Booked</span>
      </div>
    </div>
  );
}
