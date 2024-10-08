import { Separator } from "../ui/separator";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import IssueCard from "./Issue_Card";
import { ScrollShadow } from "@nextui-org/scroll-shadow";

import { ScrollArea } from "../ui/scroll-area";

const IssueColumn = ({ title, issues, addissue, counts }) => {
  return (
    <div className="border mt-2 md:p-4 p-2 h-full bg-[var(--gray-2)] rounded-md">
      <div className="flex justify-between items-center my-2 ">
        <div className="flex items-center gap-4">
          <h2
            className={`text-lg font-bold text-[#323232] ${addissue ? "" : ""}`}
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

      <Separator className="bg-slate-400" />

      <div className="md:h-[650px] md:min-h-[400px] transition-all ease-in-out duration-1000 overflow-auto">
        {issues.map((issue, index) => (
          <IssueCard key={issue._id} issue={issue} index={index} />
        ))}
      </div>
    </div>
  );
};

export default IssueColumn;
