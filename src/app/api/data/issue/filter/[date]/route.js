import { NextResponse } from "next/server";
import ConnectMongoDb from "@/lib/mongoConnect";
import IssueModel from "@/lib/models/issue";
import { cookies } from "next/headers";
import TeamModel from "@/lib/models/Team";
import User from "@/lib/models/User";
import Member from "@/lib/models/Member";
import { decode } from "next-auth/jwt";

export async function GET(req, { params }) {
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
    const users = await Member.find({ _id: { $in: assignedToIds } });

    // Create a map for easy lookup
    const teamMap = teams.reduce((acc, team) => {
      acc[team._id] = team.name;
      return acc;
    }, {});

    const userMap = users.reduce((acc, user) => {
      // console.log("user", user);
      //get full name and image
      acc[user._id] = {
        name: `${user.firstName} ${user.lastName}`,
        image: user.profileImg ? user.profileImg : "",
      };

      return acc;
    }, {});

    // Merge the data
    const formattedIssues = issues.map((issue) => ({
      _id: issue._id,
      title: issue.title,
      description: issue.description,
      priority: issue.priority,
      image: issue.image,
      type: issue.type,
      status: issue.status,
      issueType: issue.issueType,
      dueDate: issue.dueDate,
      createdAt: issue.createdAt,
      updatedAt: issue.updatedAt,
      team: teamMap[issue.team] || null, // Get team name
      assignedTo: issue.assignedTo.map((userId) => userMap[userId] || null),
    }));
    const count = {
      open: formattedIssues.filter((issue) => issue.status === "Open").length,
      inProgress: formattedIssues.filter(
        (issue) => issue.status === "In Progress"
      ).length,
      inReview: formattedIssues.filter((issue) => issue.status === "In Review")
        .length,
      closed: formattedIssues.filter((issue) => issue.status === "Closed")
        .length,
    };
    console.log("count", formattedIssues);

    return NextResponse.json({
      success: true,
      issues: formattedIssues,
      counts: count,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong", success: false });
  }
}
