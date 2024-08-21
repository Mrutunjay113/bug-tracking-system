"use server";

import IssueModel from "@/lib/models/issue";
import ConnectMongoDb from "@/lib/mongoConnect";
import { revalidatePath } from "next/cache";

// Example function to add a comment to an issue

export const addCommentToIssue = async (issueId, commentData) => {
  console.log(issueId);
  console.log(commentData);

  if (!issueId) {
    return {
      error: "Issue ID is required",
    };
  }
  if (!commentData || !commentData.comment) {
    return {
      error: "Comment data with required 'comment' field is required",
    };
  }
  await ConnectMongoDb();
  try {
    const issue = await IssueModel.findById(issueId);
    if (!issue) {
      return {
        error: "Issue not found",
      };
    }
    // Ensure the comments array exists
    if (!issue.comments) {
      issue.comments = [];
    }
    // Push the comment data to the comments array
    issue.comments.push(commentData);
    // Save the issue
    await issue.save();

    return {
      message: "Comment added successfully",
    };
  } catch (error) {
    return {
      error: error.message,
    };
  } finally {
    revalidatePath(`/dashboard/issues/${issueId}`);
  }
};
//get comments from issue by id and return the comments array with user who created the comment

export const getCommentsByIssueId = async (issueId) => {
  console.log(issueId);
  await ConnectMongoDb();
  try {
    const issue = await IssueModel.findById(issueId);

    //in issue model comments is an array of objects with createdBy field
    //we can populate the createdBy field with user data
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

// like a comment by id and return the updated comment
export const likeComment = async (commentId) => {
  await ConnectMongoDb();
  try {
    // Find the issue containing the comment
    const issue = await IssueModel.findOne({ "comments._id": commentId });

    if (!issue) {
      return { error: "Issue not found" };
    }

    // Find the comment
    const comment = issue.comments.find(
      (comment) => comment._id.toString() === commentId.toString()
    );

    if (!comment) {
      return { error: "Comment not found" };
    }

    // Update the likes field
    if (comment.likes !== undefined) {
      comment.likes += 1;
    } else {
      comment.likes = 1;
    }

    // Save the issue with the update comment like count only if the comment is found
    await IssueModel.updateOne(
      { "comments._id": commentId },
      { $set: { "comments.$.likes": comment.likes } }
    );

    return { message: "Comment liked", likes: comment.likes };
  } catch (error) {
    return { error: error.message };
  }
};

export const deleteComment = async (commentId, issueId) => {
  await ConnectMongoDb();
  try {
    // Find the issue containing the comment and pull the comment with the specified commentId
    const issue = await IssueModel.findOneAndUpdate(
      { "comments._id": commentId }, // Find the issue that contains the comment
      { $pull: { comments: { _id: commentId } } }, // Remove the comment with the given commentId
      { new: true } // Return the updated issue
    );

    if (!issue) {
      return { error: "Comment or issue not found", success: false };
    }

    return { message: "Comment deleted", success: true };
  } catch (error) {
    return { error: error.message, success: false };
  } finally {
    revalidatePath(`/dashboard/issues/${issueId}`);
  }
};
