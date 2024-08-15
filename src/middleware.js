import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";
import { redirect } from "next/dist/server/api-utils";

export async function middleware(request) {
  const token = cookies(request).get(
    "next-auth.session-token" || "__Secure-next-auth.session-token"
  )?.value; // Get the token from the cookie

  if (token) {
    try {
      const decoded = await decode({
        token,
        secret: process.env.NEXTAUTH_SECRET,
      });
      // Log the decoded token for debugging

      // If the token is valid and user is trying to access the sign-in page, redirect to dashboard  if pathname = "/" then redirect to dashboard
      if (
        (decoded && request.nextUrl.pathname === "/") ||
        request.nextUrl.pathname === "/sign-in"
      ) {
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
