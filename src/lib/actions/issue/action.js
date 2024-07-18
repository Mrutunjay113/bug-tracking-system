"use server";
import mongoose from "mongoose";
import ConnectMongoDb from "@/lib/mongoConnect";
import IssueModel from "@/lib/models/issue";

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
