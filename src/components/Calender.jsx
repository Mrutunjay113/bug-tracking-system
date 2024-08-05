"use client";
import React, { useState } from "react";
import { Calendar } from "@nextui-org/react";
import { today, getLocalTimeZone } from "@internationalized/date";

const issues = [
  {
    _id: "66ac980dfdfa3f3c079a9918",
    title: "change background color",
    description: "change bg color to gray",
    priority: "medium",
    image: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/2.png",
    type: "improvement",
    status: "Open",
    issueType: "UI/UX",
    dueDate: "Fri Aug 09 2024 05:30:00 GMT+0530 (India Standard Time)",
    createdAt: "2024-08-02T08:25:49.927Z",
    updatedAt: "2024-08-02T08:25:49.927Z",
    team: "sherrrrrrrrrrr",
    assignedTo: [
      {
        name: "Jayant Singh",
        image: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/2.png",
      },
    ],
  },
  // Add more issues if needed
];

export default function SimpleCalendar() {
  let defaultDate = today(getLocalTimeZone());
  let [focusedDate, setFocusedDate] = useState(defaultDate);
  let [selectedDate, setSelectedDate] = useState(defaultDate);

  const isIssueDate = (date) => {
    const dateString = `${date.year}-${String(date.month).padStart(
      2,
      "0"
    )}-${String(date.day).padStart(2, "0")}`;
    return issues.some(
      (issue) =>
        new Date(issue.createdAt).toISOString().split("T")[0] === dateString
    );
  };

  return (
    <Calendar
      aria-label="Date (Controlled Focused Value)"
      focusedValue={focusedDate}
      value={selectedDate}
      onFocusChange={setFocusedDate}
      showMonthAndYearPickers
      onChange={(date) => setSelectedDate(date)}
      
      classNames={{
        base: "rounded-lg",
        day: "relative",
        dayActive: "bg-primary-500 text-white",
        dayDisabled: "text-gray-400",
        dayToday: "bg-primary-500 text-white",
        daySelected: "bg-primary-500 text-white",
        dayRange: "bg-primary-500 text-white",
        dayStart: "bg-primary-500 text-white",
        content: "text-gray-700 bg-background",
        title: "text-primary-500",
        cellButton: ["data-[issue-date=true]:bg-yellow-100"],
      }}
      showShadow
    />
  );
}
