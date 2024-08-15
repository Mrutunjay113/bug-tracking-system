// pages/issues.js (or any issues page component)

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Card from "@/components/Card";
import { toast } from "sonner";
import IssueColumn from "@/components/issueComp/IssueColumn";
import Heading from "@/components/Heading";
import { Suspense } from "react";

const IssuesPage = async () => {
  const cookiesstore = cookies();
  const token = cookiesstore.get(
    "next-auth.session-token" || "__Secure-next-auth.session-token"
  )?.value;

  if (!token) {
    redirect("/sign-in");
  }
  const date = "2024-07-01"; // Replace with your desired date filter

  const res = await fetch(`${process.env.URL}/api/data/issue/filter/${date}`);
  const issue = await res.json();
  const issues = issue.issues;
  const counts = issue.counts;
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
          className="text-white uppercase md:ml-10 ml-4"
        />
      </div>
      <div className=" md:pt-4">
        <div className=" max-w-full md:px-10 px-3 grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-8 ">
          <Suspense fallback={<div>Loadings...</div>}>
            <IssueColumn
              title="TO DO"
              issues={addIssue}
              addissue={true}
              counts={counts.open}
            />
            <IssueColumn
              title="In Progress"
              issues={inProgress}
              counts={counts.inProgress}
            />
            <IssueColumn
              title="In Review"
              issues={inReview}
              counts={counts.inReview}
            />
            <IssueColumn title="Done" issues={done} counts={counts.closed} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default IssuesPage;
