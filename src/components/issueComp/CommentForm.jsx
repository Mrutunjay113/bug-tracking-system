"use client";
import React, { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "@nextui-org/button";
import { addCommentToIssue } from "@/lib/actions/issue/commentaction";
import { toast } from "sonner";

export const CommentForm = ({ issueId, userId }) => {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  console.log(`issueId`, issueId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment) return toast.error("Comment cannot be empty");
    try {
      setLoading(true);
      if (comment.trim()) {
        // Call your backend to add the comment

        console.log("Comment added", comment);
        const data = await addCommentToIssue(issueId, {
          comment,
          createdBy: userId,
        });

        setComment(""); // Clear the form
        toast.success("Comment added successfully");
      }
    } catch (err) {
      console.log(err);
      toast.error("Error adding comment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="gap-3 grid  mt-4">
        <Textarea
          className={`w-full border border-gray-300 rounded-md p-2`}
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <Button
          type="submit"
          color="primary"
          className="rounded-md"
          isDisabled={loading}
          isLoading={loading}
        >
          {loading ? "" : "Add Comment"}
        </Button>
      </form>
    </div>
  );
};
