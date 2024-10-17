"use client";

import Link from "next/link";
import React from "react";
import { buttonVariants } from "../ui/button";
import { ArrowRight, X } from "lucide-react";

const IssueDetailModal = ({ isOpen, onClose, issue }) => {
  if (!isOpen || !issue) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">{issue.title}</h2>
          <X
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition cursor-pointer"
          />
        </div>

        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            <strong>Status:</strong> {issue.status}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Due Date:</strong> {issue.dueDate}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Type:</strong> {issue.type}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Priority:</strong>{" "}
            <span className="font-medium">{issue.priority}</span>
          </p>
        </div>

        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700">Team Leader:</h3>
          <div className="flex items-center mt-2">
            <img
              src={issue.teamLeader.image}
              // src="https://d2u8k2ocievbld.cloudfront.net/memojis/male/4.png"
              alt={issue.team.teamLeader.firstName}
              className="w-10 h-10 rounded-full border border-gray-300"
            />
            <p className="ml-3 text-sm text-gray-600">
              {issue.team.teamLeader.firstName}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700">Assigned To:</h3>
          <div className="space-y-2 mt-2">
            {issue.team.members.map((member, index) => (
              <div key={index} className="flex items-center">
                <img
                  src={member.image}
                  // src="https://d2u8k2ocievbld.cloudfront.net/memojis/male/4.png"
                  alt={member.firstName}
                  className="w-10 h-10 rounded-full border border-gray-300"
                />
                <p className="ml-3 text-sm text-gray-600">{member.firstName}</p>
              </div>
            ))}
          </div>
        </div>

        {/* <button
          onClick={onClose}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Close
        </button> */}
        <Link
          href={`dashboard/issues/${issue._id}`}
          className={buttonVariants({
            variant: "",
            className: "gap-1.5 w-full bg-blue-600 mt-3",
          })}
        >
          View Detail <ArrowRight className="mr-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default IssueDetailModal;
