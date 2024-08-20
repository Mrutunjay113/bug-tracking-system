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
  CardFooter,
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
import { TrendingUp } from "lucide-react";

const chartConfig = {
  low: {
    label: "Low",
    color: "#2563EB",
  },
  medium: {
    label: "Medium",
    color: "#FBBF24",
  },
  high: {
    label: "High",
    color: "#E21D48",
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
                fontWeight={500}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
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
        <CardFooter className="flex-col items-start mt-2 gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing total visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
