import { fetchTeamBYID, getTeamMembers } from "@/lib/actions/team/action";

export default async function Page({ searchParams }) {
  const getTeam = await fetchTeamBYID("669e6a8ef66cf9bed6466632");
  console.log(`getTeam`, getTeam);
  return <main></main>;
}
