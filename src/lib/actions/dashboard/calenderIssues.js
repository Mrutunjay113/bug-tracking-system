"use server";
import IssueModel from "@/lib/models/issue";
import Member from "@/lib/models/Member";
import TeamModel from "@/lib/models/Team";
import User from "@/lib/models/User";
import ConnectMongoDb from "@/lib/mongoConnect";

export const getIssueByDate = async (date = "") => {
  await ConnectMongoDb();
  try {
    let issues;

    // If date is not provided, return all issues; otherwise, return issues for the provided date
    if (date === "") {
      issues = await IssueModel.find(
        {},
        {
          title: 1,
          description: 1,
          priority: 1,
          type: 1,
          status: 1,
          issueType: 1,
          dueDate: 1,
          createdAt: 1,
          team: 1,
          assignedTo: 1,
        }
      );
    } else {
      issues = await IssueModel.find({ dueDate: date });
    }

    // Fetch additional details for each issue
    const issueDetails = await Promise.all(
      issues.map(async (issue) => {
        const team = await TeamModel.findById(issue.team);
        const teamLeader = await User.findById(team.teamleader);
        const assignedMembers = await Member.find({
          _id: { $in: issue.assignedTo },
        });

        return {
          ...issue.toObject(),
          team: {
            ...team.toObject(),
            teamLeader: teamLeader.toObject(),
            members: assignedMembers.map((member) => member.toObject()),
          },
        };
      })
    );
    console.log("issueDetails", issueDetails);

    return {
      success: true,
      data: JSON.parse(JSON.stringify(issueDetails)),
    };
  } catch (error) {
    console.error("Error fetching issues:", error);
    return {
      success: false,
      message: "Failed to fetch issues",
    };
  }
};
