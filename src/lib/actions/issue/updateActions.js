"use server";
import IssueModel from "@/lib/models/issue";
import ConnectMongoDb from "@/lib/mongoConnect";
import { revalidatePath } from "next/cache";

export const updateIssue = async (data) => {
  try {
    await ConnectMongoDb();
    const updatedIssue = await IssueModel.findByIdAndUpdate(
      data._id,
      {
        title: data.title,
        description: data.description,
        dueDate: data.dueDate,
        priority: data.priority,
        issueType: data.issueType,
      },
      { new: true }
    );
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
