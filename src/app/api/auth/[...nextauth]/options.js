// pages/api/auth/[...nextauth].js

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInUser } from "@/lib/actions/action"; // Update the import path if necessary

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const result = await signInUser(credentials);

        if (result.error) {
          return null; // If there is an error, return null to indicate authentication failure
        }

        return result.user; // Return the user object if authentication is successful
      },
    }),
  ],
  pages: {
    signIn: "/sign-in", // Custom login page URL
    signOut: "/sign-in", // Custom signout page URL
    error: "/sign-in", // Custom error page URL
  },

  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        user.role = user?.role == null ? "User" : user?.role;
        token.user = user;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.user = token.user;
      return session;
    },
  },
};
