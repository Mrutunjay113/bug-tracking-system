import Heading from "@/components/Heading";
import IssueDetailComp from "@/components/issueComp/issueDetailComp";
import { getIssueById } from "@/lib/actions/issue/action";
import { CalendarArrowUp, CalendarPlus, Flag, User, Users } from "lucide-react";
import Image from "next/image";
import { Suspense } from "react";

const IssueDetailsPage = async ({ params }) => {
  const { id } = params;

  return (
    <main className="  relative">
      <div className="bg-[color:var(--primary-2)] margin-5 py-10 md:mb-10">
        <Heading
          headingTitle="Issue Details"
          size="lg"
          className="text-white uppercase ml-10"
        />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <IssueDetailComp id={id} />
      </Suspense>
    </main>
  );
};

export default IssueDetailsPage;
