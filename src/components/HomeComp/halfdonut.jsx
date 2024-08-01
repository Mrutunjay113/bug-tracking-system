"use client";

import { useState, useMemo } from "react";
import { TrendingUp } from "lucide-react";
import { Label, LabelList, Pie, PieChart, Sector } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  taskCount: {
    label: "Task",
  },
  open: {
    label: "Open",
    color: "#4285f4",
  },
  "In Progress": {
    label: "Progress",
    color: "#ffab00",
    value: "In Progress",
  },
  "In Review": {
    label: "Review",
    color: "#34a853",
  },
  Closed: {
    label: "Closed",
    color: "#ff4b4b",
  },
  review: {
    label: "review",
    color: "#34a853",
  },
};

export function Donut({ data }) {
  const chartData = [
    { task: "open", taskCount: data?.StatusOpen, fill: "#4285f4" },
    { task: "In Progress", taskCount: data?.StatusProgress, fill: "#ffab00" },
    { task: "In Review", taskCount: data?.StatusReview, fill: "#34a853" },
    { task: "Closed", taskCount: data?.StatusClose, fill: "#ff4b4b" },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const totalTask = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.taskCount, 0);
  }, []);

  const handleClick = (_, index) => {
    setActiveIndex(index);
  };

  return (
    <Card className="flex flex-col w-fit min-w-[300px]">
      <CardHeader className="items-center pb-0">
        <CardTitle>Task Progress</CardTitle>
        <CardDescription>This month</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="taskCount"
              nameKey="task"
              innerRadius={50}
              paddingAngle={1}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({ outerRadius = 0, ...props }) => (
                <Sector
                  {...props}
                  outerRadius={outerRadius + 5}
                  className="transition-all ease-in-out duration-300"
                />
              )}
              onClick={handleClick}
            >
              <LabelList
                dataKey="taskCount"
                className="fill-background font-bold"
                stroke="none"
                fontSize={12}
                formatter={(value) =>
                  `${value > 0 ? value.toLocaleString() : ""}`
                }
              />
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalTask.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total Task
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
            <ChartLegend content={<ChartLegendContent nameKey="task" />} />
          </PieChart>
        </ChartContainer>
        <CardFooter className="flex justify-center mt-4">
          <TrendingUp className="w-5 h-5" />{" "}
          {data?.StatusClose > 0 ? (
            <span className="ml-2 text-muted-foreground">
              We have closed
              <span className="text-gray-600 font-semibold">
                {data?.StatusClose > 0
                  ? ` ${(data?.StatusClose / totalTask) * 100}%   `
                  : " no"}
              </span>
              tasks this month.
            </span>
          ) : (
            "No tasks closed this month."
          )}
        </CardFooter>
      </CardContent>
    </Card>
  );
}
