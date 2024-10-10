"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import { Line, LineChart } from "recharts";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TrendingUp } from "lucide-react";
import { Close } from "@radix-ui/react-popover";
import { Divider } from "@nextui-org/react";

const chartConfig = {
  // Counts: {
  //   label: "counts",
  // },
  // Created: {
  //   label: "Created",
  //   color: "#60a5fa",
  // },
  // Resolved: {
  //   label: "Resolved",
  //   color: "#0D47A1",
  // },
  // "In Progress": {
  //   label: "In Progress",
  //   color: "#FBBF24",
  // },
  Open: {
    label: "Open",
    color: "#2563EB",
  },
  Closed: { label: "Closed", color: "#E21D48" },
  // "In Review": { label: "In Review", color: "#2A9D90" },
};

export function LineChartComp({ data }) {
  console.log(`line`, data);
  const [timeRange, setTimeRange] = React.useState("90d");
  const filteredData = data.filter((item) => {
    const date = new Date(item.date);
    const now = new Date();
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    now.setDate(now.getDate() - daysToSubtract);
    return date >= now;
  });
  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Area Chart - Created VS CLOSED</CardTitle>
          <CardDescription>
            Showing total Counts for the last <strong>{timeRange}</strong>
          </CardDescription>
        </div>
        <div className="flex items-center mr-5  gap-2 ">
          <span className="text-blue-600 text-xl font-medium uppercase">
            Open -{" "}
            <strong>
              {filteredData.reduce((acc, curr) => acc + curr.Open, 0)}{" "}
            </strong>{" "}
          </span>{" "}
          <div className="w-0.5 h-8 mx-5 bg-slate-600 "></div>
          <span className="text-red-600 text-xl font-medium uppercase">
            Closed: {filteredData.reduce((acc, curr) => acc + curr.Closed, 0)}
          </span>
        </div>

        <Select value={timeRange} onValueChange={setTimeRange}>
          {" "}
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillOpen" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-Open)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-Open)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillClosed" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-Closed)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-Closed)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={true}
              axisLine={false}
              tickMargin={10}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="Closed"
              type="natural"
              fill="url(#fillClosed)"
              stroke="var(--color-Closed)"
              stackId="a"
            />
            <Area
              dataKey="Open"
              type="natural"
              fill="url(#fillOpen)"
              stroke="var(--color-Open)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

const chartData2 = [
  { month: "January", Created: 186, Resolved: 80 },
  { month: "February", Created: 305, Resolved: 200 },
  { month: "March", Created: 237, Resolved: 120 },
  { month: "April", Created: 73, Resolved: 190 },
  { month: "May", Created: 209, Resolved: 130 },
  { month: "June", Created: 214, Resolved: 140 },
  { month: "July", Created: 160, Resolved: 100 },
  { month: "August", Created: 280, Resolved: 200 },
  { month: "September", Created: 180, Resolved: 150 },
  { month: "October", Created: 120, Resolved: 100 },
  { month: "November", Created: 220, Resolved: 150 },
  { month: "December", Created: 160, Resolved: 100 },
];

const chartConfig2 = {
  createdAtCount: {
    label: "Created",
    color: "#2A9D90", // Adjust color as needed
  },
  closedCount: {
    label: "Closed",
    color: "#E21D48", // Adjust color as needed
  },
};
export function LineChart2({ data, showLabel }) {
  // console.log(`line`, data);
  const transformData = (data) => {
    // Convert the object into an array of objects for the line chart
    // date in ascending order for the line chart

    return Object.entries(data).map(([date, counts]) => ({
      date: new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }), // Format date
      createdAtCount: counts?.createdAtCount,
      closedCount: counts?.closedCount,
    }));
  };
  // Transform data before passing to the chart
  const transformedData = transformData(data);

  return (
    <Card className="flex flex-col min-w-40  min-h-[200px] h-full">
      <CardHeader>
        <CardTitle>Line Chart</CardTitle>
        {/* <CardDescription>This month</CardDescription> */}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig2} className=" ">
          <LineChart
            accessibilityLayer
            data={transformedData}
            margin={{
              left: 12,
              right: 12,
              top: 12,
            }}
          >
            {" "}
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 7)} // Adjust formatting if needed
            />
            {showLabel && (
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => (value % 2 === 0 ? value : "")} // Adjust formatting if needed
                label={{
                  value: "Count",
                  angle: -90,
                  position: "insideLeft",
                  offset: 12,
                }}
              />
            )}
            <ChartLegend content={<ChartLegendContent />} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            {Object.keys(chartConfig2).map((key) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={chartConfig2[key].color}
                strokeWidth={2}
                dot={false}
              ></Line>
            ))}
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start mt-2 gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  );
}
