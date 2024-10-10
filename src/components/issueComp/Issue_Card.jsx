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
  Edit,
  Eye,
  Flag,
  MessageSquare,
  MessageSquareDot,
  MessageSquareText,
  Trash,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { motion } from "framer-motion";
import CommentIcon from "../icons/commentIcon";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../ui/context-menu";

import IssueModal from "./IssueModal";
import { useDisclosure } from "@nextui-org/react";

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
    comments,
  } = issue;
  const { isOpen, onOpen, onOpenChange } = useDisclosure(); // Add useDisclosure for modal

  // Function to handle changes in issue details
  const handleChange = (e) => {
    const { name, value } = e.target;
    setIssueDetails((prev) => ({ ...prev, [name]: value }));
  };

  const classType = {
    bug: "text-red-500",
    feature: "text-green-500",
    other: "text-red-500",
    improvement: "text-yellow-500",
  };

  //map the assignedTo array
  const member = assignedTo.map((value) => {
    return value.name;
  });
  console.log(`mem`, member);
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
  const menuItems = [
    {
      icon: <Eye className="h-5 w-5 mr-2 text-gray-500" />,
      text: "View",
      link: true,
    },
    {
      icon: <Edit className="h-5 w-5 mr-2 text-gray-500" />,
      text: "Edit",
    },

    {
      icon: <Trash2 className="h-5 w-5 mr-2 text-gray-500 " />,
      text: "Delete",
    },
  ];

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

        transition: { duration: 0.3, ease: "easeOut" },
      }}
      transition={{ delay: index * 0.3, duration: 0.5, ease: "easeOut" }}
    >
      <ContextMenu>
        <ContextMenuTrigger>
          {" "}
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
                <h2 className="text-lg font-bold flex text-wrap capitalize mb-1">
                  {title}{" "}
                </h2>
                <div className="flex items-center text-muted-foreground text-sm gap-1">
                  <span className="">
                    <CalendarPlus className="w-4" />
                  </span>
                  {timeandDateFormatter(createdAt)}
                </div>
              </div>
            </div>

            <div className="border-t mb-2" />
            <div className="text-muted-foreground flex justify-between items-center">
              <div className="p-1 flex justify-start items-center gap-2">
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
                <span className={classNames(" ", classType[type])}>
                  {type}
                </span>{" "}
              </div>{" "}
              <div className="flex items-center gap-4">
                {assignedTo.map((value) => {
                  return (
                    <Avatar
                      key={value._id}
                      // src={value.image}
                      src="https://d2u8k2ocievbld.cloudfront.net/memojis/female/4.png"
                      alt={value.name}
                      size="small"
                      className="border-2 border-white"
                    />
                  );
                })}
                <div
                  className={`flex items-center relative
           text-sm font-semibold 
              ${status === "Closed" ? "opacity-50" : "opacity-100"}`}
                >
                  {comments > 0 && <span className="mr-1">{comments}</span>}
                  {comments > 0 ? (
                    <MessageSquareText size={20} />
                  ) : (
                    <MessageSquare size={20} />
                  )}
                  {/* <CommentIcon value={comments} /> */}
                </div>
              </div>
            </div>
          </Link>
        </ContextMenuTrigger>
        <ContextMenuContent>
          {menuItems.map((item, index) => (
            <ContextMenuItem
              key={index}
              icon={item.icon}
              className={`cursor-pointer ${
                item.text === "Delete" && "opacity-50 cursor-not-allowed"
              }`}
              onClick={() => {
                if (item.text === "Edit") {
                  onOpenChange(true); // Open modal on edit click
                }
              }}
            >
              {item.link ? (
                <Link
                  href={`/dashboard/issues/${issue._id}`}
                  className="flex items-center "
                >
                  {item.icon}
                  {item.text}
                </Link>
              ) : (
                <div className={"flex items-center "}>
                  {item.icon}
                  {item.text}
                </div>
              )}
            </ContextMenuItem>
          ))}
        </ContextMenuContent>
      </ContextMenu>{" "}
      <IssueModal
        issue={issue}
        key={issue._id}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </motion.div>
  );
};

export default IssueCard;
