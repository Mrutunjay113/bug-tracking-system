"use server";

import IssueModel from "@/lib/models/issue";
import Member from "@/lib/models/Member";
import TeamModel from "@/lib/models/Team";
// import Member from "@/lib/models/Member";
import ConnectMongoDb from "@/lib/mongoConnect";
// import { cloudinary } from "@/lib/utils";
// import { cloudinaryConfig } from "@/lib/utils";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to create a new member
export const createMember = async (formData) => {
  console.log(`formData`, formData);
  try {
    // Connect to MongoDB
    // console.log(`formData`, formData);
    await ConnectMongoDb();

    // console.log(`formData2`, formData);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value || null || "";
    });
    console.log(`data`, data);

    const profilePictureFile = data.profileImg;
    let profilePictureUrl = "";
    console.log(`profilePictureFile`, profilePictureFile);
    const dataform = new FormData();
    dataform.append("file", profilePictureFile);
    dataform.append("upload_preset", "bug-trackign-sys");

    try {
      const uplodimage = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: dataform,
        }
      );
      const image = await uplodimage.json();
      console.log(`image`, image.secure_url);
      profilePictureUrl = image.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return { success: false, error: error.message };
    }
    console.log(`profilePictureUrl`, profilePictureUrl);

    const newMember = new Member({
      userID: data.userID,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      team: data?.team || null,
      phoneNumber: data.phoneNumber,
      profileImg: profilePictureUrl,
      designation: data.designation,
      skills: data.skills,
      availabilityStatus: data.availabilityStatus,
    });

    // Save the member to the database
    await newMember.save();
    return { success: true, member: newMember };
    // return { success: true, member: newMember };
  } catch (error) {
    console.error("Error creating member:", error);
    return { success: false, error: error.message };
  }
};

// export const getMembers = async () => {
//   try {
//     await ConnectMongoDb();
//     const members = await Member.find().populate("team");

//     console.log(`members`, members);
//     return {
//       success: true,
//       members: JSON.parse(JSON.stringify(members)),
//     };
//   } catch (error) {
//     console.error("Error getting members:", error);
//     return { success: false, error: error.message };
//   }
// };

export const getMembersByDesignation = async (designation) => {
  console.log(`designation`, designation);
  try {
    await ConnectMongoDb();
    const members = await Member.find({ designation: designation });
    console.log(`members`, members);
    return {
      success: true,
      members: JSON.parse(JSON.stringify(members)),
    };
  } catch (error) {
    console.error("Error getting members by designation:", error);
    return { success: false, error: error.message };
  }
};

export const fetchMembers = async (q, page = 1) => {
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = 10;

  try {
    await ConnectMongoDb();
    const count = await Member.find({
      $or: [
        { firstName: { $regex: regex } },
        { lastName: { $regex: regex } },
        { email: { $regex: regex } },
      ],
    }).countDocuments();
    const members = await Member.find({
      $or: [
        { firstName: { $regex: regex } },
        { lastName: { $regex: regex } },
        { email: { $regex: regex } },
      ],
    })
      .populate("team")
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    if (members.length === 0) {
      return {
        success: false,
        error: "No teams found",
      };
    }

    return {
      members: JSON.parse(JSON.stringify(members)),
      count,
      success: true,
    };
  } catch (err) {
    console.log(err);
  }
};

//get member by id
export const getMemberById = async (id) => {
  try {
    await ConnectMongoDb();
    const member = await Member.findById(id);
    const tasks = member?.tasks?.map((task) => task);
    const issue = await IssueModel.find(
      { _id: { $in: tasks } },
      {
        title: 1,
        description: 1,
        priority: 1,
        status: 1,
        type: 1,
        dueDate: 1,
        issueType: 1,
        createdAt: 1,
        statusDates: 1,
      }
    );

    const team = await TeamModel.findById(member.team);
    return {
      success: true,
      data: {
        member: {
          ...JSON.parse(JSON.stringify(member)),
          projects: issue,
        },
        team: JSON.parse(JSON.stringify(team)),
      },
    };
  } catch (error) {
    console.error("Error getting member by id:", error);
    return { success: false, error: error.message };
  }
};
