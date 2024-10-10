"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

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
} from "../ui/select";

//create color hex code for the chart data

const chartConfig = {
  Developer: { label: "Developer", color: "#2563EB" },
  "UI/UX": { label: "UI/UX", color: "#0588" },
  Open: { label: "Open", color: "#2563EB" },
  Closed: { label: "Closed", color: "#E21D48" },

  "In Progress": { label: "In Progress", color: "#FBBF24" },
  "In Review": { label: "Pending", color: "#2A9D90" },
  QA: { label: "QA", color: "#F472B6" },
  Tester: { label: "Tester", color: "#A78BFA" },
};

const transformData = (data, type, range) => {
  console.log(`data`, data);
  const now = new Date();
  const cutoffDate = new Date();
  cutoffDate.setDate(now.getDate() - (range === "30d" ? 30 : 7));

  const filteredData = Object.keys(data).reduce((acc, date) => {
    if (new Date(date) >= cutoffDate) {
      if (type === "Type") {
        const issueTypes = data[date];
        Object.entries(issueTypes).forEach(([issueType, count]) => {
          acc[issueType] = (acc[issueType] || 0) + count;
        });
      } else if (type === "Status") {
        Object.entries(data[date]).forEach(([key, value]) => {
          acc[key] = (acc[key] || 0) + value;
        });
      }
    }
    return acc;
  }, {});

  return Object.keys(filteredData).map((key) => ({
    name: key,
    value: filteredData[key],
    fill: chartConfig[key] ? chartConfig[key].color : "#cccccc",
  }));
};

export function ShadDonut({ data }) {
  // console.log(`pie`, data);
  const [timeRange, setTimeRange] = React.useState("30d");
  const [selectChartType, setSelectChartType] = React.useState("Status");
  const [chartData, setChartData] = React.useState([]);

  React.useEffect(() => {
    const dataToUse =
      selectChartType === "Status" ? data.status : data.issueType;
    console.log("Data to Use:", dataToUse);
    const transformedData = transformData(
      dataToUse,
      selectChartType,
      timeRange
    );
    console.log("Transformed Data:", transformedData);
    setChartData(transformedData);
  }, [selectChartType, timeRange]);

  const totalIssues = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0);
  }, [chartData]);

  return (
    <Card className="flex flex-col min-w-40 w-full min-h-[200px] h-full">
      <CardHeader className="flex items-center gap-2 space-y-0 py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left text-medium">
          <CardTitle>Donut ({selectChartType})</CardTitle>
          <CardDescription className="mt-2 text-muted-foreground tracking-wide">
            last {""}
            {timeRange === "30d" ? (
              <span className=" font-semibold text-slate-700">30 days</span>
            ) : (
              <span className=" font-semibold text-slate-700">7 days</span>
            )}
          </CardDescription>
        </div>
        <Select value={selectChartType} onValueChange={setSelectChartType}>
          <SelectTrigger
            className="w-[120px] rounded-lg"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Select Type" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="Status" className="rounded-lg">
              Status
            </SelectItem>
            <SelectItem value="Type" className="rounded-lg">
              Type
            </SelectItem>
          </SelectContent>
        </Select>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[120px] rounded-lg"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[280px]"
        >
          {chartData.length > 0 ? (
            <PieChart>
              <ChartLegend
                content={<ChartLegendContent config={chartConfig} />}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={50}
                strokeWidth={5}
              >
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
                            {totalIssues.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            {
                              // eslint-disable-next-line no-nested-ternary
                              selectChartType === "Status"
                                ? "Issues"
                                : selectChartType === "Type"
                                ? "Types"
                                : ""
                            }
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          ) : (
            <div className="flex justify-center text-2xl font-semibold  text-red-700 items-center h-full">
              No Data
            </div>
          )}
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start mt-5 gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  );
}
