import { getIssuesBYRecent } from "@/lib/actions/issue/action";
import RecentIssueCards from "./HomeComp/recentIssueCards";
import { Suspense } from "react";

export const RecentIssueCard = async () => {
  const response = await getIssuesBYRecent();

  let error = [];
  if (!response.success) {
    error = response.error;
  }
  const data = response.issues;

  return (
    <div className="p-3 rounded-md shadow-none border bg-white min-w-[300px]">
      <h1 className="font-semibold text-blue-600">Recent Activities</h1>
      <div className="md:max-h-[300px] md:h-full h-64 mt-2 overflow-y-scroll">
        <div className="rounded-md flex-col space-y-2">
          {data ? (
            data.map((issue, index) => (
              <RecentIssueCards issue={issue} index={index} key={issue._id} />
            ))
          ) : (
            <div className="text-red-500">{error}</div>
          )}
        </div>
      </div>
    </div>
  );
};
