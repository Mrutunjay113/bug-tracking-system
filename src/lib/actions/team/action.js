"use server";
import IssueModel from "@/lib/models/issue";
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
export const getTeamRole = async (TeamRole) => {
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

export const createTeam = async (formData) => {
  try {
    await ConnectMongoDb(); // Ensure MongoDB connection is established

    console.log("formData", formData);
    // Create a new team object

    // Save the new team to MongoDB
    const newTeam = new TeamModel({
      name: formData.name,
      description: formData.description,
      TeamRole: formData.teamtype,
      teamleader: formData.teamlead,
      members: formData.members,
    });
    await newTeam.save();

    return { success: true }; // Return success and the new team object
  } catch (error) {
    console.error("Error creating team:", error);
    return { success: false, error: error.message }; // Handle and return error
  }
};
// export const getTeamsRole = async () => {
//   try {
//     await ConnectMongoDb();
//     const teams = await TeamModel.find().populate("members");

//     if (teams.length === 0) {
//       return {
//         success: false,
//         error: "No teams found",
//       };
//     }

//     const getTemInfo = await Promise.all(
//       teams.map(async (team) => {
//         const teamLeader = await User.findById(
//           { _id: team.teamleader },
//           {
//             firstName: 1,
//             lastName: 1,
//             email: 1,
//             username: 1,
//             status: 1,
//             image: 1,
//           }
//         );
//         return {
//           userinfo: teamLeader,
//         };
//       })
//     );
//     const formateTeam = teams.map((team, index) => {
//       return {
//         ...team._doc,
//         userInfo: getTemInfo[index].userinfo,
//       };
//     });
//     // console.log(`getTemInfo`, formateTeam);

//     return {
//       success: true,
//       teams: JSON.parse(JSON.stringify(formateTeam)),
//     };
//   } catch (error) {
//     console.error("Error fetching teams:", error);
//     return { success: false, error: error.message };
//   }
// };

//add team page
export const getTeamLeader = async (teamType) => {
  console.log("teamType", teamType);
  try {
    await ConnectMongoDb();
    const team = await User.find({
      designation: teamType,
    });
    if (team.length === 0) {
      return {
        success: false,
        error: "No team leader found",
      };
    }

    return {
      success: true,
      teamLeaders: JSON.parse(JSON.stringify(team)),
    };
  } catch (error) {
    console.error("Error fetching team leader:", error);
    return { success: false, error: error.message };
  }
};
export const fetchTeams = async (q, page = 1) => {
  console.log("q", q);

  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = 10;

  try {
    await ConnectMongoDb();
    const count = await TeamModel.find({
      $or: [
        { name: { $regex: regex } },
        { description: { $regex: regex } },
        { TeamRole: { $regex: regex } },
      ],
    }).countDocuments();
    const teams = await TeamModel.find({
      $or: [
        { name: { $regex: regex } },
        { description: { $regex: regex } },
        { TeamRole: { $regex: regex } },
      ],
    })
      .populate("members")
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    if (teams.length === 0) {
      return {
        success: false,
        error: "No teams found",
      };
    }

    const getTemInfo = await Promise.all(
      teams.map(async (team) => {
        const teamLeader = await User.findById(
          { _id: team.teamleader },
          {
            firstName: 1,
            lastName: 1,
            email: 1,
            username: 1,
            status: 1,
            image: 1,
          }
        );
        return {
          userinfo: teamLeader,
        };
      })
    );
    const formateTeam = teams.map((team, index) => {
      return {
        ...team._doc,
        userInfo: getTemInfo[index].userinfo,
      };
    });

    return {
      users: JSON.parse(JSON.stringify(formateTeam)),
      count,
      success: true,
    };
  } catch (err) {
    console.log(err);
  }
};

export const fetchTeamBYID = async (id) => {
  console.log("id", id);
  try {
    await ConnectMongoDb();
    const teams = await TeamModel.findById(id).populate("members");

    // If no team found, return an error response
    if (!teams) {
      return {
        success: false,
        error: "No teams found",
      };
    }
    // console.log("teams", teams);

    const issues = await IssueModel.find(
      { team: id },
      {
        _id: 1,
        title: 1,
        description: 1,
        status: 1,
        priority: 1,
        assignedTo: 1,
        statusDates: 1,
        type: 1,
        dueDate: 1,
      }
    );
    // console.log("issues", issues);

    // Fetch team leader information
    const teamLeader = await User.findById(teams.teamleader, {
      firstName: 1,
      lastName: 1,
      email: 1,
      username: 1,
      status: 1,
      image: 1,
    });

    // Format the team data with team leader information
    const formateTeam = {
      ...teams._doc,
      userInfo: teamLeader,
      issues: JSON.parse(JSON.stringify(issues)),
    };

    // Count of teams will just be 1 since you're fetching by ID
    const count = 1;

    return {
      users: JSON.parse(JSON.stringify(formateTeam)),
      count,
      success: true,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      error: "An error occurred while fetching the team data",
    };
  }
};

//update team details using team id
export const updateTeamData = async (id, formData) => {
  console.log("id", id);
  console.log("formData", formData);
  const { name, description, TeamRole } = Object.fromEntries(formData);

  try {
    await ConnectMongoDb();
    const team = await TeamModel.findByIdAndUpdate(
      id,
      {
        name,
        description,
        TeamRole,
      },
      { new: true }
    );
    if (!team) {
      return {
        success: false,
        error: "No team found",
      };
    }
    return { success: true, team: JSON.parse(JSON.stringify(team)) };
  } catch (error) {
    console.error("Error updating team:", error);
    return { success: false, error: error.message };
  }
};
