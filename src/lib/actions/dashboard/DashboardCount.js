import IssueModel from "@/lib/models/issue";
import Member from "@/lib/models/Member";
import TeamModel from "@/lib/models/Team";
import ConnectMongoDb from "@/lib/mongoConnect";
import { subMonths } from "date-fns";

export const getDashboardCounts = async () => {
  try {
    // Connect to MongoDB
    await ConnectMongoDb();

    // Calculate the date range: from one month ago to the current date
    const toDate = new Date();
    const fromDate = subMonths(toDate, 1);

    // Fetch data in parallel
    const [
      memberCountData,
      issueData,
      totalMembers,
      teamCountData,
      totalTeams,
    ] = await Promise.all([
      Member.aggregate([
        {
          $group: {
            _id: "$designation",
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
      ]),
      IssueModel.aggregate([
        {
          $match: {
            createdAt: { $gte: fromDate, $lte: toDate },
          },
        },
        {
          $group: {
            _id: null,
            totalIssues: { $sum: 1 },
            statusOpen: {
              $sum: { $cond: [{ $eq: ["$status", "Open"] }, 1, 0] },
            },
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
      ]),
      Member.countDocuments(),
      TeamModel.aggregate([
        {
          $group: {
            _id: "$TeamRole",
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
      ]),
      TeamModel.countDocuments(),
    ]);

    // Transform the member count data into a key-value object
    const MemberCount = memberCountData.reduce((acc, { _id, count }) => {
      acc[_id] = count;
      return acc;
    }, {});

    // Transform the team count data into a key-value object
    const TeamCount = teamCountData.reduce((acc, { _id, count }) => {
      acc[_id] = count;
      return acc;
    }, {});

    // Prepare the final response object
    const dashboardCount = {
      totalIssue: issueData[0]?.totalIssues || 0,
      StatusOpen: issueData[0]?.statusOpen || 0,
      StatusClose: issueData[0]?.statusClose || 0,
      StatusReview: issueData[0]?.statusReview || 0,
      StatusProgress: issueData[0]?.statusProgress || 0,
      Priority: {
        totalPriority:
          (issueData[0]?.priorityHigh || 0) +
          (issueData[0]?.priorityMedium || 0) +
          (issueData[0]?.priorityLow || 0),
        high: issueData[0]?.priorityHigh || 0,
        medium: issueData[0]?.priorityMedium || 0,
        low: issueData[0]?.priorityLow || 0,
      },
      membersCount: {
        totalMembers,
        ...MemberCount,
      },
      teamCount: {
        totalTeams,
        ...TeamCount,
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
