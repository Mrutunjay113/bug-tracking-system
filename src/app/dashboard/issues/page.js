// pages/issues.js (or any issues page component)

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Card from "@/components/Card";
import { toast } from "sonner";

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

  console.log(issues);
  return (
    <div className="">
      <h1 className="text-xl font-bold my-4">All Issues</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {issues &&
          issues?.map((issue) => (
            <Card
              key={issue.id}
              title={issue.title}
              description={issue.description}
              assignedBy={issue.assignedBy}
              createdAt={issue.createdAt}
            />
          ))}
      </div>
    </div>
  );
};

export default IssuesPage;
