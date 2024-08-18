"use client";
import { Donut } from "./halfdonut";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { Avatar } from "@nextui-org/avatar";
import { CircleAlert, CircleCheck } from "lucide-react";
import { Input } from "../ui/input";
import { SearchTabs } from "./searchTabs";
import { Suspense } from "react";

const taskStatusConfig = {
  Open: {
    label: "Open",
    color: "#4285f4",
  },
  Progress: {
    label: "Progress",
    color: "#ffab00",
  },
  Review: {
    label: "Review",
    color: "#34a853",
  },
  Closed: {
    label: "Closed",
    color: "#ff4b4b",
  },
};

const priorityConfig = {
  high: {
    label: "high",
    color: "#ff4b4b",
  },
  medium: {
    label: "medium",
    color: "#ffab00",
  },
  low: {
    label: "low",
    color: "#34a853",
  },
};

export default function HomeCharts({ data }) {
  const taskStatusData = {
    Open: data.StatusOpen || 0,
    Progress: data.StatusProgress || 0,
    Review: data.StatusReview || 0,
    Closed: data.StatusClose || 0,
  };
  const priorityData = {
    high: data.Priority ? data.Priority.high : 0,
    medium: data.Priority ? data.Priority.medium : 0,
    low: data.Priority ? data.Priority.low : 0,
  };

  return (
    <div className="md:flex md:gap-2 md:space-y-0 space-y-2">
      <Donut
        data={taskStatusData}
        config={taskStatusConfig}
        title="Task Progress"
        description="This month"
      />
      <Donut
        data={priorityData}
        config={priorityConfig}
        title="Priority Levels"
        description="This month"
      />
      <div className=" md:w-[300px] ">
        <SearchTabs />
      </div>
    </div>
  );
}
