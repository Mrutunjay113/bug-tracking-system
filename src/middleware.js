import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";

export async function middleware(request) {
  const token =
    cookies(request).get("__Secure-next-auth.session-token")?.value ||
    cookies(request).get("next-auth.session-token")?.value;

  console.log("Token from middleware:", token);

  if (token) {
    try {
      const decoded = await decode({
        token,
        secret: process.env.NEXTAUTH_SECRET,
      });

      console.log("Decoded token:", decoded);

      if (
        (decoded && request.nextUrl.pathname === "/") ||
        request.nextUrl.pathname === "/sign-in" ||
        request.nextUrl.pathname === "/sign-up"
      ) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }

      if (decoded) {
        return NextResponse.next();
      }
    } catch (error) {
      console.error("Token verification failed:", error);

      const response = NextResponse.redirect(new URL("/sign-in", request.url));

      return response;
    }
  } else {
    //if
    if (
      !request.nextUrl.pathname.startsWith("/sign-in") &&
      !request.nextUrl.pathname.startsWith("/sign-up")
    ) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
