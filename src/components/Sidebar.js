"use client";
import {
  ArrowDown,
  ArrowLeftFromLine,
  ArrowRightToLine,
  ArrowRightToLineIcon,
  ArrowUpIcon,
  BarChartBig,
  CircleChevronDown,
  CircleChevronUpIcon,
  Home,
  SquareGanttChart,
  Users,
  BadgeInfo,
  Bell,
  LineChart,
  LogOutIcon,
  SquareUser,
  User,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icons } from "./icons";
import { useState } from "react";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { cn } from "@/lib/utils";
import { signOut } from "@/lib/actions/action";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { useToken } from "@/app/context/usercontext";
import { Avatar } from "@nextui-org/avatar";

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
        href={href}
        onClick={onClick}
        className={`relative flex items-center py-2 px-3 font-medium rounded-md cursor-pointer transition-colors group ${
          isActive
            ? "bg-[#1f66ff] text-white"
            : "hover:bg-[#f1f5ff] text-gray-600"
        } ${showText ? "" : "justify-center"}
        `}
      >
        {icon && (
          <span
            className={`group${isActive ? "text-blue-500 " : "text-gray-500"} `}
          >
            {icon}
          </span>
        )}
        {!showText && (
          <div
            className={`absolute left-full rounded-md px-2 border py-1 ml-6 bg-white text-[#1f66ff] text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
          >
            {text}
          </div>
        )}
        {showText && (
          <p
            className={`ml-4 font-semibold items-center${
              isActive ? "text-white" : ""
            } ${showDownArrow ? "flex justify-end " : ""}`}
          >
            {text}
            <span className={`text-gray-600 ${showDownArrow ? "ml-2" : ""}`}>
              {showDownArrow &&
                (isTeamDropdownOpen ? (
                  <CircleChevronUpIcon className="w-5 h-5" />
                ) : (
                  <CircleChevronDown className="w-5 h-5" />
                ))}
            </span>
          </p>
        )}
      </Link>
      {children}
    </li>
  );
};

const Sidebar = () => {
  const { token } = useToken();
  console.log(token);

  const data = [
    { id: 1, message: "New comment on your post" },
    { id: 2, message: "Your task is due tomorrow" },
    { id: 3, message: "New friend request" },
  ];
  const [notifications, setNotifications] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const iconClasses = "text-xl  pointer-events-none flex-shrink-0";

  const handleSignOut = async () => {
    // Sign out the user
    // Remove the token from the cookies
    // Redirect to the sign-in page
    const signout = await signOut();
    if (signout.success) {
      toast.success("Signed out successfully");
      redirect(new URL("/sign-in").toString());
    }
  };

  const [isExpanded, setIsExpanded] = useState(true); // State to manage sidebar expand/collapse
  const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false); // State to manage Team dropdown visibility
  const toggleSidebar = () => setIsExpanded(!isExpanded);
  const toggleTeamDropdown = () => setIsTeamDropdownOpen(!isTeamDropdownOpen);

  const pathname = usePathname();

  return (
    <div className=" flex h-full ">
      <div
        className={`bg-[color:var(--bg-primary)] w-${
          isExpanded ? "64" : "16"
        } flex flex-col p-2 border-r flex-1`}
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
              icon={<BarChartBig className="h-6 w-6" />}
              text="Analytics"
              isActive={pathname === "/dashboard/analytics"}
              showText={isExpanded}
            />
            <SidebarItem
              href="#"
              icon={<HiOutlineUserGroup className="h-6 w-6" />}
              text="Team & Member"
              isActive={pathname === "/dashboard/team"}
              showText={isExpanded}
              showDownArrow={true}
              isTeamDropdownOpen={isTeamDropdownOpen}
              className="transition delay-150 duration-300 ease-in-out"
              onClick={(e) => {
                e.preventDefault();
                toggleTeamDropdown();
              }}
            >
              {isTeamDropdownOpen && (
                <ul className={`pl-4 mt-2 space-y-2`}>
                  <SidebarItem
                    icon={<Users className="h-6 w-6" />}
                    href="/dashboard/teams"
                    text="Teams"
                    isActive={pathname === "/dashboard/teams"}
                    showText={isExpanded}
                  />
                  <SidebarItem
                    icon={<Users className="h-6 w-6" />}
                    href="/dashboard/members"
                    text="Members"
                    isActive={pathname === "/dashboard/members"}
                    showText={isExpanded}
                  />
                </ul>
              )}
            </SidebarItem>
          </ul>
        </nav>
        <nav className="flex justify-between items-center text-center h-10 mb-4 pt-4 border-t border-black    ">
          {/* Left Side */}
          {isExpanded && (
            <div className="flex items-center ml-5">
              <p className="text-lg font-semibold">Mrutunjay</p>
            </div>
          )}

          <div className="flex items-center space-x-4 mx-auto">
            {/* Notification Bell Icon */}
            {isExpanded && (
              <Dropdown
                placement="bottom-end"
                accessKey="n"
                isOpen={isDropdownOpen}
                onOpenChange={(open) => setIsDropdownOpen(open)}
              >
                <DropdownTrigger accessKey="n">
                  <Bell className="h-5 w-5 text-gray-600 hover:text-gray-900 cursor-pointer" />
                </DropdownTrigger>

                <DropdownMenu aria-label="Notifications" variant="light">
                  {data.length > 0 ? (
                    data.map((notification) => (
                      <DropdownItem key={notification.id}>
                        {notification.message}
                      </DropdownItem>
                    ))
                  ) : (
                    <DropdownItem>No new notifications</DropdownItem>
                  )}
                </DropdownMenu>
              </Dropdown>
            )}

            {/* Profile Icon */}
            <Dropdown placement="right ">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  size="sm"
                  className="transition-transform"
                  src={
                    User.image ||
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
                  <p className="font-semibold">
                    {User.username || "zoey@example.com"}
                  </p>
                </DropdownItem>

                <DropdownItem
                  key="prfile"
                  href="/dashboard/profile"
                  startContent={<UserRound className={iconClasses} size={16} />}
                >
                  My Profile
                </DropdownItem>

                <DropdownItem
                  key="add_issue"
                  href="/dashboard/issues/addissue"
                  startContent={
                    <SquareGanttChart className={iconClasses} size={16} />
                  }
                >
                  Add Issue
                </DropdownItem>
                <DropdownItem
                  key="analytics"
                  href="/dashboard/analytics"
                  startContent={
                    <BarChartBig className={iconClasses} size={16} />
                  }
                >
                  Analytics
                </DropdownItem>
                <DropdownItem
                  key="help_and_feedback"
                  startContent={<BadgeInfo className={iconClasses} size={16} />}
                >
                  Help & Feedback
                </DropdownItem>
                <DropdownItem
                  onClick={handleSignOut}
                  key="logout"
                  color="danger"
                  startContent={
                    <LogOutIcon className={iconClasses} size={16} />
                  }
                >
                  Sign Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
