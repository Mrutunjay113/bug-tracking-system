import { Heart } from "lucide-react";
import Comment from "postcss/lib/comment";
import React from "react";
import { CommentForm } from "./CommentForm";
import { likeComment } from "@/lib/actions/issue/commentaction";
import Like from "./Like";

const Comments = ({ issue }) => {
  console.log(`issue`, issue);
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
            <p className="font-medium tracking-wide">{comment.text}</p>
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
      <CommentForm issueId={issue._id} />
    </div>
  );
};

export default Comments;
