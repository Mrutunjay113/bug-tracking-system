// import AddMember from "@/components/Team&Member-Comp/addMember";

import Heading from "@/components/Heading";
import { MemberTable } from "@/components/Team&Member-Comp/MemberTable";
import { buttonVariants } from "@/components/ui/button";
import { getMembers } from "@/lib/actions/team/member/action";
import Link from "next/link";
import { Suspense } from "react";

export default async function Page() {
  const { error, members } = await getMembers();
  if (error) {
    return <div>error</div>;
  }
  console
  const data = members;

  return (
    <main>
      <Heading headingTitle="Members" size="lg" className="mb-4 p-2" />
      <Suspense fallback="loading...">
        <MemberTable data={data} />
      </Suspense>
    </main>
  );
}
