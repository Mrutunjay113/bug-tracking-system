import Heading from "@/components/Heading";
import TeambyID from "@/components/Team&Member-Comp/TeambyID";
import { fetchTeamBYID, getTeamMembers } from "@/lib/actions/team/action";

export default async function Page({ params }) {
  const { id } = params;
  const getTeam = await fetchTeamBYID(id);
  console.log(`getTeam`, getTeam);
  return (
    <main className="w-full">
      <div className="bg-[#F6F6F6]margin-5 border-b mb-4 border-gray-400 py-10">
        <Heading
          headingTitle="Team Details"
          size="lg"
          className="text-gray-800  uppercase tracking-wide md:ml-10 ml-4"
        />
      </div>
      <TeambyID team={getTeam.users} />
    </main>
  );
}
