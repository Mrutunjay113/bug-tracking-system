"use server";

import { revalidatePath } from "next/cache";
import User from "../../lib/models/User";
// import { redirect } from "next/navigation";
import { redirect } from "next/navigation";
import ConnectMongoDb from "@/lib/mongoConnect";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { SignJWT } from "jose";
import { signIn } from "next-auth/react";
import { encode } from "next-auth/jwt";

const JWT_SECRET = process.env.JWT_SECRET;

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

export const signInUser = async (credentials) => {
  console.log(`credentials`, credentials);
  const { email, password } = credentials;
  try {
    ConnectMongoDb(); // Ensure MongoDB connection

    const user = await User.findOne({ email });
    if (!user) {
      return {
        error: "Invalid credentials",
      };
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return { error: "Invalid credentials" };
    }

    // Remove password from user object
    const { password: pass, ...userWithoutPassword } = user.toObject();
    // Generate JWT token and set it as a cookie using jose library
    // const jwt = await new SignJWT({ user: userWithoutPassword })
    //   .setProtectedHeader({ alg: "HS256" })
    //   .setIssuedAt()
    //   .setExpirationTime("2h")
    //   .sign(new TextEncoder().encode(JWT_SECRET));

    // ///set cookie with jwt token
    // cookies().set("token", jwt, {});

    return {
      error: null,
      user: JSON.parse(JSON.stringify(userWithoutPassword)),
    };
  } catch (error) {
    console.error("SignIn error:", error);
    return { error: "An error occurred during sign-in", user: null };
  }
};
