// pages/issues.js (or any issues page component)

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Card from "@/components/Card";
import { toast } from "sonner";
import IssueColumn from "@/components/issueComp/IssueColumn";

const IssuesPage = async () => {
  const cookiesstore = cookies();
  const token = cookiesstore.get("token")?.value;
  if (!token) {
    toast.error("Unauthorized access. Please login first.");
  }
  const date = "2024-07-17"; // Replace with your desired date filter

  const res = await fetch(`${process.env.URL}/api/data/issue/filter/${date}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const issue = await res.json();
  const issues = issue.issues;
  // console.log(issues.issues);
  if (issues.success === false) {
    toast.error(issues.error);
  }
  const addIssue = issues.filter((issue) => issue.status === "Open");
  const inProgress = issues.filter((issue) => issue.status === "In Progress");
  const inReview = issues.filter((issue) => issue.status === "In Review");
  const done = issues.filter((issue) => issue.status === "Completed");
  // console.log(issues);
  return (
    <div className="md:container mx-auto max-w-screen-2xl md:mt-8">
      <h1 className="text-2xl font-bold my-4">All Issues</h1>
      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-8 ">
        <IssueColumn title="TO DO" issues={addIssue} addissue={true} />
        <IssueColumn title="In Progress" issues={inProgress} />
        <IssueColumn title="In Review" issues={inReview} />
        <IssueColumn title="Done" issues={done} />
      </div>
    </div>
  );
};

export default IssuesPage;
