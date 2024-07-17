// components/Navbar.js

import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between">
      <div>
        <Link href="/" className="text-xl font-bold">
          Project Name
        </Link>
      </div>
      <div>
        <ul className="flex space-x-4">
          <li>
            <Link href="/profile" className="hover:underline">
              Profile
            </Link>
          </li>
          <li>
            <Link href="/logout" className="hover:underline">
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
