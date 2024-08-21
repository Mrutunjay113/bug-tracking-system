"use server";
import mongoose from "mongoose";
import ConnectMongoDb from "@/lib/mongoConnect";
import IssueModel from "@/lib/models/issue";
import { cookies } from "next/headers";
import TeamModel from "@/lib/models/Team";
import User from "@/lib/models/User";
import Member from "@/lib/models/Member";
import { comment } from "postcss";

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
      dueDate: data.dueDate,
    });

    await newIssue.save();

    const setProjectMember = await Member.findOneAndUpdate(
      { _id: data.assignedTo },
      { $push: { tasks: newIssue._id } }
    );
    await setProjectMember.save();

    return { success: true, issue: JSON.parse(JSON.stringify(newIssue)) };
    // return { success: true, issue: JSON.parse(JSON.stringify(data)) };

    // Save the member to the database
    // await newMember.save();
  } catch (error) {
    console.error(error);
    return { success: false, error: error.message };
  }
};
export const getIssueById = async (id) => {
  try {
    await ConnectMongoDb();

    // Fetch issue details
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

    // Extract user IDs from comments
    const commentUserIds = issues.flatMap((issue) =>
      issue.comments.map((comment) => comment.createdBy)
    );
    const uniqueUserIds = [...new Set(commentUserIds)];

    // Fetch user details for comment creators
    const commentUsers = await User.find({ _id: { $in: uniqueUserIds } });
    const commentUserMap = commentUsers.reduce((acc, user) => {
      acc[user._id] = `${user.firstName} ${user.lastName}`;
      return acc;
    }, {});

    // Format issues with comments including user details
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
      comments: issue.comments.map((comment) => ({
        _id: comment._id,
        createdId: comment.createdBy,
        text: comment.comment,
        createdBy: commentUserMap[comment.createdBy] || "Unknown User", // Map user ID to user name
        createdAt: comment.createdAt,

        likes: comment.likes || 0,
      })),
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

// export const getIssueById = async (id) => {
//   // console.log(`id`, id);
//   try {
//     await ConnectMongoDb();
//     const issues = await IssueModel.find({ _id: id });
//     const teamIds = issues.map((issue) => issue.team);
//     const assignedToIds = issues.map((issue) => issue.assignedTo);

//     // Fetch teams and users
//     const teams = await TeamModel.find({ _id: { $in: teamIds } });
//     const users = await Member.find({ _id: { $in: assignedToIds } });

//     // Create a map for easy lookup
//     const teamMap = teams.reduce((acc, team) => {
//       acc[team._id] = team.name;
//       return acc;
//     }, {});

//     const userMap = users.reduce((acc, user) => {
//       acc[user._id] = `${user.firstName} ${user.lastName}`;
//       return acc;
//     }, {});
//     //i have to get the comments and the user who created the comments and return the comments array with the user who created the comment

//     const getcreatedBy = issues.map((issue) =>
//       issue.comments.map((comment) => comment.createdBy)
//     );

//     console.log(`getcreatedBy`, getcreatedBy);

//     // Merge the data
//     const formattedIssues = issues.map((issue) => ({
//       _id: issue._id,
//       title: issue.title,
//       description: issue.description,
//       priority: issue.priority,
//       image: issue.image,
//       status: issue.status,
//       type: issue.type,
//       dueDate: issue.dueDate,
//       issueType: issue.issueType,
//       createdAt: issue.createdAt,
//       updatedAt: issue.updatedAt,
//       comments: issue.comments.map((comment) => ({
//         _id: comment._id,
//         text: comment.text,
//         createdBy: comment.createdBy,
//         createdAt: comment.createdAt,
//         likes: comment.likes || 0,
//       })),
//       team: teamMap[issue.team] || null, // Get team name
//       assignedTo: userMap[issue.assignedTo] || null, // Get full name of assignedTo
//     }));

//     return {
//       success: true,
//       issues: JSON.parse(JSON.stringify(formattedIssues)),
//     };
//   } catch (error) {
//     console.error(error);
//     return { success: false, error: error.message };
//   }
// };

export const getIssuesBYRecent = async (last = 5) => {
  try {
    ConnectMongoDb();
    const issues = await IssueModel.find({})
      .sort({ createdAt: -1 })
      .limit(last);
    return { success: true, issues: JSON.parse(JSON.stringify(issues)) };
  } catch (error) {
    console.error(error);
    return { success: false, error: error.message };
  }
};
