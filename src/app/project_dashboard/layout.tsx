import React, { ReactNode } from "react";
import NavBar from "./nav_bar";
import Project_Header from "../component/project_header";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <div className="fixed top-0 left-0 w-full z-10">
        <Project_Header />
      </div>
      <div className="flex h-full pt-16">
        {" "}
        {/* Adjust padding-top to the height of Project_Header */}
        <div className="fixed top-28 left-0 w-1/5 h-full bg-white border-r">
          {" "}
          {/* Adjust top to the height of Project_Header */}
          <NavBar />
        </div>
        <div
          className="ml-1/5 flex-1 p-6 bg-gray-100 overflow-auto"
          style={{ marginLeft: "20%" }}
        >
          {" "}
          {/* Adjust margin-left to the width of NavBar */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
