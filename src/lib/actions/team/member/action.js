"use server";

import Member from "@/lib/models/Member";
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
