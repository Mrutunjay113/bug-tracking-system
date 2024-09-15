import { getMemberById } from "@/lib/actions/team/member/action";

import Heading from "@/components/Heading";

import MemberDetails from "@/components/Team&Member-Comp/MemberDetailPage";

export default async function Page({ params }) {
  const { id } = params;
  const { data } = await getMemberById(id);
  const member = (await data?.member) || {};
  const teams = data?.team;

  return (
    <main>
      <div className="flex items-center border-b border-gray-400 gap-2 font-bold  margin-5 py-10 md:mb-10">
        <Heading
          headingTitle={`${member?.firstName} ${member?.lastName}'s Profile`}
          size="lg"
          className="uppercase md:ml-10 ml-4 tracking-wide"
        />
      </div>
      <MemberDetails member={member} team={teams} />
    </main>
  );
}
