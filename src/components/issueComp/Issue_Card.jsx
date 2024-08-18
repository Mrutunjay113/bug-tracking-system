"use client";
import { Avatar } from "@nextui-org/avatar";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import classNames from "classnames";
import {
  CalendarCheck,
  CalendarClock,
  CalendarPlus,
  Clock,
  Flag,
  MessageSquareText,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const IssueCard = ({ issue, index }) => {
  const {
    title,
    description,
    priority,
    issueType,
    image,
    assignedTo,
    type,
    dueDate,
    status,
    createdAt,
  } = issue;

  const classType = {
    bug: "text-red-500",
    feature: "text-green-500",
    other: "text-red-500",
    improvement: "text-yellow-500",
  };

  const timeandDateFormatter = (inputDate) => {
    const date = new Date(inputDate);
    const now = new Date();

    const diffInMs = now - date;
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    const formatTime = (date) => {
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    };

    if (diffInDays === 0) {
      if (diffInHours === 0) {
        return `${diffInMinutes} min ago`;
      } else {
        return `${diffInHours} hrs ago`;
      }
    } else if (diffInDays === 1) {
      return `Yesterday ${formatTime(date)}`;
    } else {
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
  };

  const classPriority = {
    low: "text-green-600",
    medium: "text-yellow-600",
    high: "text-red-600",
  };

  return (
    <motion.div
      className={`flex-row my-2 bg-white border p-2 md:px-4 rounded-md ${
        status === "Closed" ? "opacity-60" : "opacity-100"
      }`}
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      whileTap={{
        scale: 0.9,

        transition: { duration: 0.3, ease: "easeIn" },
      }}
      transition={{ delay: index * 0.2, duration: 0.5, ease: "easeOut" }}
    >
      <Link href={`/dashboard/issues/${issue._id}`} className="">
        <div className="relative">
          <div className="flex justify-between items-center">
            <div
              className={`flex items-center font-semibold text-sm uppercase rounded-full text-gray-700 ${classPriority[priority]}`}
            >
              {priority}
            </div>
            <div className="flex text-muted-foreground gap-2 text-sm items-center">
              <span>
                <CalendarClock className="w-4" />
              </span>
              {new Date(dueDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>
          <div className="my-4">
            <h2 className="text-lg font-bold flex text-wrap">{title} </h2>
            <div className="flex items-center text-muted-foreground text-sm gap-1">
              <span className="">
                <CalendarPlus className="w-4" />
              </span>
              {timeandDateFormatter(createdAt)}
            </div>
          </div>
        </div>
        {/* <div>
          <p className="text-base">{description}</p>
        </div> */}
        <div className="border-t mb-2" />
        <div className="text-muted-foreground flex justify-between items-center">
          <div className="p-1 flex justify-start gap-2">
            {issueType === "UI/UX" ? (
              <span className="">#UI/UX</span>
            ) : issueType === "Developer" ? (
              <span className="">#Dev</span>
            ) : issueType === "QA" ? (
              <span className="">#QA</span>
            ) : (
              <span className="">#Other</span>
            )}
            {"|"}
            <span className={classNames("", classType[type])}>{type}</span>{" "}
          </div>{" "}
          <div className="flex items-center gap-4">
            <Avatar
              src="https://d2u8k2ocievbld.cloudfront.net/memojis/male/4.png"
              size="sm"
              alt="my"
            />
            <div
              className={`
              text-muted-foreground hover:text-gray-600 text-sm font-semibold
              ${status === "Closed" ? "opacity-50" : "opacity-90"}`}
            >
              <MessageSquareText />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default IssueCard;
