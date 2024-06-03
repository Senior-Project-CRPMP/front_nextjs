"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Navigation from "./nav_button";
import images from "../../assets/exportimages";
import Calendar from "./Calendar/page";
import SideCalendar from "./Calendar/sideCalendar";
import Timeline from "./timeline";
import NavBar from "./nav_bar";
import Board from "./board";

// Define the Member type
type Member = {
  name: string;
  role: string;
  email: string;
  avatar: string| StaticImageData ; // Assuming the avatar is a string path, adjust if necessary
};

type StaticImageData = {
  src: string;
  height: number;
  width: number;
  placeholder?: string;
};

const ProjectPage: React.FC = () => {
  const [lastUpdated, setLastUpdated] = useState<string>();
  const [currentPage, setCurrentPage] = useState("overview");
  const [isMemberListOpen, setIsMemberListOpen] = useState(false);

  const members: Member[] = [
    { name: 'Member One', role: 'Role One', email: 'member1@example.com', avatar: images.avatar1 },
    { name: 'Member Two', role: 'Role Two', email: 'member2@example.com', avatar: images.avatar2 },
    { name: 'Member Three', role: 'Role Three', email: 'member3@example.com', avatar: images.avatar3 },
    // Add more members as needed
  ];

  const handleToggleMemberList = () => {
    setIsMemberListOpen(!isMemberListOpen);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      setLastUpdated(currentDate);
    }
  }, []);

  const PageContent = ({ currentPage }: { currentPage: string }) => (
    <div>
      {currentPage === "overview" && <Overview />}
      {currentPage === "board" && <Board />}
      {currentPage === "list" && <List />}
      {currentPage === "timeline" && <Timeline />}
      {currentPage === "calendar" && <Calendar />}
      {currentPage === "workflow" && <Workflow />}
      {currentPage === "files" && <Files />}
      {currentPage === "form_builder" && <Formbuilder />}
    </div>
  );

  const Overview = () => <h1 className="text-black">Overview Page Content</h1>;
  const List = () => <h1 className="text-black">List Page Content</h1>;
  const Workflow = () => <h1 className="text-black">Workflow Page Content</h1>;
  const Files = () => <h1 className="text-black">Files Page Content</h1>;
  const Formbuilder = () => <h1 className="text-black">Formbuilder Page Content</h1>;

  return (
    <div>
      <div className="flex space-x-2">
        <div className="w-1/5 h-screen bg-white rounded-md my-2 shadow-2xl">
          <NavBar />
        </div>
        <div className="h-full bg-white rounded-md my-2 mr-2 w-4/5 relative">
          <div className="p-4 flex-col h-full space-x-0">
            <div className="h-1/6">
              <div className="flex space-x-96">
                <h1 className="text-neutral-900 text-2xl font-bold pr-96">Project One</h1>
                <div className="relative">
                  <div className="absolute left-0">
                    <div className="rounded-full h-8 w-8 items-center justify-center">
                      <Image
                        src={images.avatar3}
                        className="h-full w-full rounded-full object-cover"
                        alt="profile"
                      />
                    </div>
                  </div>
                  <div className="absolute left-5">
                    <div className="rounded-full h-8 w-8 items-center justify-center">
                      <Image
                        src={images.avatar2}
                        className="h-full w-full rounded-full object-cover"
                        alt="profile"
                      />
                    </div>
                  </div>
                  <div className="absolute left-10">
                    <div className="rounded-full h-8 w-8 items-center justify-center">
                      <Image
                        src={images.avatar1}
                        className="h-full w-full rounded-full object-cover"
                        alt="profile"
                      />
                    </div>
                  </div>
                  <div className="absolute left-14">
                    <div 
                      className="bg-blue-500 rounded-full h-8 w-8 flex items-center justify-center cursor-pointer"
                      onClick={handleToggleMemberList}
                    >
                      <span className="text-white font-bold text-sm">+7</span>
                    </div>
                  </div>
                </div>
              </div>
              {lastUpdated && (
                <p className="text-sm text-gray-600 mb-5">Last Update: {lastUpdated}</p>
              )}
              <div className="space-y-11.5"></div>
              <div className="space-y-1.5">
                <Navigation setCurrentPage={setCurrentPage} />
                <div className="border-t border-grey"></div>
              </div>
            </div>
          </div>
          <div className="h-5/6 m-3">
            <div className="flex h-full space-x-2 mx-2">
              <div className="w-72 grow bg-white rounded-md shadow-2xl p-10">
                <PageContent currentPage={currentPage} />
              </div>
              <div className="w-72 bg-white rounded-md shadow-2xl">
                {currentPage === "calendar" && <SideCalendar />}
              </div>
            </div>
            
          </div>
          {isMemberListOpen && (
        <div className="absolute top-1/6 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full h-full ">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Members</h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={handleToggleMemberList}
              >
                &times;
              </button>
            </div>
            <ul>
              {members.map((member, index) => (
                <li key={index} className="flex items-center mb-2">
                  <div className="w-10 h-10 mr-3">
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      className="rounded-full"
                      width={40}
                      height={40}
                    />
                  </div>
                  <div>
                    <p className="font-bold">{member.name}</p>
                    <p className="text-sm text-gray-600">{member.role}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
        </div>
      </div>
      
    </div>
  );
};

export default ProjectPage;
