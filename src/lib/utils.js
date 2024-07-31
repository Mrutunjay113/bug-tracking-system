import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import jwt from "jsonwebtoken";
import { jwtVerify } from "jose";
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const JWT_SECRET = process.env.JWT_SECRET; // Your JWT secret key

export async function verifyJwtToken(token) {
  // console.log("Token:", token);
  try {
    // Decode the JWT token using the jose library
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET)
    );

    return payload;
  } catch (error) {
    console.error("Token verification failed:", error);
    throw new Error("Invalid token");
  }
}
