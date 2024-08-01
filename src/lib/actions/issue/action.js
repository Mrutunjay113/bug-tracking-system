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
  console.log(`formData`, formData);
  try {
    await ConnectMongoDb();
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value || null || "";
    });
    console.log(`data`, data);

    const issueFile = data?.issueImage;
    let issueImgUrl = "";
    console.log(`profilePictureFile`, issueFile[0]);
    const dataform = new FormData();
    dataform.append("file", issueFile);
    dataform.append("upload_preset", "issuepresent");
    if (!issueFile) {
      return { success: false, error: "No image provided" };
    }
    try {
      const uplodimage = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: dataform,
        }
      );
      const image = await uplodimage.json();
      // console.log(`image`, image);
      console.log(`image`, image.secure_url);
      issueImgUrl = image.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return { success: false, error: error.message };
    }
    // console.log(`profilePictureUrl`, profilePictureUrl);

    const newIssue = new IssueModel({
      title: data.title,
      description: data.description,
      priority: data.priority,
      issueType: data.issueType,
      image: issueImgUrl,
      assignedTo: data.assignedTo,
      team: data.team,
      type: data.type,
    });

    await newIssue.save();

    const setProjectMember = await Member.findOneAndUpdate(
      { _id: data.assignedTo },
      { $push: { tasks: newIssue._id } }
    );
    await setProjectMember.save();

    return { success: true, issue: JSON.parse(JSON.stringify(newIssue)) };

    // Save the member to the database
    // await newMember.save();
  } catch (error) {
    console.error(error);
    return { success: false, error: error.message };
  }
};

export const getIssueById = async (id) => {
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
      type: issue.type,
      dueDate: issue.dueDate,
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
