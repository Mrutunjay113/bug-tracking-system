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
  Gamepad,
  Quote,
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
import { signOut, useSession } from "next-auth/react";
import { motion } from "framer-motion";

const SidebarItem = ({
  href,
  icon,
  text,
  showText,
  isActive,
  onClick,
  children,
  className,
}) => {
  return (
    <li className={cn("relative", className)}>
      <Link
        href={href ? href : "#"}
        onClick={onClick}
        className={`relative flex items-center py-2 rounded-lg pl-5 font-medium cursor-pointer group ${
          isActive
            ? "text-[#1f66ff] bg-[#eaebee] hover:bg-[#eaebee]"
            : "hover:bg-[#eaebee] text-gray-600"
        } ${showText ? "justify-start" : "justify-start"} `}
      >
        {icon && (
          <span
            className={`
          ${isActive ? "text-[#1f66ff]" : "text-gray-600"}
          `}
          >
            {icon}
          </span>
        )}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: showText ? 1 : 0, width: showText ? "auto" : 0 }}
          className={`overflow-hidden whitespace-nowrap font-semibold ${
            showText ? "ml-4" : "ml-4"
          }`}
        >
          {text}
        </motion.div>
      </Link>
      {children}
    </li>
  );
};

const Sidebar = () => {
  const { data: session } = useSession();
  console.log(`ss`, session);
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();

  return (
    <motion.div
      className="flex h-full"
      onHoverStart={() => setIsExpanded(true)}
      onHoverEnd={() => setIsExpanded(false)}
      initial={{ width: "5rem" }}
      animate={{ width: isExpanded ? "15rem" : "5rem" }}
      transition={{
        width: { duration: 0.3, bounce: 0.5 }, // Smooth transition for width
        opacity: { duration: 0.2 }, // Optional: Smooth transition for opacity if used
      }}
    >
      <div className="bg-[color:var(--bg-primary)] flex flex-col p-2 border-r flex-1">
        <div className="p-4 mb-2 justify-start flex">
          <div className="flex-1 flex items-center justify-start">
            <div className="">
              <Icons.logo className={`h-7 w-7`} />
            </div>
            {isExpanded && (
              <div className={`text-md font-bold ml-2`}>Issues</div>
            )}
          </div>
        </div>
        <nav className="flex-1">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.2 }} // Smooth opacity transition
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

            <SidebarItem
              href="/dashboard/memes"
              icon={<Quote className="h-6 w-6" />}
              text="Memes & Quotes"
              isActive={pathname === "/dashboard/funmems"}
              showText={isExpanded}
            />
          </motion.div>
        </nav>
        <nav className="flex justify-between items-center text-center h-10 mb-4 pt-4 border-t border-black">
          {isExpanded && (
            <div className="flex items-center ml-5">
              <p className="text-lg font-semibold">
                {session?.user?.firstName}
              </p>
            </div>
          )}
          <div className="flex items-center space-x-4 mx-auto">
            <Dropdown placement="right">
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
                  <p className="font-semibold">{session?.user?.email}</p>
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
