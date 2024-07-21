import Heading from "@/components/Heading";
import { Barchart } from "@/components/HomeComp/BarChart";
import { LineChart2, LineChartComp } from "@/components/HomeComp/LineChart";
import { ShadDonut } from "@/components/HomeComp/ShadDonut";

const Page = () => {
  return (
    <main>
      <Heading headingTitle="Analytics" size="lg" className="mb-4" />
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
      <div className="w-full ">
        <LineChartComp />
      </div>
    </main>
  );
};

export default Page;
