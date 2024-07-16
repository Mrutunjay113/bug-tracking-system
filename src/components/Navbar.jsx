import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-blue-500 p-4">
      <div className="container mx-auto">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-white text-2xl font-bold">
            Bug Tracking System
          </Link>
          <div>
            <Link href="/login" className="text-white mx-2">
              Login
            </Link>
            <Link href="/profile" className="text-white mx-2">
              Profile
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
