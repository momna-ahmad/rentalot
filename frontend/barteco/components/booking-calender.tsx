'use client';

import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DateSelectArg } from '@fullcalendar/core'; // ✅ Import correct type


export default function BookingCalendar({
  unit,
  onDateSelect,
}: {
  unit: string;
  onDateSelect: (arg: DateSelectArg) => void; // ✅ Correct type
}) {
  const initialView = unit === 'day' ? 'dayGridMonth' : 'timeGridWeek';

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView={initialView}
      selectable={true}
      select={onDateSelect} // ✅ Now type-safe
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
