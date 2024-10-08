"use client";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip } from "chart.js";

Chart.register(ArcElement, Tooltip);

const DonutPie = ({ chartData, CustomChartType }) => {
  console.log(chartData);
  console.log(CustomChartType);
  const customBackgroundStyle = {
    backgroundColor:
      CustomChartType === "priorityChart"
        ? chartData?.map((item) => {
            switch (item.name) {
              case "High":
                return "#F44336";
              case "Medium":
                return "#FF9800";
              case "Low":
                return "#4CAF50";
              default:
                return "#FFCE56";
            }
          })
        : ["#43A047", "#36A2EB", "#FFCE56", "#63FF84", "#FFffff"],
  };

  const data = {
    labels: chartData?.map((item) => item.name),
    datasets: [
      {
        label: "# of Issues",
        data: chartData.map((item) => item.value),
        backgroundColor: customBackgroundStyle.backgroundColor,

        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    aspectRatio: 1,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = "";

            label += " ";

            if (context.parsed !== null) {
              label += context.parsed;
            }
            return label;
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="h-20 w-20">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DonutPie;
