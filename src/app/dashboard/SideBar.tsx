import React from "react";
import Link from "next/link";

interface SideBarProps {
  children: React.ReactNode;
}

const SideBar: React.FC<SideBarProps> = ({ children }) => {
  return (
    <div className="flex h-screen">
      <div className="flex flex-col w-64 bg-gray-800 text-white">
        <div className="flex items-center justify-center h-14 border-b border-gray-700">
          <h1 className="text-lg font-semibold">Sidebar</h1>
        </div>
        <nav className="flex-1 overflow-y-auto">
          <ul className="p-2">
            <li className="mb-2">
              <Link
                href="/dashboard"
                className="block py-2 px-4 rounded hover:bg-gray-700"
              >
                Dashboard
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href="/dashboard/projects"
                className="block py-2 px-4 rounded hover:bg-gray-700"
              >
                Projects
              </Link>
            </li>
            {/* Add more navigation items as needed */}
          </ul>
        </nav>
        <main className="flex flex-col overflow-scroll">{children}</main>
      </div>
    </div>
  );
};

export default SideBar;
