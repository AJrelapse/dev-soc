"use client";

import React, { useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

export default function AttendanceTracker() {
  const [attendance, setAttendance] = useState({ eventName: "Workshop Series", total: 9, attended: 3 });

  const attendancePercentage = (attendance.attended / attendance.total) * 100;

  return (
    <div>
      <Breadcrumb pageName="Attendance Tracker" />

      <div className="col-span-12 xl:col-span-5">
        <div className="p-6 bg-white rounded-lg shadow-md dark:bg-dark-2 flex justify-between items-center">
          <div className="text-left">
            <h2 className="text-lg font-bold mb-4">Attendance Tracker</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-2">Event: {attendance.eventName}</p>
            <p className="text-gray-700 dark:text-gray-300 mb-2">Total Events: {attendance.total}</p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">Events Attended: {attendance.attended}</p>
          </div>
          <div style={{ width: 120, height: 120 }}>
            <CircularProgressbar
              value={attendancePercentage}
              text={`${Math.round(attendancePercentage)}%`}
              styles={buildStyles({
                textColor: "#000",
                pathColor: attendancePercentage >= 75 ? "#4caf50" : "#f44336",
                trailColor: "#d6d6d6",
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
