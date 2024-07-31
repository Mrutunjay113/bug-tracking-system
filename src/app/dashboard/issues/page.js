// pages/issues.js (or any issues page component)

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Card from "@/components/Card";
import { toast } from "sonner";
import IssueColumn from "@/components/issueComp/IssueColumn";
import Heading from "@/components/Heading";

const IssuesPage = async () => {
  const cookiesstore = cookies();
  const token = cookiesstore.get("token")?.value;
  if (!token) {
    toast.error("Unauthorized");
    redirect("/sign-in");
  }
  const date = "2024-07-01"; // Replace with your desired date filter

  const res = await fetch(`${process.env.URL}/api/data/issue/filter/${date}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const issue = await res.json();
  const issues = issue.issues;
  console.log(issues);
  // console.log(issues.issues);
  if (issues.success === false) {
    toast.error(issues.error);
  }
  const addIssue = issues.filter((issue) => issue.status === "Open");
  const inProgress = issues.filter((issue) => issue.status === "In Progress");
  const inReview = issues.filter((issue) => issue.status === "In Review");
  const done = issues.filter((issue) => issue.status === "Closed");
  // console.log(issues);
  return (
    <div className=" ">
      <div className="bg-[color:var(--primary-2)] margin-5 py-10">
        <Heading
          headingTitle="All Issues"
          size="lg"
          className="text-white uppercase ml-4"
        />
      </div>
      <div className=" md:pt-4">
        <div className=" mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-8 ">
          <IssueColumn title="TO DO" issues={addIssue} addissue={true} />
          <IssueColumn title="In Progress" issues={inProgress} />
          <IssueColumn title="In Review" issues={inReview} />
          <IssueColumn title="Done" issues={done} />
        </div>
      </div>
    </div>
  );
};

export default IssuesPage;
