// components/Navbar.js
"use client";
import { Bell, User } from "lucide-react";
import Link from "next/link";
import { Icons } from "./icons";

const Navbar = () => {
  // Assuming you are using next-auth for session management

  return (
    <nav className="flex justify-between items-center h-20 border-b bg-white shadow">
      {/* Left Side */}
      <div className="flex items-center ml-5">
        <p className="text-lg font-semibold">Hi, Mrutunjay</p>
      </div>

      {/* Right Side */}
      <div className="flex items-center space-x-4 mr-8">
        {/* Notification Bell Icon */}
        <Link href="/notifications" className="relative">
          <Bell className="h-6 w-6 text-gray-600 hover:text-gray-900" />
        </Link>

        {/* Profile Icon */}
        <Link href="/profile">
          <User className="h-6 w-6 text-gray-600 hover:text-gray-900" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
