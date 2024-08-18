import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <main className="bg-[#F6F6F6] w-full h-full overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
