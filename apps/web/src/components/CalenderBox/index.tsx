"use client";

import { useState } from "react";

const CalendarBox = () => {
  const [events, setEvents] = useState([
    { name: "Meeting", start: 1, end: 1, color: "bg-blue-500" },
    { name: "App Design", start: 25, end: 27, color: "bg-green-500" },
    { name: "Frontend", start: 5, end: 9, color: "bg-red-500" },
  ]);

  const handleDateClick = (date: number) => {
    const dayEvents = events.filter((e) => date >= e.start && date <= e.end);
    alert(`Events on ${date}: ${dayEvents.length ? dayEvents.map((e) => e.name).join(", ") : "No events"}`);
  };

  const daysInMonth = 30; // Assuming a 30-day month

  return (
    <div className="relative w-full max-w-full rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card p-4">
      <div className="relative">
        <table className="w-full">
          <thead>
            <tr className="grid grid-cols-7 rounded-t-[10px] bg-primary text-white">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
                <th key={index} className="h-15 p-2 text-body-xs font-medium sm:text-base">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, row) => (
              <tr key={row} className="grid grid-cols-7 relative">
                {[...Array(7)].map((_, col) => {
                  const day = row * 7 + col + 1;
                  if (day > daysInMonth) return <td key={day} className="border"></td>;

                  return (
                    <td
                      key={day}
                      className="relative h-20 cursor-pointer border border-stroke p-2 transition hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2"
                      onClick={() => handleDateClick(day)}
                    >
                      <span className="font-medium text-dark dark:text-white">{day}</span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Event bars inside the calendar */}
        {events.map((event, idx) => {
          const startCol = (event.start - 1) % 7;
          const rowStart = Math.floor((event.start - 1) / 7);
          const rowEnd = Math.floor((event.end - 1) / 7);
          const eventWidth = ((event.end - event.start + 1) * 100) / 7;

          // For events that span multiple rows, we need to render them in separate divs
          return (
            <>
              {/* Render first part of the event (in the first row) */}
              {rowStart === rowEnd ? (
                <div
                  key={idx}
                  className={`absolute ${event.color} text-white px-2 py-1 text-xs rounded-md`}
                  style={{
                    top: `calc(${rowStart * 80 + 100}px)`, // Adjusting for top position
                    left: `${(startCol * 100) / 7}%`, // Adjust for the column
                    width: `${eventWidth}%`,
                  }}
                >
                  {event.name}
                </div>
              ) : (
                <>
                  {/* First part of the event on the starting row */}
                  <div
                    key={`${idx}-start`}
                    className={`absolute ${event.color} text-white px-2 py-1 text-xs rounded-md`}
                    style={{
                      top: `calc(${rowStart * 80 + 100}px)`,
                      left: `${(startCol * 100) / 7}%`,
                      width: `${((7 - startCol) * 100) / 7}%`, // Adjust width based on start column
                    }}
                  >
                    {event.name}
                  </div>

                  {/* Second part of the event on the next row */}
                  <div
                    key={`${idx}-end`}
                    className={`absolute ${event.color} text-white px-2 py-1 text-xs rounded-md`}
                    style={{
                      top: `calc(${(rowEnd) * 80 + 100}px)`, // Adjust for the next row
                      left: `0%`,
                      width: `${(event.end % 7) * 100 / 7}%`, // Adjust width for the second row
                    }}
                  >
                    {event.name}
                  </div>
                </>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarBox;
