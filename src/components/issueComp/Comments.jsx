import { Heart } from "lucide-react";
import Comment from "postcss/lib/comment";
import React from "react";
import { CommentForm } from "./CommentForm";
import { likeComment } from "@/lib/actions/issue/commentaction";
import Like from "./Like";

const Comments = ({ issue }) => {
  return (
    <div className="mt-6 border rounded-md p-4 bg-gray-100">
      <h2 className="text-md font-semibold text-gray-800">Comments:</h2>
      {issue.comments ? (
        issue.comments.map((comment) => (
          <div
            key={comment._id}
            className="mt-4 p-4 border border-gray-300 rounded-md"
          >
            <p className="font-medium tracking-wide">{comment.text}</p>
            <p className="text-muted-foreground text-sm">
              Posted by {comment.createdBy || ""} on{" "}
              {new Date(comment.createdAt).toLocaleDateString()} at{" "}
              {new Date(comment.createdAt).toLocaleTimeString()}
            </p>

            <div className="flex items-center gap-2 mt-2">
              <Like commentId={comment._id} comment={comment} />
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
