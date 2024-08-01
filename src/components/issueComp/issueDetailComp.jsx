import { getIssueById } from "@/lib/actions/issue/action";
import { CalendarArrowUp, CalendarPlus, Flag, User, Users } from "lucide-react";
import Image from "next/image";

const IssueDetailComp = async ({ id }) => {
  const issueData = await getIssueById(id);
  const issue = issueData?.issues[0];
  console.log(issue);
  return (
    <div className=" md:p-8 p-2 lg:flex justify-start mx-auto h-[calc(100vh-300px)] overflow-auto relative  ">
      <div className="md:w-1/2 ">
        <div className="mb-6 pb-4 ">
          <div className="flex items-center gap-2 ">
            <p className="text-md text-blue-500">#{issue.issueType}</p>
            {"|"}
            <p className="text-sm font-semibold font-mono text-white  px-2 rounded-full bg-blue-500 w-fit">
              {issue.type}
            </p>
          </div>

          <h1 className="text-3xl font-semibold text-gray-800  font-sans">
            {issue.title}
          </h1>
          <div>
            <span className="text-sm font-semibold text-gray-700 mr-2">
              Due Date: &nbsp;
              <span className="text-gray-500">
                {new Date(issue.dueDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <h2 className="text-md font-semibold text-gray-800 ">
              Description:
            </h2>
            <p className=" text-gray-700">{issue.description}</p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center ">
              <h3 className="text-md font-semibold text-gray-600 mr-2">
                Priority:
              </h3>
              <p className="text-lg text-gray-600 capitalize">
                {issue.priority}
              </p>
            </div>

            <div className="flex items-center">
              <h3 className="text-md font-semibold text-gray-600 mr-2">
                Status:
              </h3>
              <p className="text-md text-gray-600">{issue.status}</p>
            </div>
            <div className="flex items-center">
              <h3 className="text-md font-semibold text-gray-800 mr-2">
                Assigned :
              </h3>
              <p className="text-md text-gray-600">{issue.assignedTo}</p>
            </div>
            <div className="flex items-center">
              <h3 className="text-md font-semibold text-gray-800 mr-2">
                Team:
              </h3>
              <p className="text-md text-gray-600">{issue.team}</p>
            </div>
            <div className="flex items-center">
              <h3 className="text-md font-semibold text-gray-800 mr-2">
                Created At:
              </h3>
              <p className="text-md text-gray-600">
                {new Date(issue.createdAt).toLocaleDateString()} |{" "}
                {new Date(issue.createdAt).toLocaleTimeString()}
              </p>
            </div>
            <div className="flex items-center">
              <h3 className="text-md font-semibold text-gray-800 mr-2">
                Updated At:
              </h3>
              <p className="text-md text-gray-600">
                {new Date(issue.updatedAt).toLocaleDateString()} |{" "}
                {new Date(issue.updatedAt).toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>

        {/* {issue.image && ( */}

        {/* )} */}
      </div>

      <div className=" md:1/2 relative mt-4  min-w-80 ">
        <Image
          width={500}
          height={500}
          // src={issue.image || "/images/placeholder.png"}
          src="https://d2u8k2ocievbld.cloudfront.net/memojis/male/2.png"
          alt={issue.title}
          className="rounded-lg w-full  object-cover"
        />
      </div>
    </div>
  );
};

export default IssueDetailComp;
