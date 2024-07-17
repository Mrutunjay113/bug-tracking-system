import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-5">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
