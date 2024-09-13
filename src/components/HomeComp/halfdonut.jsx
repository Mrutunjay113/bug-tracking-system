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
  console.log(`data`, data);
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
    <Card className="flex flex-col md:min-w-[300px] min-h-[300px] max-h-full h-[400px] md:w-[400px] border-none">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        {/* <CardDescription>{description}</CardDescription> */}
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

      <CardFooter className="flex justify-start ">
        {data?.Closed > 0 ? (
          <div className="flex text-base items-center gap-2 font-medium">
            <TrendingUp size={20} color="blue" />
            <span className="text-blue-700">
              {((data.Closed / totalTask) * 100).toFixed(0)}%{" "}
            </span>
            tasks closed this month
          </div>
        ) : (
          <div className="flex text-base items-center gap-2 font-medium">
            <TrendingUp size={20} />
            <span className="text-red-700">0 </span>
            tasks closed this month
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
