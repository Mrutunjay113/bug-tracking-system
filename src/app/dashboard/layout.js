import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { getServerSession } from "next-auth";

import AuthProvider from "@/lib/AuthProvider";

const Layout = ({ children }) => {
  const session = getServerSession();
  return (
    <div className="flex h-screen overflow-hidden">
      <AuthProvider session={session}>
        <Sidebar />
      </AuthProvider>
      <div className="flex-1 flex flex-col">
        <main className="bg-[#F6F6F6] w-full h-full overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
