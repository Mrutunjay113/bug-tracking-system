// components/Sidebar.js
"use client";
import {
  ArrowBigRight,
  ArrowLeftFromLine,
  ArrowRightToLine,
  BarChart,
  Home,
  SquareGanttChart,
  SquareGanttChartIcon,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icons } from "./icons";
import { useState } from "react";

const SidebarItem = ({ href, icon, text, showText }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li className=" ">
      <Link
        href={href}
        // className={`flex items-center px-4 py-3 rounded-md hover:bg-[#f1f5ff]
        //     ${isActive ? "bg-[#f1f5ff]" : ""}
        //   `}
        className={`
            relative flex items-center flex  py-2 px-3
            font-medium rounded-md cursor-pointer
            transition-colors group
            ${
              isActive
                ? "bg-[#1f66ff] text-white"
                : "hover:bg-[#f1f5ff] text-gray-600"
            }
            ${showText ? "" : "justify-center"}
        `}
      >
        {icon && (
          <span
            className={`group${isActive ? "text-blue-500" : "text-gray-500"}`}
          >
            {icon}
          </span>
        )}
        {!showText && (
          <div
            className={`
          absolute left-full rounded-md px-2 border py-1 ml-6
          bg-white text-[#1f66ff] text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
          >
            {text}
          </div>
        )}
        {showText && (
          <p className={`ml-4 font-semibold ${isActive ? "text-white" : ""}`}>
            {text}
          </p>
        )}
      </Link>
    </li>
  );
};
const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true); // State to manage sidebar expand/collapse
  const toggleSidebar = () => setIsExpanded(!isExpanded);

  const pathname = usePathname();

  return (
    <div
      className={`h-screen w-${
        isExpanded ? "64" : "16"
      } flex flex-col p-2 border-r`}
    >
      <div className="p-4 mb-2 justify-start flex">
        <div className="flex-1 flex items-center justify-around">
          <div className="">
            <Icons.logo className={` ${isExpanded ? "h-10 w-10 " : ""}`} />
          </div>
          <div className={`text-md font-bold ${isExpanded ? "" : "hidden"}`}>
            Mrutunjay
          </div>
        </div>
        <button
          onClick={toggleSidebar}
          className="text-gray-500 hover:text-gray-900 focus:outline-none"
        >
          {isExpanded ? <ArrowLeftFromLine /> : <ArrowRightToLine />}
        </button>
      </div>
      <nav className="flex-1">
        <ul className="space-y-2">
          <SidebarItem
            href="/dashboard"
            icon={<Home className="h-6 w-6" />}
            text="Home"
            isActive={pathname === "/dashboard"}
            showText={isExpanded}
          />
          <SidebarItem
            href="/dashboard/issues"
            icon={<SquareGanttChart className="h-6 w-6" />}
            text="Issues"
            isActive={pathname === "/dashboard/issues"}
            showText={isExpanded}
          />
          <SidebarItem
            href="/dashboard/analytics"
            icon={<BarChart className="h-6 w-6" />}
            text="Analytics"
            isActive={pathname === "/dashboard/analytics"}
            showText={isExpanded}
          />
          <SidebarItem
            href="/dashboard/profile"
            icon={<User className="h-6 w-6" />}
            text="Profile"
            isActive={pathname === "/dashboard/profile"}
            showText={isExpanded}
          />
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
