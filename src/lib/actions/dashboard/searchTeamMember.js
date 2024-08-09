"use server";

import Member from "@/lib/models/Member";
import TeamModel from "@/lib/models/Team";
import User from "@/lib/models/User";
import ConnectMongoDb from "@/lib/mongoConnect";

export const searchTeamMember = async (search, type) => {
  try {
    await ConnectMongoDb();
    if (type === "team") {
      // Initialize result containers

      // Perform the search for both teams and users regardless of the type
      const teamResults = await TeamModel.find({
        $or: [
          { name: { $regex: search, $options: "i" } },
          { TeamRole: { $regex: search, $options: "i" } },
        ],
      });

      // Populate the teamleader details within the team results
      const teamWithLeaders = await Promise.all(
        teamResults.map(async (team) => {
          const teamLeader = await User.findById(team.teamleader, {
            password: 0,
          });
          return {
            ...team._doc,
            teamleader: teamLeader,
          };
        })
      );

      // Check if any results were found
      if (teamResults.length > 0) {
        return {
          success: true,
          team: JSON.parse(JSON.stringify(teamWithLeaders)),
        };
      } else {
        return { success: false, error: "No matching team found" };
      }
    } else if (type === "member") {
      const member = await Member.find({
        $or: [
          { firstName: { $regex: search, $options: "i" } },
          { lastName: { $regex: search, $options: "i" } },
        ],
      });

      if (member.length > 0) {
        return { success: true, member };
      } else {
        return { success: false, error: "No matching member found" };
      }
    }
  } catch (error) {
    console.error("Error getting members by designation:", error);
    return { success: false, error: error.message };
  }
};
