"use server";
import IssueModel from "@/lib/models/issue";
import ConnectMongoDb from "@/lib/mongoConnect";

export const getDonutChartData = async () => {
  try {
    await ConnectMongoDb();

    // Calculate the date for one month ago
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    // Fetch all issues
    const issues = await IssueModel.find({
      createdAt: { $gte: oneMonthAgo },
    }).lean();

    // Initialize the data structure
    const data = {};

    // Process the issues
    issues.forEach((issue) => {
      const dateKey = new Date(issue.createdAt).toISOString().split("T")[0];
      const type = issue.type;

      if (!data[dateKey]) {
        data[dateKey] = { type: {} };
      }

      if (!data[dateKey].type[type]) {
        data[dateKey].type[type] = 0;
      }

      data[dateKey].type[type]++;
    });

    // Convert to array of objects
    const result = Object.keys(data).map((date) => ({
      month: date,
      type: data[date].type,
    }));

    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: error.message };
  }
};
