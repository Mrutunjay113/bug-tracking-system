"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import MembersTeamTable from "./MemeberTeamTable";
import { Input } from "../ui/input";
import { Cross, Edit, SquareX, Trash } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import Link from "next/link";
import { motion } from "framer-motion";
import { updateTeamData } from "@/lib/actions/team/action";

const TeambyID = ({ team }) => {
  const [teamDetails, setTeamDetails] = useState({ ...team });
  const [isEditingTeam, setIsEditingTeam] = useState(false);
  const [editingIssueId, setEditingIssueId] = useState(null);
  const [isChanged, setIsChanged] = useState(false); // Track changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeamDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleIssueChange = (e, issueId) => {
    const { name, value } = e.target;
    setTeamDetails((prevDetails) => ({
      ...prevDetails,
      issues: prevDetails.issues.map((issue) =>
        issue._id === issueId ? { ...issue, [name]: value } : issue
      ),
    }));
  };

  // Effect to check if team details have changed
  useEffect(() => {
    const isDifferent = JSON.stringify(team) !== JSON.stringify(teamDetails);
    setIsChanged(isDifferent);
  }, [teamDetails, team]);

  const handleUpdateTeam = async () => {
    console.log("Updated team details:", teamDetails); // Log updated values
    // Here you would handle the API call to update the team
    const formData = new FormData();
    formData.append("name", teamDetails.name);
    formData.append("description", teamDetails.description);
    formData.append("TeamRole", teamDetails.TeamRole);

    const resp = await updateTeamData(teamDetails._id, formData);
    console.log("Response:", resp);
    setIsChanged(false); // Reset change state after update
  };

  const handleDeleteTeam = () => {
    console.log("Delete team:", teamDetails._id);
    // API call to delete the team
  };

  const handleUpdateIssue = (issueId) => {
    console.log("Update issue:", issueId);
    // API call to update the issue
    setEditingIssueId(null);
  };

  return (
    <motion.div
      className="md:m-8 bg-white mx-auto rounded-lg space-y-8 md:p-8 p-2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Team Info */}
      <section>
        <div className="flex justify-between pb-6">
          <div className="flex items-center space-x-4">
            <Image
              width={64}
              height={64}
              src="https://d2u8k2ocievbld.cloudfront.net/memojis/male/2.png"
              alt="Team Leader"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex-1">
              {isEditingTeam ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Input
                    type="text"
                    name="name"
                    placeholder="Team Name"
                    value={teamDetails.name}
                    onChange={handleChange}
                    className="text-xl font-bold text-gray-800 w-full"
                  />
                  <Input
                    name="description"
                    placeholder="Description"
                    value={teamDetails.description}
                    onChange={handleChange}
                    className="text-gray-600 w-full mt-3"
                  />
                  <Input
                    type="text"
                    name="TeamRole"
                    placeholder="Role"
                    value={teamDetails.TeamRole}
                    onChange={handleChange}
                    className="text-sm text-gray-500 mt-2 w-full"
                  />
                </motion.div>
              ) : (
                <>
                  <motion.h2
                    className="text-3xl font-bold text-gray-800"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {teamDetails.name}
                  </motion.h2>
                  <motion.p
                    className="text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    {teamDetails.description}
                  </motion.p>
                  <p className="text-sm text-gray-500 mt-2">
                    <strong>Role:</strong> {teamDetails.TeamRole}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Team Leader:</strong>{" "}
                    {teamDetails.userInfo?.firstName}{" "}
                    {teamDetails.userInfo?.lastName}
                  </p>
                </>
              )}
            </div>
          </div>
          <div className="flex justify-end space-x-4 h-fit w-fit">
            {!isEditingTeam ? (
              <Edit
                onClick={() => setIsEditingTeam(!isEditingTeam)}
                color="blue"
                className="cursor-pointer"
              />
            ) : (
              <SquareX
                onClick={() => setIsEditingTeam(!isEditingTeam)}
                color="red"
                className="cursor-pointer"
              />
            )}
          </div>
        </div>
        {isEditingTeam && isChanged && (
          <motion.button
            onClick={handleUpdateTeam}
            className="bg-indigo-600 text-white px-4 py-2 ml-20 rounded-md hover:bg-indigo-700 transition"
            initial={{ scale: 0.95 }}
            whileHover={{ scale: 1 }}
          >
            Save Changes
          </motion.button>
        )}
      </section>

      {/* Members Info */}
      <section className="border-b pb-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Members</h3>
        <MembersTeamTable members={team?.members} />
      </section>

      {/* Issues Info */}
      <section className="pb-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Issues</h3>
        {teamDetails.issues.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            {teamDetails.issues.map((issue) => (
              <motion.div
                whileTap={{ scale: 0.95 }}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2, ease: "easeOut" },
                }}
                key={issue._id}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <Link href={`/dashboard/issues/${issue._id}`}>
                  <Card
                    className={` ${issue.status === "Closed" && "opacity-60"}`}
                  >
                    <CardHeader>
                      <CardTitle className="tracking-wide">
                        {issue.title}
                      </CardTitle>
                      <CardDescription>{issue.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="">
                        <strong>Priority:</strong> {issue.priority}
                      </div>
                      <div className="">
                        <strong>Status:</strong> {issue.status}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-gray-500">No issues found.</p>
        )}
      </section>
    </motion.div>
  );
};

export default TeambyID;
