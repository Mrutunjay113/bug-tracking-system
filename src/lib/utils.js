import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import jwt from "jsonwebtoken";
import { jwtVerify } from "jose";
import { redirect } from "next/dist/server/api-utils";
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
// export const VerifyJwtToken = async (token) => {
//   if (!token) return { success: false, error: "No token provided" };
//   const decoded = jwt.verify(token, process.env.JWT_SECRET);
//   console.log("decoded", decoded);
//   if (!decoded) return { success: false, error: "Unauthorized" };
//   return decoded;
// };

// Function to verify JWT token

const JWT_SECRET = process.env.JWT_SECRET; // Your JWT secret key

export async function verifyJwtToken(token) {
  try {
    // Verify the JWT token
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET)
    );
    return payload;
  } catch (error) {
    console.error("Token verification failed:", error);

    // Clear the token
    throw new Error("Invalid token");
  }
}
