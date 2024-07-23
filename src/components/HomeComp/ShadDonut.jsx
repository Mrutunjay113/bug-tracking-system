"use client";

import * as React from "react";
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
import { getDonutChartData } from "@/lib/actions/charts/DonutChartAction";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const chartConfig = {
  bug: {
    label: "bug",
    color: "#F44336",
  },
  feature: {
    label: "feature",
    color: "#4CAF50",
  },
  improvement: {
    label: "improvement",
    color: "#3B82F6",
  },
  other: {
    label: "other",
    color: "#93C5FD",
  },

  Open: {
    label: "Open",
    color: "#6EE7B7",
  },
  Closed: {
    label: "Closed",
    color: "#F87171",
  },
  "In Progress": {
    label: "In Progress",
    color: "#60A5FA",
  },
  "In Review": {
    label: "Pending",
    color: "#FBBF24",
  },
};

export function ShadDonut() {
  const [timeRange, setTimeRange] = React.useState("30d");
  const [selectChartType, setSelectChartType] = React.useState("Status");
  const [chartData, setChartData] = React.useState([]);
  const [totalIssues, setTotalIssues] = React.useState(0);

  // Function to filter data based on time range
  const filterDataByTimeRange = (data, range) => {
    const now = new Date();
    const cutoffDate = new Date();
    cutoffDate.setDate(now.getDate() - (range === "30d" ? 30 : 7));

    return Object.keys(data).reduce((acc, date) => {
      if (new Date(date) >= cutoffDate) {
        acc[date] = data[date];
      }
      return acc;
    }, {});
  };

  // Function to transform data for the chart
  const transformDataForChart = (data, type) => {
    const transformedData = [];
    let total = 0;

    for (const date in data) {
      for (const key in data[date]) {
        if (key in chartConfig) {
          transformedData.push({
            browser: chartConfig[key]?.label || key,
            issues: data[date][key],
            fill: chartConfig[key]?.color || "#CCCCCC",
          });
          total += data[date][key];
        }
      }
    }

    setTotalIssues(total);
    return transformedData;
  };

  console.log(transformDataForChart);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDonutChartData();
        if (result.success) {
          const { data } = result;

          const filteredData = filterDataByTimeRange(
            data[selectChartType === "Status" ? "Status" : "issueType"],
            timeRange
          );

          const transformedData = transformDataForChart(
            filteredData,
            selectChartType
          );
          setChartData(transformedData);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [timeRange, selectChartType]);

  return (
    <Card className="flex flex-col w-full min-h-[200px] h-full">
      <CardHeader className="flex items-center gap-2 space-y-0 py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left text-medium">
          <CardTitle>Donut ({selectChartType})</CardTitle>
          <CardDescription>This month</CardDescription>
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
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Pie
              data={chartData}
              dataKey="issues"
              nameKey="browser"
              innerRadius={60}
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
                          Total Issues
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        {/* Footer content */}
      </CardFooter>
    </Card>
  );
}
