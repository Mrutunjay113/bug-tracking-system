"use client ";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
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
    status,
    createdAt,
  } = issue;

  console.log(issue);
  return (
    <div
      className={`mb-4 flex-row  p-2  ${
        status === "Closed"
          ? "bg-gray-100 border-l-2 border-gray-500"
          : priority === "high"
          ? "border-l-2 border-red-500 bg-red-100"
          : priority === "medium"
          ? "border-l-2 border-yellow-500 bg-yellow-100"
          : "border-l-2 border-green-500 bg-green-100"
      }
    

      `}
    >
      <Link href={`/dashboard/issues/${issue._id}`} className="space-y-4">
        <div className="relative ">
          <div className="flex justify-between ">
            <h2 className="text-lg font-bold ">{title} </h2>
            <span className="relative items-center">
              {priority === "low" ? (
                <span
                  className={` px-2 rounded-lg  text-white bg-green-600
                ${status === "Closed" ? "opacity-50" : "opacity-80"} `}
                >
                  Low
                </span>
              ) : priority === "medium" ? (
                <span
                  className={` px-2 rounded-lg  text-white bg-yellow-600
                  ${status === "Closed" ? "opacity-50" : "opacity-80"} `}
                >
                  Medium
                </span>
              ) : (
                <span
                  className={` px-2 rounded-lg  text-white bg-red-600
                  ${status === "Closed" ? "opacity-50" : "opacity-80"} `}
                >
                  High
                </span>
              )}
            </span>
          </div>
          <div className="text-muted-foreground flex text-sm  items-center">
            <div>{assignedTo}, </div>
            <div>{new Date(createdAt).toLocaleDateString()}</div>
          </div>
        </div>
        <div>
          <p className="text-base">{description}</p>
        </div>

        <div className="text-muted-foreground flex justify-between items-center ">
          <div className="p-1 ">
            {issueType === "UI/UX" ? (
              <span className="text-blue-500  ">#UI/UX</span>
            ) : issueType === "Developer" ? (
              <span className="text-green-500 ">#Developer</span>
            ) : issueType === "QA" ? (
              <span className="text-yellow-500  ">#QA</span>
            ) : (
              <span className="text-red-500 ">#Other</span>
            )}
          </div>
          <div
            className={
              status === "Closed"
                ? "opacity-50"
                : "opacity-90 hover:text-gray-600"
            }
          >
            <MessageSquareText />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default IssueCard;
