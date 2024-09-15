import Heading from "@/components/Heading";
import IssueDetailComp from "@/components/issueComp/issueDetailComp";
import { SkeletonDemo } from "@/components/skeletonLoadings/member";
import { getIssueById } from "@/lib/actions/issue/action";
import { CalendarArrowUp, CalendarPlus, Flag, User, Users } from "lucide-react";
import Image from "next/image";
import { Suspense } from "react";

const IssueDetailsPage = async ({ params }) => {
  const { id } = params;
  const issueData = await getIssueById(id);
  const issue = issueData?.issues[0];

  return (
    <main className="relative">
      <div className="bg-[#F6F6F6] border-b border-gray-400  margin-5 py-10">
        <Heading
          headingTitle="Issue Details"
          size="lg"
          className="text-gray-800  uppercase tracking-wide md:ml-10 ml-4"
        />
      </div>
      <Suspense fallback={<div>loading</div>}>
        <IssueDetailComp issue={issue} />
      </Suspense>
    </main>
  );
};

export default IssueDetailsPage;
