"use client";
import React, { useState } from "react";
import { Donut } from "./halfdonut";

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
    <div className="flex gap-2">
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
    </div>
  );
}
