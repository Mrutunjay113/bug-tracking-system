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
    redirect("/sign-in");
    toast.error("Unauthorized");
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
    <div className=" mx-auto max-w-screen-2xl ">
      <Heading headingTitle="All Issues" size="lg" className="mb-4" />
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
