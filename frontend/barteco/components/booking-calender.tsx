'use client';

import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DateSelectArg , DateSpanApi } from '@fullcalendar/core';
import { Booking } from './my-bookings';

export default function BookingCalendar({
  unit,
  onDateSelect,
  bookings,
}: {
  unit: string;
  onDateSelect: (arg: DateSelectArg) => void;
  bookings: Booking[];
}) {
  const initialView = unit === 'day' ? 'dayGridMonth' : 'timeGridWeek';

  // Background events for time-based views
  const calendarEvents = bookings.map((booking) => ({
    start: booking.start_date_time,
    end: booking.end_date_time,
    display: 'background',
    classNames: ['bg-red-500/20'], // Tailwind styling
  }));

  // Disable selection over booked ranges
  const isSelectionAllowed = (selectInfo: DateSpanApi) => {
    const selectedStart = selectInfo.start;
    const selectedEnd = selectInfo.end;

    return !bookings.some((booking) => {
      const bookingStart = new Date(booking.start_date_time);
      const bookingEnd = new Date(booking.end_date_time);
      return selectedStart < bookingEnd && selectedEnd > bookingStart;
    });
  };

  // Apply red background to fully booked *days* in `dayGridMonth`
  const getDayCellClasses = (arg: any) => {
    const viewType = arg.view.type;

    if (viewType !== 'dayGridMonth') return [];

    const date = arg.date;

    const isBooked = bookings.some((booking) => {
      const start = new Date(booking.start_date_time);
      const end = new Date(booking.end_date_time);

      const normalizedDate = new Date(date);
      normalizedDate.setHours(0, 0, 0, 0);

      const normalizedStart = new Date(start);
      normalizedStart.setHours(0, 0, 0, 0);

      const normalizedEnd = new Date(end);
      normalizedEnd.setHours(0, 0, 0, 0);

      return normalizedDate >= normalizedStart && normalizedDate < normalizedEnd;
    });

    return isBooked ? ['bg-red-500/20'] : [];
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView={initialView}
      selectable={true}
      select={onDateSelect}
      selectAllow={isSelectionAllowed}
      events={calendarEvents}
      eventClassNames={(arg) =>
        arg.event.display === 'background' ? ['bg-red-500/20'] : []
      }
      dayCellClassNames={getDayCellClasses}
      slotDuration="01:00:00"
      slotLabelFormat={{
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }}
      height="auto"
    />
  );
}
