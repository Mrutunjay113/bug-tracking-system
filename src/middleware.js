import { NextResponse } from "next/server";
import { verifyJwtToken } from "./lib/utils"; // Ensure this is an async function
import { cookies } from "next/headers";

export async function middleware(request) {
  const token = cookies().get("token")?.value;

  if (token) {
    try {
      const decoded = await verifyJwtToken(token); // Verify the token
      // Log the decoded token for debugging

      // If the token is valid and user is trying to access the sign-in page, redirect to dashboard
      if (decoded && request.nextUrl.pathname.startsWith("/sign-in")) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }

      // If the token is valid and user is not trying to access protected pages, allow access
      if (decoded) {
        return NextResponse.next();
      }
    } catch (error) {
      console.error("Token verification failed:", error);

      // Clear the cookie on token verification failure
      const response = NextResponse.redirect(new URL("/sign-in", request.url));
      response.cookies.delete("token"); // Remove the token cookie
      return response;
    }
  } else {
    // Redirect to sign-in if no token and user is not on the sign-in page
    if (!request.nextUrl.pathname.startsWith("/sign-in")) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
