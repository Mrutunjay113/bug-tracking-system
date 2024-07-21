import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="md:p-8 p-3 bg-[#fafafa] w-full h-[calc(100vh-100px)] overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
