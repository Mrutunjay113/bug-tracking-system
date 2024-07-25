"use server";
import IssueModel from "@/lib/models/issue";
import ConnectMongoDb from "@/lib/mongoConnect";

export const getStackedBarChartData = async () => {
  try {
    await ConnectMongoDb();

    // Calculate the date for one month ago
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    // Define the aggregation pipeline
    const pipeline = [
      {
        $match: {
          createdAt: { $gte: oneMonthAgo },
        },
      },
      {
        $project: {
          date: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          type: "$type",
        },
      },
      {
        $group: {
          _id: { date: "$date", type: "$type" },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$_id.date",
          types: {
            $push: {
              k: "$_id.type",
              v: "$count",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          month: "$_id",
          type: { $arrayToObject: "$types" },
        },
      },
      {
        $sort: { month: 1 },
      },
    ];

    // Execute the aggregation pipeline
    const result = await IssueModel.aggregate(pipeline);

    // Return the result as JSON
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: error.message };
  }
};
