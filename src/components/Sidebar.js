"use client";
import {
  ArrowLeft,
  ArrowRightToLine,
  BarChartBig,
  Bell,
  Home,
  LogOutIcon,
  SquareGanttChart,
  Users,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icons } from "./icons";
import { useState } from "react";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { cn } from "@/lib/utils";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";
import { signOut } from "next-auth/react";
import { motion } from "framer-motion";

const SidebarItem = ({
  href,
  icon,
  text,
  showText,
  isActive,
  onClick,
  children,
  showDownArrow,
  className,
  isTeamDropdownOpen,
}) => {
  return (
    <li className={cn("relative", className)}>
      <Link
        href={href ? href : "#"}
        onClick={onClick}
        className={`relative flex items-center py-2 px-3 font-medium rounded-md cursor-pointer transition-colors group ${
          isActive
            ? "bg-[#1f66ff] text-white"
            : "hover:bg-[#f1f5ff] text-gray-600"
        } ${showText ? "" : "justify-center"}`}
      >
        {icon && (
          <span
            className={`group ${isActive ? "text-white " : "text-gray-500"}`}
          >
            {icon}
          </span>
        )}
        {!showText && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`absolute left-full rounded-md px-2 border z-20 py-1 ml-6 bg-white text-[#1f66ff] text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
          >
            {text}
          </motion.div>
        )}
        {showText && (
          <p
            className={`ml-4 font-semibold items-center${
              isActive ? "text-white" : ""
            } ${showDownArrow ? "flex justify-end " : ""}`}
          >
            {text}
          </p>
        )}
      </Link>
      {children}
    </li>
  );
};

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();

  return (
    <motion.div
      className="flex h-full"
      onHoverStart={() => setIsExpanded(true)}
      onHoverEnd={() => setIsExpanded(false)}
      initial={{ width: "4rem" }}
      animate={{ width: isExpanded ? "15rem" : "5rem" }}
      transition={{
        bounce: 0,
        duration: 0.2,
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      <div className="bg-[color:var(--bg-primary)]  flex flex-col p-2 border-r  flex-1 ">
        <div className="p-4 mb-2 justify-start flex">
          <div className="flex-1 flex items-center justify-start">
            <div className="">
              <Icons.logo className={` h-7 w-7 `} />
            </div>
            {isExpanded && (
              <div className={`text-md font-bold ml-2`}>Mrutunjay</div>
            )}
          </div>

          {/* <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-500 hover:text-gray-900 focus:outline-none"
          >
            {isExpanded ? <ArrowLeft /> : <ArrowRightToLine />}
          </button> */}
        </div>
        <nav className="flex-1 ">
          <motion.div
            //show step wise animation on sidebar items
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-2 list-none"
          >
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
              href="/dashboard/inbox"
              icon={<Bell className="h-6 w-6" />}
              text="Inbox"
              isActive={pathname === "/dashboard/inbox"}
              showText={isExpanded}
            />
            <SidebarItem
              href="/dashboard/analytics"
              icon={<BarChartBig className="h-6 w-6" />}
              text="Analytics"
              isActive={pathname === "/dashboard/analytics"}
              showText={isExpanded}
            />
            <SidebarItem
              href="/dashboard/teams"
              icon={<HiOutlineUserGroup className="h-6 w-6" />}
              text="Teams"
              isActive={pathname === "/dashboard/teams"}
              showText={isExpanded}
            />
            <SidebarItem
              href="/dashboard/members"
              icon={<Users className="h-6 w-6" />}
              text="Members"
              isActive={pathname === "/dashboard/members"}
              showText={isExpanded}
            />
          </motion.div>
        </nav>
        <nav className="flex justify-between items-center text-center  h-10 mb-4 pt-4 border-t border-black">
          {isExpanded && (
            <div className="flex items-center ml-5">
              <p className="text-lg font-semibold">Mrutunjay</p>
            </div>
          )}
          <div className="flex items-center space-x-4 mx-auto">
            <Dropdown placement="right ">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  size="sm"
                  className="transition-transform"
                  src={
                    // User.image ||
                    "https://i.pravatar.cc/150?u=a042581f4e29026704d"
                  }
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="shadow">
                <DropdownItem
                  key="profile"
                  className="h-14 gap-2"
                  variant="light"
                >
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{"zoey@example.com"}</p>
                </DropdownItem>
                <DropdownItem
                  key="profile"
                  href="/dashboard/profile"
                  startContent={<UserRound className="text-xl" />}
                >
                  My Profile
                </DropdownItem>
                <DropdownItem
                  key="add_issue"
                  href="/dashboard/issues/addissue"
                  startContent={<SquareGanttChart className="text-xl" />}
                >
                  Add Issue
                </DropdownItem>
                <DropdownItem
                  key="analytics"
                  href="/dashboard/analytics"
                  startContent={<BarChartBig className="text-xl" />}
                >
                  Analytics
                </DropdownItem>
                <DropdownItem
                  key="help_and_feedback"
                  startContent={<UserRound className="text-xl" />}
                >
                  Help & Feedback
                </DropdownItem>
                <DropdownItem
                  onClick={() =>
                    signOut({ callbackUrl: "/sign-in", redirect: true })
                  }
                  key="logout"
                  color="danger"
                  startContent={<LogOutIcon className="text-xl" />}
                >
                  Sign Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </nav>
      </div>
    </motion.div>
  );
};

export default Sidebar;
