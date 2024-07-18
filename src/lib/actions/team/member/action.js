// server/actions/member.js
"use server";
import ConnectMongoDb from "@/lib/mongoConnect";
import member from "../../../models/Member";

// Function to create a new member
export const createMember = async () => {
  const memberData = {
    user: "6698d025b122ebababc55cc6",
    team: "6698d37ab122ebababc55ce4",
    designation: "Software Engineer",
  };
  try {
    ConnectMongoDb();
    console.log(memberData);
    const { user, team, designation } = memberData;
    // Create a new member instance
    const newMember = new member({
      user,
      team,
      designation,
    });
    // Save the member to the database
    await newMember.save();
    return { success: true, member: newMember };
  } catch (error) {
    console.error("Error creating member:", error);
    return { success: false, error: error.message };
  }
};
