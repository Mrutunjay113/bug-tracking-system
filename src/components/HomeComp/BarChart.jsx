"use client";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { color } from "framer-motion";
import { kbd } from "@nextui-org/react";

const chartConfig = {
  low: {
    label: "Low",
    color: "#3B82F6",
  },
  medium: {
    label: "Medium",
    color: "#6EE7B7",
  },
  high: {
    label: "High",
    color: "#F87171",
  },
};

export function Barchart({ data }) {
  console.log(data);

  // Transform data to fit the chart format
  const transformedData = data.map((item) => ({
    date: new Date(item.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }), // Format date
    low: item.priorities.low || 0,
    medium: item.priorities.medium || 0,
    high: item.priorities.high || 0,
  }));

  return (
    <div className="min-w-40 w-full min-h-[200px]">
      <Card>
        <CardHeader>
          <CardTitle>Bar Chart</CardTitle>
          <CardDescription>This month</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart data={transformedData}>
              <CartesianGrid horizontal={false} vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
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
              <ChartLegend
                content={<ChartLegendContent config={chartConfig} />}
              />
              <ChartTooltip
                cursor={false}
                content={
                  //show the date and count of issues
                  <ChartTooltipContent chartConfig={chartConfig} />
                }
              />

              {Object.keys(chartConfig).map((key, index) => (
                <Bar
                  key={key}
                  dataKey={key}
                  stackId="a"
                  fill={chartConfig[key].color}
                  radius={
                    // if length of data is 1, set radius to 10 if length > 1 set radius to last bar on that date
                    [5, 5, 5, 5]
                  }
                />
              ))}
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
