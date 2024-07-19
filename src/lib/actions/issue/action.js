"use server";
import mongoose from "mongoose";
import ConnectMongoDb from "@/lib/mongoConnect";
import IssueModel from "@/lib/models/issue";
import { cookies } from "next/headers";
import { VerifyJwtToken } from "@/lib/utils";
import TeamModel from "@/lib/models/Team";
import User from "@/lib/models/User";
import Member from "@/lib/models/Member";

export const createIssue = async (formData) => {
  try {
    await ConnectMongoDb();
    const {
      title,
      description,
      priority,
      assignedTo,
      assignedBy,
      team,
      image,
      issueType,
    } = formData;

    // Handle cases where 'image' might be an array or undefined
    const imageField =
      Array.isArray(image) && image.length > 0 ? image[0].path : "";

    const newIssue = new IssueModel({
      title,
      description,
      priority,
      image,
      assignedTo,
      assignedBy,
      image: imageField,
      team,
      issueType,
    });

    await newIssue.save();

    return { success: true, issue: JSON.parse(JSON.stringify(newIssue)) };
  } catch (error) {
    console.error(error);
    return { success: false, error: error.message };
  }
};

export const getIssueById = async (id) => {
  const cookie = cookies();
  const token = cookie.get("token");
  console.log(token);
  const auth = VerifyJwtToken(token.value);
  if (!id) return { success: false, error: "No ID provided" };
  if (!auth) return { success: false, error: "Unauthorized user" };
  // console.log(`id`, id);
  try {
    await ConnectMongoDb();
    const issues = await IssueModel.find({ _id: id });
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

    return {
      success: true,
      issues: JSON.parse(JSON.stringify(formattedIssues)),
    };
  } catch (error) {
    console.error(error);
    return { success: false, error: error.message };
  }
};
