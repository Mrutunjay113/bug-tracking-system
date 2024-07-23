"use server";
import IssueModel from "@/lib/models/issue";
import ConnectMongoDb from "@/lib/mongoConnect";

export const getStackedBarChartData = async () => {
  try {
    await ConnectMongoDb();

    const today = new Date();
    const lastMonth = new Date(today);
    lastMonth.setMonth(today.getMonth() - 1);

    // Aggregating data by date, issueType, and status
    const issues = await IssueModel.aggregate([
      {
        $match: {
          createdAt: { $gte: lastMonth, $lte: today },
        },
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            issueType: "$issueType",
            status: "$status",
          },
          issueCount: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: { date: "$_id.date" },
          types: {
            $push: {
              type: "$_id.issueType",
              status: "$_id.status",
              count: "$issueCount",
            },
          },
        },
      },
      {
        $sort: { "_id.date": 1 },
      },
    ]);

    // Transforming the aggregated data into the required format
    const chartData = issues.map((issue) => {
      const dataByDate = {
        date: issue._id.date,
      };

      issue.types.forEach((type) => {
        dataByDate[`${type.type}_${type.status}`] = type.count;
      });

      return dataByDate;
    });

    // Example: { date: "2024-07-01", UIUX_Open: 5, UIUX_InProgress: 3, ... }

    return { success: true, data: chartData };
  } catch (error) {
    console.error(error);
    return { success: false, error: error.message };
  }
};
