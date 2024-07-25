import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import ConnectMongoDb from "@/lib/mongoConnect";
import IssueModel from "@/lib/models/issue";
import { cookies } from "next/headers";

export async function GET(req, { params }) {
  try {
    await ConnectMongoDb();

    // Calculate the date for one month ago
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    // Query the issues from the last month
    const issues = await IssueModel.find({
      createdAt: { $gte: oneMonthAgo },
    });

    // Initialize the data structure
    const data = {
      issueType: {},
      Status: {},
    };

    // Process the issues to populate the data structure
    issues.forEach((issue) => {
      const dateKey = issue.createdAt.toISOString().split("T")[0];

      // Update issueType
      if (!data.issueType[dateKey]) {
        data.issueType[dateKey] = {};
      }
      if (!data.issueType[dateKey][issue.type]) {
        data.issueType[dateKey][issue.type] = 0;
      }
      data.issueType[dateKey][issue.type]++;

      // Update Status
      if (!data.Status[dateKey]) {
        data.Status[dateKey] = {};
      }
      if (!data.Status[dateKey][issue.status]) {
        data.Status[dateKey][issue.status] = 0;
      }
      data.Status[dateKey][issue.status]++;
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" });
  }
}
