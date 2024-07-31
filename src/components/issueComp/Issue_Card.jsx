"use client ";
import { Avatar } from "@nextui-org/avatar";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import classNames from "classnames";
import { MessageSquareText } from "lucide-react";
import Link from "next/link";
import React from "react";

const IssueCard = ({ issue }) => {
  const {
    title,
    description,
    priority,
    issueType,
    image,
    assignedTo,
    type,
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
    console.log("inputDate", inputDate);
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
    low: "bg-green-200",
    medium: "bg-yellow-200",
    high: "bg-red-200",
  };

  return (
    <div
      className={`mb-4 flex-row shadow-sm  p-2
      bg-[#eff0ef] rounded-md
${status === "Closed" ? "opacity-60" : "opacity-100"}
      `}
    >
      <Link href={`/dashboard/issues/${issue._id}`} className="space-y-4">
        <div className="relative ">
          <div className="flex justify-between items-center ">
            <h2 className="text-lg font-bold flex text-wrap">{title} </h2>
            <div
              className={`px-2   rounded-full text-gray-700 ${classPriority[priority]}`}
            >
              {priority}
            </div>
          </div>
          <div className="text-muted-foreground flex text-sm  items-center">
            <div>
              {assignedTo[0]?.name} - {timeandDateFormatter(createdAt)}
            </div>
          </div>
        </div>
        {/* <div>
          <p className="text-base">{description}</p>
        </div> */}

        <div className="text-muted-foreground flex justify-between items-center pt-2">
          <div className="p-1 flex justify-start gap-2">
            {issueType === "UI/UX" ? (
              <span className="text-blue-500  ">#UI/UX</span>
            ) : issueType === "Developer" ? (
              <span className="text-green-500 ">#Dev</span>
            ) : issueType === "QA" ? (
              <span className="text-yellow-500  ">#QA</span>
            ) : (
              <span className="text-red-500 ">#Other</span>
            )}
            {"|"}
            <span className={classNames(" ", classType[type])}>
              {type}
            </span>{" "}
          </div>{" "}
          <div className="flex items-center gap-4">
            <Avatar
              src="https://d2u8k2ocievbld.cloudfront.net/memojis/male/4.png"
              // src={assignedTo[0]?.image}
              alt="my"
            />
            <div
              className={`
            text-[#ff8952]

            status === "Closed" ? "opacity-50" : "opacity-90 "`}
            >
              <MessageSquareText />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default IssueCard;
