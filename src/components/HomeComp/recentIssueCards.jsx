"use client";
import { Flag } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const RecentIssueCards = ({ issue, index }) => {
  const priorityClasses = {
    high: {
      bg: "bg-red-100",
      hover: "hover:bg-red-200",
      text: "text-red-500",
    },
    medium: {
      bg: "bg-yellow-100",
      hover: "hover:bg-yellow-200",
      text: "text-yellow-500",
    },
    low: {
      bg: "bg-green-100",
      hover: "hover:bg-green-200",
      text: "text-green-500",
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.3, // Stagger the animation of each card
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  };

  const priorityClass = priorityClasses[issue.priority] || priorityClasses.low;

  return (
    <motion.div
      key={index}
      custom={index}
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
    >
      <Link
        href={`/dashboard/issues/${issue._id}`}
        key={issue._id}
        className={`flex flex-col gap-2 items-start justify-between p-2 rounded-md 
          ${priorityClass.bg} ${priorityClass.hover}`}
      >
        <div className="flex justify-between w-full">
          <span className="font-semibold text-base tracking-wide capitalize">
            {issue.title.length > 20
              ? issue.title.substring(0, 20) + "..."
              : issue.title}
          </span>

          <span className="text-sm text-muted-foreground">
            {new Date(issue.dueDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>

        <div className="flex items-center gap-2 w-full">
          <p className="text-muted-foreground font-semibold text-sm">
            #{issue.type}
          </p>
          {" | "}
          <span className="flex gap-1 font-medium items-center">
            <Flag size={12} className={priorityClass.text} />
            <span className={`${priorityClass.text} text-sm`}>
              {issue.priority}
            </span>
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

export default RecentIssueCards;
