// import AddMember from "@/components/Team&Member-Comp/addMember";

import Heading from "@/components/Heading";
import Search from "@/components/search";
import { MemberTable } from "@/components/Team&Member-Comp/MemberTable";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchMembers, getMembers } from "@/lib/actions/team/member/action";
import { Button } from "@nextui-org/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default async function Page({ searchParams }) {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const response = await fetchMembers(q, page);
  const members = await response?.members;

  return (
    <main>
      <div className="bg-[color:var(--primary-2)] margin-5 py-10 flex justify-between">
        <Heading
          headingTitle="Members"
          size="lg"
          className="text-white uppercase md:ml-10 ml-4"
        />
        <div className="flex justify-between gap-4 mr-4">
          <Search placeholder="Search for a Member" />
          <Link href="/dashboard/members/add-member" className="">
            <Button color="primary" radius="sm" size="md" className="w-25">
              Add Member
              <span>
                <Plus size={18} />
              </span>
            </Button>
          </Link>
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <MemberTable data={members} />
      </Suspense>
    </main>
  );
}
