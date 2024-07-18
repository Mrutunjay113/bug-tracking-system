import IssueDetailComp from "@/components/issueComp/issueDetailComp";
import { getIssueById } from "@/lib/actions/issue/action";
import { CalendarArrowUp, CalendarPlus, Flag, User, Users } from "lucide-react";
import Image from "next/image";
import { Suspense } from "react";

const IssueDetailsPage = async ({ params }) => {
  const { id } = params;
  

  return (
    <main className=" p-6 relative">
      <h1 className="text-4xl mb-10 uppercase font-medium relative">
        Issue Detail Page
      </h1>
      <Suspense fallback={<div>Loading...</div>}>
        <IssueDetailComp id={id} />
      </Suspense>
      {/* <div className=" md:flex justify-between mx-auto  relative bg-white  ">
        <div className="md:w-1/2 ">
          <div className="mb-6 border-b pb-4">
            <h1 className="text-2xl font-semibold text-gray-800 mb-2 font-sans">
              {issue.title}
            </h1>
            <p className="text-lg text-gray-500">{issue.issueType}</p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            <div>
              <h2 className="text-md font-semibold text-gray-800 ">
                Description:
              </h2>
              <p className=" text-gray-700">{issue.description}</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center ">
                <Flag className="w-5 h-5 mr-2 text-gray-600" />

                <p className="text-lg text-gray-600 capitalize">
                  {issue.priority}
                </p>
              </div>
              <div className="flex items-center">
                <h3 className="text-lg font-semibold text-gray-600 mr-2">
                  Status:
                </h3>
                <p className="text-lg text-gray-600">{issue.status}</p>
              </div>
              <div className="flex items-center">
                <User className="text-gray-600 mr-2" />

                <h3 className="text-lg font-semibold text-gray-800 mr-2">
                  Assigned :
                </h3>
                <p className="text-lg text-gray-600">{issue.assignedTo}</p>
              </div>
              <div className="flex items-center">
                <Users className="text-gray-600 mr-2" />

                <h3 className="text-lg font-semibold text-gray-800 mr-2">
                  Team:
                </h3>
                <p className="text-lg text-gray-600">{issue.team}</p>
              </div>
              <div className="flex items-center">
                <CalendarPlus className="text-gray-500 mr-2" />

                <h3 className="text-lg font-semibold text-gray-800 mr-2">
                  Created At:
                </h3>
                <p className="text-lg text-gray-600">
                  {new Date(issue.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center">
                <CalendarArrowUp className="text-gray-500 mr-2" />

                <h3 className="text-lg font-semibold text-gray-800">
                  Updated At:
                </h3>
                <p className="text-lg text-gray-600">
                  {new Date(issue.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* {issue.image && ( */}

      {/* )} */}
      {/* </div>

        <div className=" md:1/2 bg-green-200">
          <Image
            src={issue.image || "/images/placeholder.png"}
            alt={issue.title}
            width={600}
            height={400}
            className="rounded-lg shadow-md"
          />
        </div> */}
      {/* </div>  */}
    </main>
  );
};

export default IssueDetailsPage;
