"use server";
import mongoose from "mongoose";
import ConnectMongoDb from "@/lib/mongoConnect";
import IssueModel from "@/lib/models/issue";

export const createIssue = async (issueData) => {
  try {
    await ConnectMongoDb();
    console.log(`issueData`, issueData.title);
    const { title, description, priority, image, assignedTo, assignedBy } =
      issueData;

    const newIssue = new IssueModel({
      title,
      description,
      priority,
      image,
      assignedTo,
      assignedBy,
    });
    await newIssue.save();

    return { success: true, issue: JSON.parse(JSON.stringify(newIssue)) };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Something went wrong" };
  }
};
