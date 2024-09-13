"use client";
import { Donut } from "./halfdonut";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { SearchTabs } from "./searchTabs";
import { LineChart2 } from "./LineChart";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function HomeCharts({ data, lineData }) {
  const [selectChartType, setSelectChartType] = useState("task");
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
    <div className="md:grid md:grid-cols-4 grid-cols-2 gap-4">
      <div className="md:w-[400px] h-[400px]">
        <LineChart2 data={lineData} />
      </div>
      <div className="bg-white w-fit h-fit border rounded-md">
        <div className="flex items-center gap-4 justify-center mt-2">
          <h1 className="text-gray-700 font-medium">Select Chart Type</h1>
          <Select value={selectChartType} onValueChange={setSelectChartType}>
            <SelectTrigger
              className="w-[120px] rounded-lg"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="task" className="rounded-lg">
                Task
              </SelectItem>
              <SelectItem value="priority" className="rounded-lg">
                Priority
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {selectChartType === "task" ? (
          <Donut
            data={taskStatusData}
            config={taskStatusConfig}
            title="Task Progress"
            description="This month"
          />
        ) : (
          <Donut
            data={priorityData}
            config={priorityConfig}
            title="Priority Levels"
            description="This month"
          />
        )}
      </div>
      <SearchTabs />
    </div>
  );
}
