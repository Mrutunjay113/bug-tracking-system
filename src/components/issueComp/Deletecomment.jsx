"use client";
import { deleteComment } from "@/lib/actions/issue/commentaction";
import { Trash2 } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const Deletecomment = ({ userId, createdId, commentId, issueId }) => {
  const handleDeleteComment = async () => {
    console.log(`commentId`, commentId);
    const { error, success } = await deleteComment(commentId, issueId);
    if (error) {
      console.log(`error`, error);
    }
    if (success) {
      const promise = () =>
        new Promise((resolve) =>
          setTimeout(() => resolve({ name: "deleted" }), 1000)
        );

      toast.promise(promise, {
        loading: "Loading...",
        success: (data) => {
          return `Comment ${data.name} successfully`;
        },
        error: "Error",
      });
    }
  };
  return (
    <div>
      {userId === createdId && (
        <Trash2
          size={19}
          className="cursor-pointer text-red-400 hover:text-red-600"
          onClick={handleDeleteComment}
        />
      )}
    </div>
  );
};

export default Deletecomment;
