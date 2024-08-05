"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar"; // Ensure this path is correct

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

export function CalendarDemo() {
  const [date, setDate] = React.useState(new Date());

  // Check if a given date is an issue date
  const isIssueDate = (date) => {
    const dateString = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    return issues.some(
      (issue) =>
        new Date(issue.createdAt).toISOString().split("T")[0] === dateString
    );
  };

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border bg-white"
    />
  );
}
