import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DateTime } from 'luxon';
import '../calendar.css';

export default function Calendar({ events }) {
  const renderEventContent = (eventInfo) => {
    return (
      <div className="flex flex-col h-full justify-between p-1">
        <div className="line-clamp-2">{eventInfo.event.title}</div>
        <div className="text-xs mt-1">
          {eventInfo.timeText}
        </div>
      </div>
    );
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      }}
      events={events.map(e => ({
        title: e.title,
        start: DateTime.fromISO(e.start).toISO(),
        end: e.end ? DateTime.fromISO(e.end).toISO() : undefined
      }))}
      height="auto"
      eventContent={renderEventContent}
    />
  );
}
