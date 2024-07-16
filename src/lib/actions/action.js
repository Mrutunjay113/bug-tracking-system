"use server";

import { revalidatePath } from "next/cache";
import User from "../models/User";
import ConnectMongoDb from "../mongoConnect";
import { redirect } from "next/navigation";

export const addUser = async (data) => {
  console.log(`data`, data);
  const { email, password } = data;

  try {
    ConnectMongoDb();

    const newUser = new User({ email, password });
    const response = await newUser.save();

    return JSON.parse(JSON.stringify(response));
  } catch (error) {
    console.log(error);

    if (error.code === 11000) {
      return {
        error: "Email already exists",
      };
    }
    return {
      error: "Something went wrong",
    };
  }
};
export const signIn = async (data) => {
  const { email, password } = data;

  try {
    ConnectMongoDb();

    const user = await User.findOne({
      email,
      password,
    });
    if (!user) {
      return {
        error: "Invalid credentials",
      };
    }
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong",
    };
  }
};
