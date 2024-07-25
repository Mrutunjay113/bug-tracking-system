"use server";
import User from "@/lib/models/User";
import ConnectMongoDb from "@/lib/mongoConnect";

export const getUser = async () => {
  try {
    await ConnectMongoDb();
    const user = await User.find();
    if (user.length === 0) {
      return {
        success: false,
        error: "No user found",
      };
    }

    return {
      success: true,
      user: JSON.parse(JSON.stringify(user)),
    };
  } catch (error) {
    console.error("Error getting members:", error);
    return { success: false, error: error.message };
  }
};
export const getUserById = async (id) => {
  try {
    await ConnectMongoDb();
    const user = await User.findById(id);
    if (!user) {
      return {
        success: false,
        error: "No user found",
      };
    }
    return {
      success: true,
      user: JSON.parse(JSON.stringify(user)),
    };
  } catch (error) {
    console.error("Error getting members:", error);
    return { success: false, error: error.message };
  }
};
export const updateUserById = async (id, data) => {
  console.log(`data f`, data);
  try {
    await ConnectMongoDb();
    const user = await User.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!user) {
      return {
        success: false,
        error: "No user found",
      };
    }
    return {
      success: true,
      user: JSON.parse(JSON.stringify(user)),
    };
  } catch (error) {
    console.error("Error getting members:", error);
    return { success: false, error: error.message };
  }
};
