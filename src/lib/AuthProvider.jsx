"use client";

const { SessionProvider } = require("next-auth/react");

function AuthProvider({ children, session }) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}

export default AuthProvider;
