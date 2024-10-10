"use server";
import IssueModel from "@/lib/models/issue";
import ConnectMongoDb from "@/lib/mongoConnect";
import { revalidatePath } from "next/cache";

export const updateIssue = async (data) => {
  try {
    // Connect to MongoDB
    await ConnectMongoDb();

    // Fetch the existing issue so we don't overwrite any fields in statusDates
    const existingIssue = await IssueModel.findById(data._id);

    if (!existingIssue) {
      return { success: false, error: "Issue not found" };
    }

    // Prepare the updated statusDates based on the current status
    const currentDate = new Date();
    const updatedStatusDates = {
      Open: existingIssue.statusDates.Open || null,
      InProgress: existingIssue.statusDates.InProgress || null,
      InReview: existingIssue.statusDates.InReview || null,
      Closed: existingIssue.statusDates.Closed || null,
    };

    // Update the appropriate field based on the new status
    if (data.status === "Open") {
      updatedStatusDates.Open = currentDate;
    } else if (data.status === "In Progress") {
      updatedStatusDates.InProgress = currentDate;
    } else if (data.status === "In Review") {
      updatedStatusDates.InReview = currentDate;
    } else if (data.status === "Closed") {
      updatedStatusDates.Closed = currentDate;
    }

    // Update the issue with new data, including the updated statusDates
    const updatedIssue = await IssueModel.findByIdAndUpdate(
      data._id,
      {
        title: data.title,
        description: data.description,
        dueDate: data.dueDate,
        priority: data.priority,
        issueType: data.issueType,
        status: data.status,
        statusDates: updatedStatusDates, // Preserve and update statusDates
      },
      { new: true }
    );

    // Return the updated issue
    return {
      success: true,
      updatedIssue: JSON.parse(JSON.stringify(updatedIssue)),
    };
  } catch (error) {
    console.error(error);
    return { success: false, error: error.message };
  } finally {
    revalidatePath("/dashboard/issues");
  }
};
