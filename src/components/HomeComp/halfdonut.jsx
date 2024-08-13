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
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export function Donut({ data, config, title, description }) {
  const chartData = useMemo(() => {
    return Object.entries(data)
      .map(([key, value]) => {
        if (config[key]) {
          return {
            task: config[key].label,
            taskCount: value,
            fill: config[key].color,
          };
        }
        return null;
      })
      .filter((item) => item !== null);
  }, [data, config]);

  const [activeIndex, setActiveIndex] = useState(null);

  const totalTask = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.taskCount, 0);
  }, [chartData]);

  const handleClick = (_, index) => {
    setActiveIndex(index);
  };

  return (
    <Card className="flex flex-col  md:min-w-[300px] ">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="md:flex-1 pb-0">
        <ChartContainer
          config={config}
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
                          {`Total ${title?.split(" ")[0]}`}
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
      </CardContent>
      {data?.Closed > 0 ? (
        <CardFooter className="flex justify-center mt-4">
          <span className="bg-[#34A853] p-1 text-white rounded-full">
            {" "}
            <TrendingUp className="w-4 h-4" />
          </span>

          <span className="ml-2 text-muted-foreground">
            We have closed
            <span className="text-gray-600 font-semibold">
              {data?.Closed > 0
                ? ` ${(data?.Closed / totalTask) * 100}%   `
                : null}
            </span>
            tasks this month.
          </span>
        </CardFooter>
      ) : null}
    </Card>
  );
}
