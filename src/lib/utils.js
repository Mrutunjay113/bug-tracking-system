import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import jwt from "jsonwebtoken";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
export const VerifyJwtToken = async (token) => {
  if (!token) return { success: false, error: "No token provided" };
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log("decoded", decoded);
  if (!decoded) return { success: false, error: "Unauthorized" };
  return decoded;
};
