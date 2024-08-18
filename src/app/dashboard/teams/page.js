import Heading from "@/components/Heading";
import Search from "@/components/search";
import { MemberTable } from "@/components/Team&Member-Comp/MemberTable";
import { TeamTable } from "@/components/Team&Member-Comp/TeamTable";
import { Input } from "@/components/ui/input";
import { fetchTeams } from "@/lib/actions/team/action";
import { Button } from "@nextui-org/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { toast } from "sonner";

// `app/page.js` is the UI for the `/` URL
export default async function Page({ searchParams }) {
  // const { error, teams } = await getTeamsRole();

  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;

  // const q = "";
  // const page = 1;
  const response = await fetchTeams(q, page);
  const userss = await response.users;

  return (
    <main>
      <div className="bg-[#F6F6F6]  py-10 flex justify-between">
        <Heading
          headingTitle="Teams"
          size="lg"
          className="text-gray-800  uppercase tracking-wide md:ml-10 ml-4"
        />
        <div className="flex justify-between gap-4 mr-10">
          <Search placeholder="Search for a team" />
          <Link href="/dashboard/teams/add-team" className="">
            <Button
              color=""
              radius="sm"
              size="md"
              className="w-25 bg-white text-blue-700 font-semibold"
            >
              Add Team
              <span className="text">
                <Plus size={18} />
              </span>
            </Button>
          </Link>
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <TeamTable data={userss} />
      </Suspense>
    </main>
  );
}
