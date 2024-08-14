"use client";
import { likeComment } from "@/lib/actions/issue/commentaction";
import { Heart } from "lucide-react";
import React, { useState } from "react";

const Like = ({ commentId, comment }) => {
  const [likes, setLikes] = useState(comment.likes != 0 ? true : false);
  const [likeCount, setLikeCount] = useState(comment.likes || 0);

  const handleLikes = async () => {
    if (likes) {
      setLikes(!likes);
      setLikeCount(likeCount - 1);
    } else {
      setLikes(!likes);
      setLikeCount(likeCount + 1);
      await likeComment(commentId);
    }
  };

  return (
    <div>
      <button className="flex items-center gap-1" onClick={handleLikes}>
        {likes ? (
          <Heart className="w-4" fill="red" color="red" />
        ) : (
          <Heart className="w-4" />
        )}
        <span>{likeCount}</span>
      </button>
    </div>
  );
};

export default Like;
