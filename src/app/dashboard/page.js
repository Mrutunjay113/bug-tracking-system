import SimpleCalendar from "@/components/Calender";
import Heading from "@/components/Heading";
import HomeCharts from "@/components/HomeComp/HomeCharts";

import { getDashboardCounts } from "@/lib/actions/dashboard/DashboardCount";
import { RecentIssueCard } from "@/components/recentIssueCard";
import { authOptions } from "../api/auth/[...nextauth]/options";
import CustomCalendar from "@/components/Mycalender";
import { cookies } from "next/headers";
import { getLineChartData } from "@/lib/actions/charts/action";
import HomeCardCol from "@/components/HomeComp/HomeCardCol";

const Page = async () => {
  const { success, dashboardCount, error } = await getDashboardCounts();
  let data = null;
  let errors = null;
  if (success) {
    data = dashboardCount;
  } else {
    errors = error;
  }
  const lineChartData = await getLineChartData();
  const lineData = lineChartData.data;
  if (lineChartData.error) {
    errors = lineChartData.error;
  }
  console.log(data);

  return (
    <main>
      <div className="bg-[#F6F6F6] border-b border-gray-400  margin-5 py-10">
        <Heading
          headingTitle="Dashboard"
          size="lg"
          className="text-gray-800  uppercase tracking-wide md:ml-10 ml-4"
        />
      </div>
      <div className="md:p-8 p-2 ">
        <HomeCardCol data={data} />
        <div className="md:flex md:gap-4 mt-10">
          <HomeCharts data={data} lineData={lineData} />
        </div>

        <div className="mt-5 md:flex md:w-fit w-full md:justify-end gap-4 md:space-y-0 space-y-2">
          <CustomCalendar />
          <RecentIssueCard />
        </div>
      </div>
    </main>
  );
};

export default Page;
