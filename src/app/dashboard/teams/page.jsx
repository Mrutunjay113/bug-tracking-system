import Heading from "@/components/Heading";
import { MemberTable } from "@/components/Team&Member-Comp/MemberTable";
import { TeamTable } from "@/components/Team&Member-Comp/TeamTable";
import { getTeams, getTeamsRole } from "@/lib/actions/team/action";
import { Suspense } from "react";
import { Toaster } from "sonner";

// `app/page.js` is the UI for the `/` URL
export default async function Page() {
  const { error, teams } = await getTeamsRole();

  if (error) {
    return <Toaster type="error" message={error} />;
  }

  return (
    <main>
      <div className="bg-[color:var(--primary-2)] margin-5 py-10">
        <Heading
          headingTitle="Teams"
          size="lg"
          className="text-white uppercase ml-4"
        />
      </div>
      <Suspense fallback="loading...">
        <TeamTable data={teams} />
      </Suspense>
    </main>
  );
}
