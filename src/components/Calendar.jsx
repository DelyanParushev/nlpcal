import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DateTime } from 'luxon';

export default function Calendar({ events }) {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      }}
      initialDate={new Date()}
      firstDay={1}
      weekends={true}
      dayHeaderFormat={{ weekday: 'short' }}
      views={{
        dayGridMonth: {
          titleFormat: { month: 'long', year: 'numeric' },
          showNonCurrentDates: true,
        }
      }}
      events={events.map(e => ({
        title: e.title,
        start: DateTime.fromISO(e.start).toISO(),
        end: e.end ? DateTime.fromISO(e.end).toISO() : undefined,
      }))}
      height="auto"
    />
  );
}
