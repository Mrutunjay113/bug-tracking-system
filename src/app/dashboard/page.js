import SimpleCalendar from "@/components/Calender";
import Heading from "@/components/Heading";
import HomeCharts from "@/components/HomeComp/HomeCharts";

import { getDashboardCounts } from "@/lib/actions/dashboard/DashboardCount";
import { RecentIssueCard } from "@/components/recentIssueCard";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/dist/server/api-utils";
import CustomCalendar from "@/components/Mycalender";
import { cookies } from "next/headers";

const Page = async () => {
  const session = await getServerSession(authOptions);
  console.log(`session`, session);
  const { success, dashboardCount, error } = await getDashboardCounts();
  const data = dashboardCount;

  return (
    <main>
      <div className="bg-[color:var(--primary-2)] margin-5 py-10">
        <Heading
          headingTitle="Dashboard"
          size="lg"
          className="text-white uppercase md:ml-10 ml-4"
        />
      </div>
      <div className="md:p-8 p-2 ">
        <div className="md:flex md:gap-2 w-full">
          <HomeCharts data={data} />
        </div>

        <div className="mt-2 md:flex md:w-fit w-full md:justify-end gap-2 md:space-y-0 space-y-2">
          {/* <SimpleCalendar /> */}
          <CustomCalendar />
          <RecentIssueCard />
        </div>
      </div>
    </main>
  );
};

export default Page;
