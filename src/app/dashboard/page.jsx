import Heading from "@/components/Heading";
import HomeCharts from "@/components/HomeComp/HomeCharts";

import { getDashboardCounts } from "@/lib/actions/dashboard/DashboardCount";

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
            {/*  <div className="flex-row border w-fit ">
              {/* <HomeCard
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
            /> */}
            {/* <HomeCard
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
              <Separator />
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
              /> */}
            {/* </div>  */}

            <div className="w-full">
              {/* create a card in which show the total issues , issues open, issues closed? */}
              {/*   
              <Donut data={data} /> */}
              <HomeCharts data={data} />
            </div>
          </div>
          {/* <div className="mt-10  py-5  rounded-md">
            <Heading headingTitle="Charts" size="md" className="uppercase" />
            <div className="md:flex py-5 md:space-y-0 space-y-4 gap-4 w-full">
              <div className="md:w-2/6 ">
                <Barchart />
              </div>

              <div className="md:w-2/6 ">
                <LineChart2 />{" "}
              </div>
              <div className="md:w-2/6">
                <ShadDonut />
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </main>
  );
};

export default Page;
