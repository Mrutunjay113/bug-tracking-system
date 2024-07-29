// components/Navbar.js
"use client";
import {
  BadgeInfo,
  BarChartBig,
  Bell,
  LineChart,
  LogOutIcon,
  SquareGanttChart,
  SquareUser,
  User,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { Icons } from "./icons";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";
import { useState } from "react";
import { signOut } from "@/lib/actions/action";
import { toast } from "sonner";
import { useToken } from "@/app/context/usercontext";
import { verifyJwtToken } from "@/lib/utils";
import { redirect } from "next/dist/server/api-utils";

const Navbar = () => {
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

  return (
    <nav className="flex justify-between items-center h-20 border-b bg-white shadow">
      {/* Left Side */}
      <div className="flex items-center ml-5">
        <p className="text-lg font-semibold">Hi, Mrutunjay</p>
      </div>

      {/* Right Side */}
      <div className="flex items-center space-x-4 mr-8">
        {/* Notification Bell Icon */}
        <Dropdown
          placement="bottom-end"
          isOpen={isDropdownOpen}
          onOpenChange={(open) => setIsDropdownOpen(open)}
        >
          <DropdownTrigger>
            <Bell className="h-6 w-6 text-gray-600 hover:text-gray-900 cursor-pointer" />
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

        {/* Profile Icon */}
        {/* <Link href="/profile"> */}
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              size="sm"
              className="transition-transform"
              src={
                User.image || "https://i.pravatar.cc/150?u=a042581f4e29026704d"
              }
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="shadow">
            <DropdownItem key="profile" className="h-14 gap-2" variant="light">
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
              startContent={<BarChartBig className={iconClasses} size={16} />}
            >
              Analytics
            </DropdownItem>
            {/* <DropdownItem key="system">System</DropdownItem> */}
            {/* <DropdownItem key="configurations">Configurations</DropdownItem> */}
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
              startContent={<LogOutIcon className={iconClasses} size={16} />}
            >
              Sign Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        {/* <User className="h-6 w-6 text-gray-600 hover:text-gray-900" /> */}
        {/* </Link> */}
      </div>
    </nav>
  );
};

export default Navbar;
