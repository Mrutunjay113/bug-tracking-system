import Heading from "@/components/Heading";
import { Barchart } from "@/components/HomeComp/BarChart";
import { LineChart2, LineChartComp } from "@/components/HomeComp/LineChart";
import { ShadDonut } from "@/components/HomeComp/ShadDonut";
import { getChartData } from "@/lib/actions/charts/action";

const Page = async () => {
  const data = await getChartData();
  const { barChartData, pieChartData, lineChartData } = data?.data;

  // const isue = await getIssuestatusDates();
  // console.log(`isue`, isue);

  return (
    <main className="h-lvh">
      <div className="bg-[#F6F6F6]margin-5 py-10 border-b border-gray-400">
        <Heading
          headingTitle="Analytics"
          size="lg"
          className="text-gray-800  uppercase tracking-wide md:ml-10 ml-4"
        />
      </div>
      <div className="md:flex py-5 md:space-y-0 space-y-4 gap-4 w-full md:p-8 p-2">
        <div className="md:w-2/6 ">
          <Barchart data={barChartData} />
        </div>

        <div className="md:w-2/6 ">
          <LineChart2 data={lineChartData} showLabel={true} />{" "}
        </div>
        <div className="md:w-2/6 ">
          <ShadDonut data={pieChartData} />
        </div>
      </div>
      <div className="w-full md:p-8 p-2">
        <LineChartComp />
      </div>
    </main>
  );
};

export default Page;
