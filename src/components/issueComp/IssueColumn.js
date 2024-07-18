import React from "react";
import { Separator } from "../ui/separator";
import Card from "./Issue_Card";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";

const IssueColumn = ({ title, issues, addissue }) => {
  return (
    <div className=" rounded p-4 ">
      <h2
        className={`text-lg font-bold  text-[#323232] ${
          addissue ? "" : "mb-4"
        }`}
      >
        {title}
      </h2>
      {addissue && (
        <div className="my-4 ">
          <Link
            href="/dashboard/issues/addissue"
            className={buttonVariants({
              variant: "",
              className: "w-full",
            })}
          >
            Add Issue
          </Link>
        </div>
      )}
      <Separator />
      <div className="">
        {issues.map((issue) => (
          <Card key={issue._id} issue={issue} />
        ))}
      </div>
    </div>
  );
};

export default IssueColumn;
