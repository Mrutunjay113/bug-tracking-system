"use client";
import React, { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "@nextui-org/button";
import { addCommentToIssue } from "@/lib/actions/issue/commentaction";

export const CommentForm = ({ issueId }) => {
  const [comment, setComment] = useState("");
  console.log(`issueId`, issueId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim()) {
      // Call your backend to add the comment

      console.log("Comment added", comment);
      const data = await addCommentToIssue(issueId, {
        comment,
        createdBy: "669e69907820ac1ac1c4cc1f",
      });
      console.log(data);
      setComment(""); // Clear the form
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="gap-3 grid  mt-4">
        <Textarea
          className="w-full p-2 border rounded-md"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button type="submit" color="primary" className="rounded-md">
          Add Comment
        </Button>
      </form>
    </div>
  );
};
