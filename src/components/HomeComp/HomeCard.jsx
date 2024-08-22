"use client";
import {
  AppWindowMac,
  Bug,
  BugOff,
  FileCode,
  FlagTriangleRight,
  User,
  Flag,
  Loader,
  GitPullRequestClosed,
  GitPullRequestCreate,
  GitMerge,
  GitPullRequestDraft,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const HomeCard = ({ data }) => {
  const {
    totalIssue,
    StatusOpen,
    StatusReview,
    StatusClose,
    priorityIssues,
    StatusProgress,
    Priority,
    membersCount,
    teamCount,
  } = data;

  const cards = [
    { title: "Total Issues", CardValue: totalIssue, href: "/dashboard/issues" },
    { title: "Issues Open", CardValue: StatusOpen },
    { title: "Issues Closed", CardValue: StatusClose },
    { title: "Issues In Progress", CardValue: StatusProgress },
    {
      title: "Total Members",
      CardValue: membersCount.totalMembers,
      href: "/dashboard/members",
    },
    {
      title: "Total Teams",
      CardValue: teamCount.totalTeams,
      href: "/dashboard/teams",
    },
  ];

  const iconMap = {
    "Total Issues": <GitPullRequestCreate size={40} strokeWidth={1.3} />,
    "Issues Open": <GitMerge size={40} strokeWidth={1.3} />,
    "Issues Closed": <GitPullRequestClosed size={40} strokeWidth={1.3} />,
    "Issues In Progress": <GitPullRequestDraft size={40} strokeWidth={1.3} />,
    "Priority Issues": <FlagTriangleRight size={40} strokeWidth={1.3} />,
    "Total Members": <Users size={40} strokeWidth={1.3} />,
    "Total Teams": <Users size={40} strokeWidth={1.3} />,
  };

  return (
    <div className="md:grid md:grid-cols-6 gap-6">
      {cards.map((card, index) => {
        const Icon = iconMap[card.title] || null;
        // Reverse index for staggered effect

        // Determine if "Last Month" should be added
        const showLastMonth = [
          "Total Issues",
          "Issues Open",
          "Issues Closed",
          "Issues In Progress",
        ].includes(card.title);

        return (
          <Link href={card?.href || "#"} key={card.title}>
            <motion.div
              key={card.title}
              initial={{ opacity: 0, x: -100, y: 0 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
                type: "spring",
                stiffness: 100,
                damping: 10,
              }}
              className="flex flex-col rounded-lg border w-full hover:border-gray-400 min-h-[150px] px-6 p-4 space-y-4 bg-white  "
            >
              <div className="flex justify-between items-center">
                <h2 className="text-gray-600 font-normal text-md">
                  {card.title}
                </h2>
                {showLastMonth && (
                  <span className="text-tiny text-gray-500 ">Last Month</span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800">
                  {card.CardValue}
                </div>

                <div className="flex items-center justify-center">
                  <div className="text-gray-400">{Icon}</div>
                </div>
              </div>
            </motion.div>
          </Link>
        );
      })}
    </div>
  );
};

export default HomeCard;
