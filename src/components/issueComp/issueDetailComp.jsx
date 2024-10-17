import { getIssueById } from "@/lib/actions/issue/action";
import { CommentForm } from "./CommentForm";
import Comments from "./Comments";
import Image from "next/image";
import {
  CalendarArrowUp,
  CalendarClock,
  CalendarPlus,
  Circle,
  Flag,
  Heart,
  Loader,
  LoaderCircle,
  LucideSquareDashedKanban,
  Square,
  SquareCheckBig,
  Users,
} from "lucide-react";

const IssueDetailComp = async ({ issue }) => {
  return (
    <div className="p-4 lg:p-8 mx-auto max-w-7xl flex flex-col lg:flex-row gap-8">
      {/* Image Section */}
      <div className="lg:w-1/2 flex-shrink-0">
        <Image
          width={500}
          height={400}
          loading="lazy"
          src={
            issue.image ||
            // "https://d2u8k2ocievbld.cloudfront.net/memojis/male/2.png"
            "/assets/images/demon.jpg"
          }
          alt={issue.title}
          className="rounded-lg  object-cover"
        />
      </div>

      {/* Text Content Section */}
      <div className="lg:w-1/2 flex flex-col gap-6">
        <div className="flex flex-col lg:flex-row items-start gap-4 justify-between lg:gap-8 border-b-2 pb-4">
          <div className="flex flex-col ">
            <h1 className="text-3xl font-bold text-gray-900 capitalize">
              {issue.title}
            </h1>
            <div className="flex items-center mt-1">
              <div className="w-5 h-5 mr-2 flex items-center justify-center bg-gray-200 text-gray-600 rounded-full">
                <CalendarClock size={18} />
              </div>
              <div className="text-sm text-gray-600">
                <span className="text-gray-600 font-medium">Due Date:</span>{" "}
                {new Date(issue.dueDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>{" "}
          <div className="flex-shrink-0">
            <div className="text-blue-500 text-lg font-medium">
              #{issue.issueType}
            </div>
            <div className="mt-1 px-3 py-1 text-sm font-semibold text-white bg-blue-500 rounded-full w-fit">
              {issue.type}
            </div>
          </div>
        </div>

        <div className="space-y-4  ">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Description:{" "}
            </h2>
            <p className="text-gray-700 pb-3">{issue.description}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <div className="w-6 h-6 mr-2 flex items-center justify-center bg-gray-200 text-gray-600 rounded-full">
                <Flag />
              </div>
              <div className="text-sm text-gray-600">
                <span className="text-gray-800 font-semibold">Priority:</span>{" "}
                <span className="text-gray-600 font-normal">
                  {issue.priority}
                </span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 mr-2 flex items-center justify-center bg-gray-200 text-gray-600 rounded-full">
                {issue.status === "Open" ? (
                  <Circle />
                ) : issue.status === "Closed" ? (
                  <SquareCheckBig />
                ) : issue.status === "In Progress" ? (
                  <Loader />
                ) : (
                  <LucideSquareDashedKanban />
                )}
              </div>
              <div className="text-sm text-gray-600">
                <span className="text-gray-800 font-semibold">Status:</span>{" "}
                <span className="text-gray-600 font-normal">
                  {issue.status}
                </span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 mr-2 flex items-center justify-center bg-gray-200 text-gray-600 rounded-full">
                <Users />
              </div>
              <div className="text-sm text-gray-600">
                <span className="text-gray-800 font-semibold">
                  Assigned to:
                </span>{" "}
                <span className="text-gray-600 font-normal">
                  {issue.assignedTo}
                </span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 mr-2 flex items-center justify-center bg-gray-200 text-gray-600 rounded-full">
                <Users />
              </div>
              <div className="text-sm text-gray-600">
                <span className="text-gray-800 font-semibold">Team:</span> {""}
                <span className="text-gray-600 font-normal">{issue.team}</span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 mr-2 flex items-center justify-center bg-gray-200 text-gray-600 rounded-full">
                <CalendarPlus />
              </div>
              <div className="text-sm text-gray-600">
                <span className="text-gray-800 font-semibold">Created At:</span>{" "}
                <span className="text-gray-600 font-normal">
                  {" "}
                  {new Date(issue.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}{" "}
                  |{" "}
                  {new Date(issue.createdAt).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </span>{" "}
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 mr-2 flex items-center justify-center bg-gray-200 text-gray-600 rounded-full">
                <CalendarArrowUp />
              </div>
              <div className="text-sm text-gray-600">
                <span className="text-gray-800 font-semibold">Updated At:</span>{" "}
                <span className="text-gray-600 font-normal">
                  {new Date(issue.updatedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}{" "}
                  |{" "}
                  {new Date(issue.updatedAt).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* <CommentForm issueId={id} data={issue} /> */}
        <Comments issue={issue} />
      </div>
    </div>
  );
};

export default IssueDetailComp;
