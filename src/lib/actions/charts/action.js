"use server";

import IssueModel from "@/lib/models/issue";
import ConnectMongoDb from "@/lib/mongoConnect";
import { format, startOfToday, subDays } from "date-fns";

// Create a server action that fetches the data from the database and returns it to the client.
export async function getChartData() {
  await ConnectMongoDb();
  try {
    const currentDate = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(currentDate.getMonth() - 1);

    // Fetch issues created within the last month
    const issues = await IssueModel.find({
      createdAt: {
        $gte: oneMonthAgo,
        $lte: currentDate,
      },
    });

    // Initialize the data structures
    const barChartData = issues.reduce((acc, issue) => {
      const date = issue.createdAt.toISOString().split("T")[0];

      // Initialize date entry if not present
      if (!acc[date]) {
        acc[date] = { count: 0, priorities: {} };
      }

      // Count issues
      acc[date].count += 1;

      // Initialize priority entry if not present
      if (!acc[date].priorities[issue.priority]) {
        acc[date].priorities[issue.priority] = 0;
      }
      acc[date].priorities[issue.priority] += 1;

      return acc;
    }, {});

    // Convert to array format for BarChart
    const barChartDataArray = Object.entries(barChartData).map(
      ([date, values]) => ({
        date,
        count: values.count,
        priorities: values.priorities,
      })
    );

    // Format data for PieChart
    const pieChartData = issues.reduce(
      (acc, issue) => {
        const date = issue.createdAt.toISOString().split("T")[0];

        if (!acc.issueType[date]) {
          acc.issueType[date] = {};
        }
        if (!acc.status[date]) {
          acc.status[date] = {};
        }

        // Count issue types
        if (!acc.issueType[date][issue.issueType]) {
          acc.issueType[date][issue.issueType] = 0;
        }
        acc.issueType[date][issue.issueType] += 1;

        // Count statuses
        if (!acc.status[date][issue.status]) {
          acc.status[date][issue.status] = 0;
        }
        acc.status[date][issue.status] += 1;

        return acc;
      },
      { issueType: {}, status: {} }
    );

    // Initialize the data structure for status counts
    const lineChartData = issues.reduce((acc, issue) => {
      const createdDate = issue.createdAt.toISOString().split("T")[0];

      // Initialize date entry for createdAt if not present
      if (!acc[createdDate]) {
        acc[createdDate] = {
          createdAtCount: 0,
          closedCount: 0,
        };
      }

      // Count issues based on createdAt
      acc[createdDate].createdAtCount += 1;

      // Count statuses based on statusDates
      if (issue.statusDates && issue.statusDates.Closed) {
        const closedDate = new Date(issue.statusDates.Closed)
          .toISOString()
          .split("T")[0];

        // Initialize date entry for statusDates.Closed if not present
        if (!acc[closedDate]) {
          acc[closedDate] = {
            createdAtCount: 0,
            closedCount: 0,
          };
        }

        // Count issues based on statusDates.Closed
        acc[closedDate].closedCount += 1;
      }

      return acc;
    }, {});

    // console.log(lineChartDataArray);
    return {
      data: {
        barChartData: barChartDataArray,
        pieChartData,
        lineChartData,
      },
    };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong" };
  }
}

export async function getLineChartData() {
  try {
    await ConnectMongoDb();
    const currentDate = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(currentDate.getMonth() - 1);
    const issues = await IssueModel.find({
      createdAt: {
        $gte: oneMonthAgo,
        $lte: currentDate,
      },
    });
    const lineChartData = issues.reduce((acc, issue) => {
      const createdDate = issue.createdAt.toISOString().split("T")[0];

      // Initialize date entry for createdAt if not present
      if (!acc[createdDate]) {
        acc[createdDate] = {
          createdAtCount: 0,
          closedCount: 0,
        };
      }

      // Count issues based on createdAt
      acc[createdDate].createdAtCount += 1;

      // Count statuses based on statusDates
      if (issue.statusDates && issue.statusDates.Closed) {
        const closedDate = new Date(issue.statusDates.Closed)
          .toISOString()
          .split("T")[0];

        // Initialize date entry for statusDates.Closed if not present
        if (!acc[closedDate]) {
          acc[closedDate] = {
            createdAtCount: 0,
            closedCount: 0,
          };
        }

        // Count issues based on statusDates.Closed
        acc[closedDate].closedCount += 1;
      }

      return acc;
    }, {});

    return { data: lineChartData, error: null };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong" };
  }
}

// export async function getIssuestatusDates() {
//   //add date to statusDates object Closed key and value

//   await ConnectMongoDb();
//   try {
//     const currentDate = new Date();
//     const oneMonthAgo = new Date();
//     oneMonthAgo.setMonth(currentDate.getMonth() - 1);

//     const issues = await IssueModel.findByIdAndUpdate(
//       "669fdd67179b4cdbb0dfdffa",
//       {
//         $set: {
//           "statusDates.Open": currentDate,
//         },
//       },
//       { new: true }
//     );

//     return issues;
//   } catch (error) {
//     console.error(error);
//     return { error: "Something went wrong" };
//   }
// }

export const getIssuesStatusData = async () => {
  try {
    // Connect to MongoDB
    await ConnectMongoDb();

    // Get the start and end dates (last 90 days)
    const today = startOfToday();
    const startDate = subDays(today, 90);

    // Find issues that have statusDates within the 90-day range
    const issues = await IssueModel.find({
      $or: [
        { "statusDates.Open": { $gte: startDate } },
        { "statusDates.Closed": { $gte: startDate } },
      ],
    });

    // Create a map to store the count for each status by date
    const statusCountByDate = {};

    // Iterate over each issue and count statuses by date
    issues.forEach((issue) => {
      ["Open", "Closed"].forEach((status) => {
        const statusDate = issue.statusDates[status];
        if (statusDate) {
          const formattedDate = format(new Date(statusDate), "yyyy-MM-dd");

          // Initialize the date entry if it doesn't exist
          if (!statusCountByDate[formattedDate]) {
            statusCountByDate[formattedDate] = {
              date: formattedDate,
              Open: 0, // Initialize Open count
              Closed: 0, // Initialize Closed count
            };
          }

          // Increment the count for the relevant status
          statusCountByDate[formattedDate][status] += 1;
        }
      });
    });

    // Convert the map to an array of objects
    const statusCounts = Object.values(statusCountByDate);

    // Return the response
    return {
      success: true,
      data: statusCounts,
    };
  } catch (error) {
    console.error(error);
    return { success: false, error: error.message };
  }
};
