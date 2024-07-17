// pages/issues.js (or any issues page component)

import { cookies } from "next/headers";

const IssuesPage = async () => {
  const cookiesstore = cookies();
  const token = cookiesstore.get("token")?.value;
  if (!token) {
    throw new Error("No token found");
  }
  const date = "2024-07-17"; // Replace with your desired date filter

  const res = await fetch(`${process.env.URL}/api/data/issue/filter/${date}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const issues = await res.json();

  console.log(issues);
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold my-4">All Issues {token.value}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {issues?.map((issue) => (
          <div key={issue._id} className="bg-white shadow-md p-4 rounded-md">
            <h2 className="text-xl font-bold">{issue.title}</h2>
            <p className="text-sm text-muted-foreground">{issue.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IssuesPage;
