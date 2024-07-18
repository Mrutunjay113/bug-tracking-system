import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export function middleware(request) {
  const token = cookies().get("token")?.value;

  console.log("Token:", token); // Log the token for debugging

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded Token:", decoded); // Log the decoded token for debugging
    } catch (error) {
      console.error("Token verification failed:", error); // Log the error if verification fails
    }
  }

  if (token && !request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!token && !request.nextUrl.pathname.startsWith("/sign-in")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
