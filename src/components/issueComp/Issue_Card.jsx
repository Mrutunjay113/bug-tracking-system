import { MessageSquareText } from "lucide-react";
import React from "react";

const Card = ({ issue }) => {
  const {
    title,
    description,
    priority,
    issueType,
    assignedTo,
    status,
    createdAt,
  } = issue;

  return (
    <div
      className={`mt-4 flex-row space-y-4 p-2  ${
        priority === "high" ? "border-l-2 border-red-500 bg-red-100" : ""
      }`}
    >
      <div className="relative ">
        <div className="flex justify-between ">
          <h2 className="text-lg font-bold">{title} </h2>
          <span className="relative items-center">
            {priority === "low" ? (
              <span className=" px-2 rounded-lg  text-white bg-green-600 ">
                Low
              </span>
            ) : priority === "medium" ? (
              <span className=" px-2 rounded-lg  text-white bg-yellow-600 ">
                Medium
              </span>
            ) : (
              <span className=" px-2 rounded-lg  text-white bg-red-600 ">
                High
              </span>
            )}
          </span>
        </div>
        <div className="text-muted-foreground flex  items-center">
          <div>{assignedTo}, </div>
          <div>{new Date(createdAt).toLocaleDateString()}</div>
        </div>
      </div>

      <p className="text-gray-600">{description}</p>
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
        <div className="hover:text-gray-600 cursor-pointer">
          <MessageSquareText />
        </div>
      </div>
    </div>
  );
};

export default Card;
