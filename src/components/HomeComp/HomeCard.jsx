import { Image } from "@nextui-org/image";
import {
  AppWindow,
  AppWindowMac,
  Bug,
  BugOff,
  Eye,
  FileCode,
  Flag,
  FlagTriangleRight,
  Star,
  User,
} from "lucide-react";
import React from "react";

import DonutChart from "./DonutPie";
import DonutPie from "./DonutPie";

const HomeCard = ({
  title = "Total Issues",
  CardValue = "125",
  lastweek = "",
  percentage = "60%",
  chartData = [],
  chart,
  memberChart,
  priorityChart,
}) => {
  const iconMap = {
    "Total Issues": <Bug size={40} strokeWidth={1.3} />,
    "Issues Open": <AppWindowMac size={40} strokeWidth={1.3} />,
    "Issues Closed": <BugOff size={40} strokeWidth={1.3} />,
    "Issues In Progress": <FileCode size={40} strokeWidth={1.3} />,
    "Priority Issues": <FlagTriangleRight size={40} strokeWidth={1.3} />,
  };
  const Icon = iconMap[title] || null;
  const CustomChartType = memberChart
    ? "memberChart"
    : priorityChart
    ? "priorityChart"
    : null;

  return (
    <div className="flex rounded-md  w-f shadow-md bg-white  justify-between   p-4 ">
      <div className="  gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-normal">{title}</h2>
        </div>
        <div className="flex items-center">
          <span className="text-3xl font-bold">
            {/* {users.toLocaleString()} */}
            {CardValue}
          </span>
          {/* <div className="bg-green-100 text-green-600 rounded-md px-2 py-1 text-xs">
            {percentage}
          </div> */}
        </div>
        {lastweek.length > 0 && (
          <div className="text-gray-500 items-center flex mt-2 text-sm">
            Last Week:
            <span className="font-medium ml-2">
              {/* {lastWeekUsers.toLocaleString()} */}
              {lastweek}
            </span>
          </div>
        )}
      </div>

      <div className="">
        {chart ? (
          <div className="flex items-center justify-center">
            <DonutPie chartData={chartData} CustomChartType={CustomChartType} />
          </div>
        ) : (
          <div className="flex items-center justify-center mt-6">{Icon}</div>
        )}
      </div>
    </div>
  );
};

export default HomeCard;
