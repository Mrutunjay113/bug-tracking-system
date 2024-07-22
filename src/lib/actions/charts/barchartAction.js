"use server";
import IssueModel from "@/lib/models/issue";
import ConnectMongoDb from "@/lib/mongoConnect";

export const getBarChartData = async () => {
  try {
    await ConnectMongoDb();

    const today = new Date();
    const lastMonth = new Date(today);
    lastMonth.setMonth(today.getMonth() - 1);

    // Aggregating data by date
    const issues = await IssueModel.aggregate([
      {
        $match: {
          createdAt: { $gte: lastMonth, $lte: today },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          issueCount: { $sum: 1 },
          statusCount: {
            $sum: {
              $cond: [
                { $eq: ["$status", "Open"] }, // Adjust this condition based on status you want to count
                1,
                0,
              ],
            },
          },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // Transforming the aggregated data
    const chartData = issues.map((issue) => ({
      date: issue._id,
      Issue: issue.issueCount,
      Status: issue.statusCount,
    }));

    // Calculate total issue count
    const totalIssues = chartData.reduce((acc, curr) => acc + curr.Issue, 0);

    return { success: true, data: chartData, count: totalIssues };
  } catch (error) {
    console.error(error);
    return { success: false, error: error.message };
  }
};
