import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import ConnectMongoDb from "@/lib/mongoConnect";
import IssueModel from "@/lib/models/issue";
import { cookies } from "next/headers";
import TeamModel from "@/lib/models/Team";
import User from "@/lib/models/User";
import Member from "@/lib/models/Member";

export async function GET(req, { params }) {
  console.log("params", params);
  const authHeader = req.headers.get("authorization");
  const token = authHeader && authHeader.split(" ")[1];
  console.log("token", token);
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) {
    return NextResponse.json({ error: "Unauthorized" });
  }
  try {
    await ConnectMongoDb();

    const { date } = params;
    const issues = await IssueModel.find({
      createdAt: {
        $gte: new Date(date),
      },
    });
    // Extract team and assignedTo IDs
    const teamIds = issues.map((issue) => issue.team);
    const assignedToIds = issues.map((issue) => issue.assignedTo);

    // Fetch teams and users
    const teams = await TeamModel.find({ _id: { $in: teamIds } });
    const users = await User.find({ _id: { $in: assignedToIds } });

    // Create a map for easy lookup
    const teamMap = teams.reduce((acc, team) => {
      acc[team._id] = team.name;
      return acc;
    }, {});

    const userMap = users.reduce((acc, user) => {
      acc[user._id] = `${user.firstName} ${user.lastName}`;
      return acc;
    }, {});

    // Merge the data
    const formattedIssues = issues.map((issue) => ({
      _id: issue._id,
      title: issue.title,
      description: issue.description,
      priority: issue.priority,
      image: issue.image,
      status: issue.status,
      issueType: issue.issueType,
      createdAt: issue.createdAt,
      updatedAt: issue.updatedAt,
      team: teamMap[issue.team] || null, // Get team name
      assignedTo: userMap[issue.assignedTo] || null, // Get full name of assignedTo
    }));

    return NextResponse.json({
      success: true,
      issues: formattedIssues,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" });
  }
}
