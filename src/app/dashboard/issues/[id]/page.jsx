import Heading from "@/components/Heading";
import IssueDetailComp from "@/components/issueComp/issueDetailComp";
import { getIssueById } from "@/lib/actions/issue/action";
import { CalendarArrowUp, CalendarPlus, Flag, User, Users } from "lucide-react";
import Image from "next/image";
import { Suspense } from "react";

const IssueDetailsPage = async ({ params }) => {
  const { id } = params;

  return (
    <main className=" p-6 relative">
      <Heading headingTitle="Issue Details" size="lg" className="" />
      <Suspense fallback={<div>Loading...</div>}>
        <IssueDetailComp id={id} />
      </Suspense>
    </main>
  );
};

export default IssueDetailsPage;
