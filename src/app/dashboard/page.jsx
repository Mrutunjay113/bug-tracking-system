import Heading from "@/components/Heading";
import HomeCard from "@/components/HomeComp/HomeCard";
import HomeCardCol from "@/components/HomeComp/HomeCardCol";
import { Button } from "@/components/ui/button";
import { getDashboardCounts } from "@/lib/actions/dashboard/DashboardCount";
import { Toaster } from "sonner";

const Page = async () => {
  const { success, dashboardCount, error } = await getDashboardCounts();

  if (!success) {
    return <Toaster message={error} />;
  }
  const data = dashboardCount;
  console.log(`data`, data);

  return (
    <main>
      <div>
        <div>
          <Heading headingTitle="Dashboard" size="lg" className="" />
        </div>

        <div className="md:grid md:grid-cols-6 gap-6 md:space-y-0 space-y-4">
          <HomeCard
            title="Total Issues"
            CardValue={data?.totalIssue || 0}
            lastweek=""
            percentage="60%"
          />
          <HomeCard
            title="Issues Open"
            CardValue={data.StatusOpen || 0}
            lastweek=""
            percentage="60%"
          />
          <HomeCard
            title="Issues Closed"
            CardValue={data.StatusClose || 0}
            lastweek=""
            percentage="60%"
          />
          <HomeCard
            title="Issues In Progress"
            CardValue={data.StatusProgress || 0}
            lastweek=""
            percentage="60%"
          />
          <HomeCard
            title="Priority Issues"
            CardValue={data.Priority.totalPriority || 0}
            lastweek=""
            percentage="60%"
            chart
            priorityChart
            chartData={[
              {
                name: "High",
                value: data.Priority ? data.Priority.high : 0,
              },
              {
                name: "Medium",
                value: data.Priority ? data.Priority.medium : 0,
              },
              {
                name: "Low",
                value: data.Priority ? data.Priority.low : 0,
              },
            ]}
          />
          <HomeCard
            title="Total Members"
            CardValue={data.membersCount.totalMembers || 0}
            lastweek=""
            percentage="60%"
            chart
            memberChart
            chartData={
              data?.membersCount
                ? Object.keys(data.membersCount)
                    .filter((key) => key !== "totalMembers") // Exclude the "totalMembers" key
                    .map((key) => ({
                      name: key,
                      value: data.membersCount[key],
                    }))
                : [{ name: "", value: 0 }]
            }
          />
        </div>
      </div>
    </main>
  );
};

export default Page;
