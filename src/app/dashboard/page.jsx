import SimpleCalendar from "@/components/Calender";
import Heading from "@/components/Heading";
import HomeCharts from "@/components/HomeComp/HomeCharts";
import { CalendarDemo } from "@/components/shadCalender";

import { getDashboardCounts } from "@/lib/actions/dashboard/DashboardCount";
import User from "@/lib/models/User";
import { RecentIssueCard } from "@/components/recentIssueCard";

import { toast } from "sonner";

const Page = async () => {
  const { success, dashboardCount, error } = await getDashboardCounts();

  if (!success) {
    return toast.error(error);
  }
  const data = dashboardCount;
  console.log(`data`, data);

  return (
    <main>
      <div>
        <div className="bg-[color:var(--primary-2)] margin-5 py-10">
          <Heading
            headingTitle="Dashboard"
            size="lg"
            className="text-white uppercase ml-4"
          />
        </div>
        <div className="md:p-8 p-2 ">
          <div className="flex gap-2  w-full">
            <div className="w-full">
              <HomeCharts data={data} />
            </div>
          </div>

          <div className="mt-2 flex gap-2">
            {/* <SimpleCalendar /> */}
            <CalendarDemo />
            <RecentIssueCard />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
