"use server";
import Member from "@/lib/models/Member";
import TeamModel from "@/lib/models/Team";
import User from "@/lib/models/User";
import ConnectMongoDb from "@/lib/mongoConnect";
import { NextResponse } from "next/server";

export const getTeamMembers = async (teamId) => {
  console.log("teamId sr", teamId);
  try {
    await ConnectMongoDb();
    const team = await TeamModel.findById(teamId);
    console.log("team", team);
    // Fetch members using Promise.all and map
    const members = await Promise.all(
      team.members.map(async (memberId) => {
        const member = await Member.findById({ _id: memberId._id });
        return member;
      })
    );

    // Filter out any null values in case some members were not found
    const filteredMembers = members.filter((member) => member !== null);
    if (filteredMembers.length === 0) {
      return {
        success: false,
        error: "No members found",
      };
    }
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    return {
      success: true,
      members: JSON.parse(JSON.stringify(members)),
    };
  } catch (error) {
    console.error(error);
    return { success: false, error: error.message };
  }
};
export const getTeam = async (TeamRole) => {
  console.log("TeamRole", TeamRole);
  try {
    await ConnectMongoDb();
    const team = await TeamModel.find({ TeamRole: TeamRole });

    if (team.length === 0) {
      return {
        success: false,
        error: "No team found",
      };
    }

    return { success: true, team: JSON.parse(JSON.stringify(team)) };
  } catch (error) {
    console.error(error);
    return { success: false, error: error.message };
  }
};

export const createTeam = async () => {
  const teamdata = {
    name: "Team 1",
    description: "Team 1 description",
    members: ["6698de47e6ee93e9aa7cbc3c"], // Ensure this ID matches an existing user
  };

  try {
    await ConnectMongoDb(); // Ensure MongoDB connection is established

    const { name, description, members } = teamdata;

    const newTeam = new TeamModel({
      name,
      description,
      members,
    });

    await newTeam.save(); // Save the new team to MongoDB

    return { success: true, team: newTeam }; // Return success and the new team object
  } catch (error) {
    console.error("Error creating team:", error);
    return { success: false, error: error.message }; // Handle and return error
  }
};
