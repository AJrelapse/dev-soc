"use client";

import Head from "next/head";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useState, useEffect } from "react";
import { getEventsData } from "./fetch";

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");

  useEffect(() => {
    async function fetchEvents() {
      const eventsData = await getEventsData();
      setEvents(eventsData);
    }
    fetchEvents();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fromDate || !toDate || !eventTitle || !eventDescription) return;

    if (new Date(toDate) < new Date(fromDate)) {
      alert("To Date must be after From Date!");
      return;
    }

    const newEvent = {
      from: fromDate,
      to: toDate,
      title: eventTitle,
      description: eventDescription,
    };

    setEvents([...events, newEvent]);
    setFromDate("");
    setToDate("");
    setEventTitle("");
    setEventDescription("");
  };

  return (
    <>
      <Head>
        <title>Schedule Page</title>
        <meta name="description" content="Your schedule page description" />
      </Head>

      <Breadcrumb pageName="Schedule" />

      <div className="max-w-5xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* From Date & To Date on the same line */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold">From Date</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="font-semibold">To Date</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <input
            type="text"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            placeholder="Event Title"
            required
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <textarea
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            placeholder="Event Description"
            required
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="p-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Add Event
          </button>
        </form>

        {/* Displaying Fetched Events */}
        <div className="mt-6 space-y-4">
          {events.map((event, index) => (
            <div key={index} className="p-4 bg-gray-100 rounded-md shadow">
              <h3 className="text-lg font-semibold">
                {new Date(event.from).toLocaleDateString()} - {new Date(event.to).toLocaleDateString()}
              </h3>
              <h4 className="text-md font-medium">{event.title}</h4>
              <p className="text-gray-700">{event.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CalendarPage;
