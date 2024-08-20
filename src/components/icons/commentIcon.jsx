import React from "react";

const CommentIconWithValue = ({ value }) => {
  return (
    <div className="relative flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-message-square-plus"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        {/* <path d="M12 7v6" /> */}
        {/* <path d="M9 10h6" /> */}
        {value && (
          <text
            x="12"
            y="10"
            textAnchor="middle"
            stroke="none"
            fill="currentColor"
            dominantBaseline="middle"
            fontSize="10"
          >
            {value}
          </text>
        )}
      </svg>
    </div>
  );
};

export default CommentIconWithValue;
