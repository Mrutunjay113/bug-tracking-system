"use client ";
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
    bug: "bg-red-400 ",
    feature: "bg-green-500",
    other: "bg-slate-500 ",
    improvement: "bg-yellow-500 ",
  };

  const classPriority = {
    low: "bg-green-200",
    medium: "bg-yellow-200",
    high: "bg-red-200",
  };
  console.log(issue);
  return (
    <div
      className={`mb-4 flex-row  p-2 
      bg-[#F4F6F7] rounded-md
${status === "Closed" ? "opacity-60" : "opacity-100"}
      `}
    >
      <Link href={`/dashboard/issues/${issue._id}`} className="space-y-4">
        <div className="relative ">
          <div className="flex justify-between items-center ">
            <span
              className={classNames(
                "px-2 rounded-lg  text-gray-700",
                classType[type]
              )}
            >
              {type}
            </span>{" "}
            <span className="relative items-center ml-4">
              <span
                className={classNames(
                  "px-2 rounded-lg  text-gray-700",
                  classPriority[priority]
                )}
              >
                {priority}
              </span>
            </span>
          </div>

          <div className="flex justify-between items-center mt-4">
            <h2 className="text-lg font-bold ">{title} </h2>
          </div>
          <div className="text-muted-foreground flex text-sm  items-center">
            <div>
              {assignedTo} - {new Date(createdAt).toLocaleDateString()}
            </div>
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
            className={`
            text-[#ff8952]

            status === "Closed" ? "opacity-50" : "opacity-90 "`}
          >
            <MessageSquareText />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default IssueCard;
