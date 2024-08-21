import { Delete, Heart, Trash2 } from "lucide-react";
import Comment from "postcss/lib/comment";
import React from "react";
import { CommentForm } from "./CommentForm";
import { likeComment } from "@/lib/actions/issue/commentaction";
import Like from "./Like";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { useSession } from "next-auth/react";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import Deletecomment from "./Deletecomment";

const Comments = async ({ issue }) => {
  console.log(`issue`, issue);
  const token = await getServerSession(authOptions);

  //check if user id is matched with the user who created the comment to allow edit or delete

  const userId = token?.user?._id;
  console.log(`userId`, userId);

  return (
    <div className="mt-6 border rounded-md p-4 bg-gray-50">
      <h2 className="text-base font-semibold text-gray-800">
        {issue.comments.length > 1 ? "Comments" : "Add Comment"}
      </h2>
      {issue.comments ? (
        issue.comments.map((comment) => (
          <div
            key={comment._id}
            className="mt-4 p-4 border border-gray-300 rounded-md"
          >
            <div className="flex justify-between items-center">
              {" "}
              <span className="font-medium tracking-wide">{comment.text}</span>
              <span>
                <Deletecomment
                  userId={userId}
                  issueId={issue._id}
                  createdId={comment.createdId}
                  commentId={comment._id}
                />
              </span>
            </div>

            <p className="text-muted-foreground text-sm">
              Posted by {comment.createdBy || ""}
            </p>

            <div className="flex justify-between items-center gap-2 mt-2">
              <Like commentId={comment._id} comment={comment} />
              <span className="text-muted-foreground text-sm">
                {new Date(comment.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}{" "}
                at{" "}
                {new Date(comment.createdAt).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                })}
              </span>
            </div>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-600">No comments yet.</p>
      )}
      <CommentForm issueId={issue._id} userId={userId} />
    </div>
  );
};

export default Comments;
