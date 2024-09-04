"use client";
import Image from "next/image";
import React, { useState } from "react";
import MembersTeamTable from "./MemeberTeamTable";

const TeambyID = ({ team }) => {
  console.log("team", team);
  const [teamDetails, setTeamDetails] = useState({ ...team });
  const [isEditingTeam, setIsEditingTeam] = useState(false);
  //   const [editingMemberId, setEditingMemberId] = useState(null);
  const [editingIssueId, setEditingIssueId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeamDetails({ ...teamDetails, [name]: value });
  };

  //   const handleMemberChange = (e, memberId) => {
  //     const { name, value } = e.target;
  //     setTeamDetails({
  //       ...teamDetails,
  //       members: teamDetails.members.map((member) =>
  //         member._id === memberId ? { ...member, [name]: value } : member
  //       ),
  //     });
  //   };

  const handleIssueChange = (e, issueId) => {
    const { name, value } = e.target;
    setTeamDetails({
      ...teamDetails,
      issues: teamDetails.issues.map((issue) =>
        issue._id === issueId ? { ...issue, [name]: value } : issue
      ),
    });
  };

  const handleUpdateTeam = () => {
    console.log("Update team:", teamDetails);
    // API call to update the team
  };

  const handleDeleteTeam = () => {
    console.log("Delete team:", teamDetails._id);
    // API call to delete the team
  };

  const handleUpdateMember = (memberId) => {
    console.log("Update member:", memberId);
    // API call to update the member
    setEditingMemberId(null);
  };

  const handleUpdateIssue = (issueId) => {
    console.log("Update issue:", issueId);
    // API call to update the issue
    setEditingIssueId(null);
  };

  return (
    <div className=" md:m-8 bg-white max-w-7xl mx-auto rounded-lg space-y-8 md:p-8 p-2 ">
      {/* Team Info */}
      <section className="border-b pb-6">
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
              <>
                <input
                  type="text"
                  name="name"
                  value={teamDetails.name}
                  onChange={handleChange}
                  className="text-3xl font-bold text-gray-800 w-full border-b-2 border-gray-200 focus:border-indigo-500 outline-none"
                />
                <textarea
                  name="description"
                  value={teamDetails.description}
                  onChange={handleChange}
                  className="text-gray-600 w-full mt-2 border-b-2 border-gray-200 focus:border-indigo-500 outline-none"
                  rows="2"
                ></textarea>
                <input
                  type="text"
                  name="TeamRole"
                  value={teamDetails.TeamRole}
                  onChange={handleChange}
                  className="text-sm text-gray-500 mt-2 w-full border-b-2 border-gray-200 focus:border-indigo-500 outline-none"
                />
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold text-gray-800">
                  {teamDetails.name}
                </h2>
                <p className="text-gray-600">{teamDetails.description}</p>
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
        <div className="flex justify-end space-x-4 mt-4">
          {isEditingTeam ? (
            <button
              onClick={handleUpdateTeam}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={() => setIsEditingTeam(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Edit
            </button>
          )}
          <button
            onClick={handleDeleteTeam}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
          >
            Delete
          </button>
          {isEditingTeam && (
            <button
              onClick={() => setIsEditingTeam(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          )}
        </div>
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
          <ul className="space-y-4">
            {teamDetails.issues.map((issue) => (
              <li
                key={issue._id}
                className="p-4 bg-gray-50 rounded-lg shadow-sm"
              >
                {editingIssueId === issue._id ? (
                  <>
                    <input
                      type="text"
                      name="title"
                      value={issue.title}
                      onChange={(e) => handleIssueChange(e, issue._id)}
                      className="text-lg font-medium text-gray-700 w-full border-b-2 border-gray-200 focus:border-indigo-500 outline-none"
                    />
                    <textarea
                      name="description"
                      value={issue.description}
                      onChange={(e) => handleIssueChange(e, issue._id)}
                      className="text-gray-600 w-full mt-2 border-b-2 border-gray-200 focus:border-indigo-500 outline-none"
                      rows="2"
                    ></textarea>
                    <input
                      type="text"
                      name="priority"
                      value={issue.priority}
                      onChange={(e) => handleIssueChange(e, issue._id)}
                      className="text-sm text-gray-500 mt-2 w-full border-b-2 border-gray-200 focus:border-indigo-500 outline-none"
                    />
                  </>
                ) : (
                  <>
                    <h4 className="text-lg font-medium text-gray-700">
                      {issue.title}
                    </h4>
                    <p className="text-gray-600">{issue.description}</p>
                    <p className="text-sm text-gray-500">
                      <strong>Priority:</strong> {issue.priority}
                    </p>
                    <p className="text-sm text-gray-500">
                      <strong>Status:</strong> {issue.status}
                    </p>
                  </>
                )}
                <div className="flex space-x-2 mt-2">
                  {editingIssueId === issue._id ? (
                    <>
                      <button
                        onClick={() => handleUpdateIssue(issue._id)}
                        className="bg-green-600 text-white px-2 py-1 rounded-md hover:bg-green-700 transition"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingIssueId(null)}
                        className="bg-gray-400 text-white px-2 py-1 rounded-md hover:bg-gray-500 transition"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setEditingIssueId(issue._id)}
                      className="bg-blue-600 text-white px-2 py-1 rounded-md hover:bg-blue-700 transition"
                    >
                      Edit
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No issues found.</p>
        )}
      </section>
    </div>
  );
};

export default TeambyID;
