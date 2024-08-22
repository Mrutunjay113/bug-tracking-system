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
const chartData = [
  { date: "2024-04-01", Created: 222, Resolved: 150 },
  { date: "2024-04-02", Created: 97, Resolved: 180 },
  { date: "2024-04-03", Created: 167, Resolved: 120 },
  { date: "2024-04-04", Created: 242, Resolved: 260 },
  { date: "2024-04-05", Created: 373, Resolved: 290 },
  { date: "2024-04-06", Created: 301, Resolved: 340 },
  { date: "2024-04-07", Created: 245, Resolved: 180 },
  { date: "2024-04-08", Created: 409, Resolved: 320 },
  { date: "2024-04-09", Created: 59, Resolved: 110 },
  { date: "2024-04-10", Created: 261, Resolved: 190 },
  { date: "2024-04-11", Created: 327, Resolved: 350 },
  { date: "2024-04-12", Created: 292, Resolved: 210 },
  { date: "2024-04-13", Created: 342, Resolved: 380 },
  { date: "2024-04-14", Created: 137, Resolved: 220 },
  { date: "2024-04-15", Created: 120, Resolved: 170 },
  { date: "2024-04-16", Created: 138, Resolved: 190 },
  { date: "2024-04-17", Created: 446, Resolved: 360 },
  { date: "2024-04-18", Created: 364, Resolved: 410 },
  { date: "2024-04-19", Created: 243, Resolved: 180 },
  { date: "2024-04-20", Created: 89, Resolved: 150 },
  { date: "2024-04-21", Created: 137, Resolved: 200 },
  { date: "2024-04-22", Created: 224, Resolved: 170 },
  { date: "2024-04-23", Created: 138, Resolved: 230 },
  { date: "2024-04-24", Created: 387, Resolved: 290 },
  { date: "2024-04-25", Created: 215, Resolved: 250 },
  { date: "2024-04-26", Created: 75, Resolved: 130 },
  { date: "2024-04-27", Created: 383, Resolved: 420 },
  { date: "2024-04-28", Created: 122, Resolved: 180 },
  { date: "2024-04-29", Created: 315, Resolved: 240 },
  { date: "2024-04-30", Created: 454, Resolved: 380 },
  { date: "2024-05-01", Created: 165, Resolved: 220 },
  { date: "2024-05-02", Created: 293, Resolved: 310 },
  { date: "2024-05-03", Created: 247, Resolved: 190 },
  { date: "2024-05-04", Created: 385, Resolved: 420 },
  { date: "2024-05-05", Created: 481, Resolved: 390 },
  { date: "2024-05-06", Created: 498, Resolved: 520 },
  { date: "2024-05-07", Created: 388, Resolved: 300 },
  { date: "2024-05-08", Created: 149, Resolved: 210 },
  { date: "2024-05-09", Created: 227, Resolved: 180 },
  { date: "2024-05-10", Created: 293, Resolved: 330 },
  { date: "2024-05-11", Created: 335, Resolved: 270 },
  { date: "2024-05-12", Created: 197, Resolved: 240 },
  { date: "2024-05-13", Created: 197, Resolved: 160 },
  { date: "2024-05-14", Created: 448, Resolved: 490 },
  { date: "2024-05-15", Created: 473, Resolved: 380 },
  { date: "2024-05-16", Created: 338, Resolved: 400 },
  { date: "2024-05-17", Created: 499, Resolved: 420 },
  { date: "2024-05-18", Created: 315, Resolved: 350 },
  { date: "2024-05-19", Created: 235, Resolved: 180 },
  { date: "2024-05-20", Created: 177, Resolved: 230 },
  { date: "2024-05-21", Created: 82, Resolved: 140 },
  { date: "2024-05-22", Created: 81, Resolved: 120 },
  { date: "2024-05-23", Created: 252, Resolved: 290 },
  { date: "2024-05-24", Created: 294, Resolved: 220 },
  { date: "2024-05-25", Created: 201, Resolved: 250 },
  { date: "2024-05-26", Created: 213, Resolved: 170 },
  { date: "2024-05-27", Created: 420, Resolved: 460 },
  { date: "2024-05-28", Created: 233, Resolved: 190 },
  { date: "2024-05-29", Created: 78, Resolved: 130 },
  { date: "2024-05-30", Created: 340, Resolved: 280 },
  { date: "2024-05-31", Created: 178, Resolved: 230 },
  { date: "2024-06-01", Created: 178, Resolved: 200 },
  { date: "2024-06-02", Created: 470, Resolved: 410 },
  { date: "2024-06-03", Created: 103, Resolved: 160 },
  { date: "2024-06-04", Created: 439, Resolved: 380 },
  { date: "2024-06-05", Created: 88, Resolved: 140 },
  { date: "2024-06-06", Created: 294, Resolved: 250 },
  { date: "2024-06-07", Created: 323, Resolved: 370 },
  { date: "2024-06-08", Created: 385, Resolved: 320 },
  { date: "2024-06-09", Created: 438, Resolved: 480 },
  { date: "2024-06-10", Created: 155, Resolved: 200 },
  { date: "2024-06-11", Created: 92, Resolved: 150 },
  { date: "2024-06-12", Created: 492, Resolved: 420 },
  { date: "2024-06-13", Created: 81, Resolved: 130 },
  { date: "2024-06-14", Created: 426, Resolved: 880 },
  { date: "2024-06-15", Created: 307, Resolved: 350 },
  { date: "2024-06-16", Created: 371, Resolved: 310 },
  { date: "2024-06-17", Created: 475, Resolved: 520 },
  { date: "2024-06-18", Created: 107, Resolved: 170 },
  { date: "2024-06-19", Created: 341, Resolved: 290 },
  { date: "2024-06-20", Created: 408, Resolved: 450 },
  { date: "2024-06-21", Created: 169, Resolved: 210 },
  { date: "2024-06-22", Created: 317, Resolved: 270 },
  { date: "2024-06-23", Created: 480, Resolved: 530 },
  { date: "2024-06-24", Created: 132, Resolved: 180 },
  { date: "2024-06-25", Created: 141, Resolved: 190 },
  { date: "2024-06-26", Created: 434, Resolved: 380 },
  { date: "2024-06-27", Created: 448, Resolved: 490 },
  { date: "2024-06-28", Created: 149, Resolved: 200 },
  { date: "2024-06-29", Created: 103, Resolved: 160 },
  { date: "2024-06-30", Created: 446, Resolved: 400 },
];

