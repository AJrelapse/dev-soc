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

      <div className="mx-auto mt-8 max-w-5xl rounded-lg bg-white p-6 shadow-md transition dark:bg-dark-2">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* From Date & To Date on the same line */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="font-semibold dark:text-gray-200">
                From Date
              </label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                required
                className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-gray-600 dark:bg-dark-3 dark:text-gray-200"
              />
            </div>
            <div>
              <label className="font-semibold dark:text-gray-200">
                To Date
              </label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                required
                className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-gray-600 dark:bg-dark-3 dark:text-gray-200"
              />
            </div>
          </div>

          <input
            type="text"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            placeholder="Event Title"
            required
            className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-gray-600 dark:bg-dark-3 dark:text-gray-200"
          />
          <textarea
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            placeholder="Event Description"
            required
            className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-gray-600 dark:bg-dark-3 dark:text-gray-200"
          />
          <button
            type="submit"
            className="rounded-md bg-primary p-2 text-white transition hover:bg-primary-dark"
          >
            Add Event
          </button>
        </form>

        {/* Displaying Fetched Events */}
        <div className="mt-6 space-y-4">
          {events.map((event, index) => (
            <div
              key={index}
              className="rounded-md bg-gray-100 p-4 shadow dark:bg-dark-3 dark:text-gray-200"
            >
              <h3 className="text-lg font-semibold">
                {new Date(event.from).toLocaleDateString()} -{" "}
                {new Date(event.to).toLocaleDateString()}
              </h3>
              <h4 className="text-md font-medium">{event.title}</h4>
              <p className="text-gray-700 dark:text-gray-300">
                {event.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CalendarPage;
