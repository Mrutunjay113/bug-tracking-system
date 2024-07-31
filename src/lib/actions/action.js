"use server";

import { revalidatePath } from "next/cache";
import User from "../../lib/models/User";
// import { redirect } from "next/navigation";
import { redirect } from "next/navigation";
import ConnectMongoDb from "@/lib/mongoConnect";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { SignJWT } from "jose";

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

export const signIn = async (data) => {
  const { email, password } = data;
  console.log(`data`, data);

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
      return {
        error: "Invalid credentials",
      };
    } // Remove password from user object
    const { password: pass, ...rest } = user.toObject();

    // Create a JWT token using the user object jose library
    // Create a JWT token using the jose library
    const token = await new SignJWT({ user: rest })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));

    cookies().set("token", token, {
      httpOnly: true, // To prevent client-side access
      secure: process.env.NODE_ENV === "production", // Ensure cookies are only sent over HTTPS in production
      maxAge: 3600, // 1 hour
      path: "/", // Set the cookie for the entire domain
    });

    return { user: token, success: true };
  } catch (error) {
    console.error("Error signing in:", error);
    return {
      error: "Something went wrong",
    };
  } finally {
  }
};
export async function signOut() {
  // Clear the token from the cookie
  const Cookie = cookies();
  const token = Cookie.get("token")?.value;
  if (token) {
    Cookie.delete("token");
    revalidatePath("/");
    redirect("/sign-in");
    return { success: true };
  }
  // Redirect to the sign-in page
}