const chartConfig = {
  Counts: {
    label: "counts",
  },
  Created: {
    label: "Created",
    color: "#60a5fa",
  },
  Resolved: {
    label: "Resolved",
    color: "#0D47A1",
  },
};

export function LineChartComp() {
  const [timeRange, setTimeRange] = React.useState("90d");

  const filteredData = chartData.filter((item) => {
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
    <div className="min-w-40 w-full min-h-[200px]">
      <Card>
        <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
          <div className="grid flex-1 gap-1 text-center sm:text-left">
            <CardTitle>Issues Created vs. Resolved</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
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
                <linearGradient id="fillCreated" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-Created)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-Created)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="fillResolved" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-Resolved)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-Resolved)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
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
                dataKey="Resolved"
                type="natural"
                fill="url(#fillResolved)"
                stroke="var(--color-Resolved)"
                stackId="a"
              />
              <Area
                type="monotone"
                dataKey="Created"
                fill="url(#fillCreated)"
                stroke="var(--color-Created)"
                stackId="a"
              />
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}

const chartData2 = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
  { month: "July", desktop: 160, mobile: 100 },
  { month: "August", desktop: 280, mobile: 200 },
  { month: "September", desktop: 180, mobile: 150 },
  { month: "October", desktop: 120, mobile: 100 },
  { month: "November", desktop: 220, mobile: 150 },
  { month: "December", desktop: 160, mobile: 100 },
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
export function LineChart2({ data }) {
  console.log(`line`, data);
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
    <div className="min-w-40 w-full min-h-[200px] ">
      <Card>
        <CardHeader>
          <CardTitle>Line Chart</CardTitle>
          <CardDescription>This month</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig2}>
            <LineChart
              accessibilityLayer
              data={transformedData}
              margin={{
                left: 12,
                right: 12,
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
              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => (value % 1 === 0 ? value : "")}
                label={{
                  value: "No of Issues",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
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
    </div>
  );
}
