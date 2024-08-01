import IssueModel from "@/lib/models/issue";
import Member from "@/lib/models/Member";
import ConnectMongoDb from "@/lib/mongoConnect";

export const getDashboardCounts = async () => {
  try {
    // Connect to MongoDB
    await ConnectMongoDb();

    // Aggregation pipeline to count members by designation
    // Aggregation pipeline to count members by designation
    const MemberCountArray = await Member.aggregate([
      {
        $group: {
          _id: "$designation", // Group by designation
          count: { $sum: 1 }, // Count the number of members in each designation
        },
      },
      {
        $sort: { count: -1 }, // Sort the results in descending order of count
      },
    ]);
    const totalMember = MemberCountArray.reduce((acc, curr) => {
      return acc + curr.count;
    }, 0);

    // Transform the array of objects into a key-value object
    const MemberCount = MemberCountArray.reduce((acc, curr) => {
      acc[curr._id] = curr.count;
      return acc;
    }, {});

    // Aggregate data for issues
    const [result] = await IssueModel.aggregate([
      {
        $group: {
          _id: null,
          totalIssues: { $sum: 1 },
          statusOpen: { $sum: { $cond: [{ $eq: ["$status", "Open"] }, 1, 0] } },
          statusClose: {
            $sum: { $cond: [{ $eq: ["$status", "Closed"] }, 1, 0] },
          },
          statusProgress: {
            $sum: { $cond: [{ $eq: ["$status", "In Progress"] }, 1, 0] },
          },
          statusReview: {
            $sum: { $cond: [{ $eq: ["$status", "In Review"] }, 1, 0] },
          },
          priorityHigh: {
            $sum: { $cond: [{ $eq: ["$priority", "high"] }, 1, 0] },
          },
          priorityMedium: {
            $sum: { $cond: [{ $eq: ["$priority", "medium"] }, 1, 0] },
          },
          priorityLow: {
            $sum: { $cond: [{ $eq: ["$priority", "low"] }, 1, 0] },
          },
        },
      },
    ]);

    // Format the response
    const dashboardCount = {
      totalIssue: result.totalIssues || 0,
      StatusOpen: result.statusOpen || 0,
      StatusClose: result.statusClose || 0,
      StatusReview: result.statusReview || 0,
      StatusProgress: result.statusProgress || 0,
      Priority: {
        totalPriority:
          result.priorityHigh + result.priorityMedium + result.priorityLow,
        high: result.priorityHigh || 0,
        medium: result.priorityMedium || 0,
        low: result.priorityLow || 0,
      },
      membersCount: {
        totalMembers: totalMember,
        ...MemberCount,
      },
    };
    return {
      success: true,
      dashboardCount,
    };
  } catch (error) {
    console.error("Error fetching dashboard counts:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};
