"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar"; // Ensure this path is correct
import { select } from "@nextui-org/react";

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
    dueDate: "Sat Aug 11 2024 21:45:29 GMT+0530 (India Standard Time)",
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
  {
    _id: "66ac980dfdfa3f3c079a99232",
    title: "changecolor",
    description: "change to gray",
    priority: "medium",
    image: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/2.png",
    type: "improvement",
    status: "Open",
    issueType: "UI/UX",
    dueDate: "Sat Aug 12 2024 21:45:29 GMT+0530 (India Standard Time)",
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
  // Convert issue due dates to Date objects and create modifiers
  // Convert issue due dates to Date objects and create modifiers
  const dueDates = issues.map((issue) => new Date(issue.dueDate));
  const modifiers = {};
  dueDates.forEach((dueDate) => {
    modifiers[`dueDate-${dueDate}`] = {
      days: [dueDate],
    };
  });

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      modifiers={modifiers}
      modifiersClassNames={{
        [`dueDate-${dueDates[0].toISOString().split("T")[0]}`]: "bg-red-400",
        [`dueDate-${dueDates[1].toISOString().split("T")[0]}`]: "bg-blue-400",
        // Add additional styles for other due dates as needed
      }}
    />
  );
}
