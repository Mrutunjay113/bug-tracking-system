import React from "react";
import { Separator } from "../ui/separator";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import IssueCard from "./Issue_Card";
import { ScrollShadow } from "@nextui-org/scroll-shadow";

import { ScrollArea } from "../ui/scroll-area";

const IssueColumn = ({ title, issues, addissue, counts }) => {
  return (
    <div className=" ">
      <div className="flex justify-between items-center my-2 ">
        <div className="flex items-center gap-4">
          <h2
            className={`text-lg font-bold my-2 text-[#323232] ${
              addissue ? "" : ""
            }`}
          >
            {title}
          </h2>
          <span className="px-2 text-[var(--primary-1)] bg-[var(--gray-1)] font-semibold rounded-full">
            {counts}
          </span>
        </div>
        {addissue && (
          <Link
            href="/dashboard/issues/addissue"
            className={buttonVariants({
              variant: "",
              size: "sm",
              className: "",
            })}
          >
            Add Issue
          </Link>
        )}
      </div>

      <Separator />

      <ScrollArea className="max-h-[650px] mt-4  px-2   rounded-lg bg-[var(--gray-1)] ">
        {issues.map((issue) => (
          <IssueCard key={issue._id} issue={issue} />
        ))}
      </ScrollArea>
    </div>
  );
};

export default IssueColumn;
