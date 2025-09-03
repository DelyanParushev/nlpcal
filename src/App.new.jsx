import React, { useState, useEffect } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { DateTime } from "luxon";
import AddEventForm from "./components/AddEventForm";
import "@material-design-icons/font";
import "./App.css";

const API_BASE = import.meta.env.VITE_API_BASE;

function App() {
  const [events, setEvents] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    fetchEvents();
    
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialDarkMode = savedTheme === 'dark' || (savedTheme === null && prefersDark);
    
    setIsDarkMode(initialDarkMode);
    if (initialDarkMode) {
      document.documentElement.classList.add('dark');
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (localStorage.getItem('theme') === null) {
        setIsDarkMode(e.matches);
        if (e.matches) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${API_BASE}/events`);
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ease-in-out ${isDarkMode ? "dark" : ""} bg-[color:var(--md-sys-color-surface)]`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <header className="flex justify-between items-center mb-8 relative">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 text-[color:var(--md-sys-color-on-surface-variant)]">
              <span className="material-icons text-3xl text-[color:var(--md-sys-color-primary)]">calendar_today</span>
              <h1 className="text-4xl font-medium transition-colors duration-200">AI Calendar</h1>
            </div>
          </div>
          <button
            onClick={toggleDarkMode}
            className="rounded-full p-3 transition-all duration-200 bg-[color:var(--md-sys-color-surface-container-highest)] text-[color:var(--md-sys-color-on-surface-variant)] hover:bg-[color:var(--md-sys-color-surface-container-high)] shadow-level-1 hover:shadow-level-2 focus:ring-2 focus:ring-[color:var(--md-sys-color-primary)] focus:ring-opacity-20 outline-none"
            aria-label="Toggle dark mode"
          >
            <span className="material-icons text-2xl">
              {isDarkMode ? "light_mode" : "dark_mode"}
            </span>
          </button>
        </header>

        <div className="space-y-8">
          <div className="overflow-hidden rounded-3xl shadow-level-2 bg-[color:var(--md-sys-color-surface-container)] border border-[color:var(--md-sys-color-outline)] transition-all duration-200 hover:shadow-level-4">
            <div className="p-8">
              <AddEventForm onSaved={fetchEvents} />
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl shadow-level-2 bg-[color:var(--md-sys-color-surface-container)] border border-[color:var(--md-sys-color-outline)] transition-all duration-200 hover:shadow-level-4">
            <div className="p-8">
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                events={events.map((e) => ({
                  title: e.title,
                  start: DateTime.fromISO(e.start).toISO(),
                  end: e.end ? DateTime.fromISO(e.end).toISO() : undefined,
                  className: "animate-fade-in"
                }))}
                height="auto"
                themeSystem="standard"
                dayMaxEvents={true}
                eventDisplay="block"
                eventBackgroundColor="var(--md-sys-color-primary)"
                eventBorderColor="var(--md-sys-color-primary)"
                eventTextColor="var(--md-sys-color-on-primary)"
                dayCellClassNames="rounded-lg transition-colors duration-200 bg-[color:var(--md-sys-color-surface-container-highest)] text-[color:var(--md-sys-color-on-surface)] hover:bg-[color:var(--md-sys-color-surface-container-high)]"
                dayHeaderClassNames="font-medium text-[color:var(--md-sys-color-on-surface-variant)]"
                viewClassNames="bg-[color:var(--md-sys-color-surface-container-highest)] text-[color:var(--md-sys-color-on-surface)]"
                buttonClassNames={{
                  today: "rounded-full px-4 py-2 transition-colors duration-200 bg-[color:var(--md-sys-color-tertiary)] text-[color:var(--md-sys-color-on-tertiary)] hover:bg-[color:var(--md-sys-color-tertiary-container)] hover:text-[color:var(--md-sys-color-on-tertiary-container)]",
                  prev: "rounded-full p-2 transition-colors duration-200 text-[color:var(--md-sys-color-on-surface)] hover:bg-[color:var(--md-sys-color-surface-container-high)]",
                  next: "rounded-full p-2 transition-colors duration-200 text-[color:var(--md-sys-color-on-surface)] hover:bg-[color:var(--md-sys-color-surface-container-high)]"
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
