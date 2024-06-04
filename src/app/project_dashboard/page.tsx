"use client";
import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import React, { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import Navigation from "./nav_button";
import images from "../../../public/assets/exportimages";
import Calendar from "./Calendar/page";
import SideCalendar from "./Calendar/sideCalendar";
import Timeline from "./timeline";
import NavBar from "./nav_bar";
import Board from "./board";
import Overview from "./overview/page";


type Project = {
  id: number;
  title: string;
  description: string;
  objective: string;
  startDate: string;
  endDate: string;
  status: string;
  managerId: number;
  id: number;
  title: string;
  description: string;
  objective: string;
  startDate: string;
  endDate: string;
  status: string;
  managerId: number;
};

type Member = {
  name: string;
  role: string;
  email: string;
  avatar: string | StaticImageData;
};


const ProjectPage: React.FC = () => {
  const [project, setProject] = useState<Project | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>();
  const [lastUpdated, setLastUpdated] = useState<string>();
  const [currentPage, setCurrentPage] = useState("overview");
  const projectIdStr = localStorage.getItem("projectId");
  const projectId = projectIdStr !== null ? parseInt(projectIdStr) : null;

  useEffect(() => {
  const projectIdStr = localStorage.getItem('projectId');
  const projectId = projectIdStr !== null ? parseInt(projectIdStr) : null;
  const [isMemberListOpen, setIsMemberListOpen] = useState(false);
  const [isSearchPopupOpen, setIsSearchPopupOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const members: Member[] = [
    { name: 'Member One', role: 'Role One', email: 'member1@example.com', avatar: images.avatar1 },
    { name: 'Member Two', role: 'Role Two', email: 'member2@example.com', avatar: images.avatar2 },
    { name: 'Member Three', role: 'Role Three', email: 'member3@example.com', avatar: images.avatar3 },
    // Add more members as needed
  ];

  const handleToggleMemberList = () => {
    setIsMemberListOpen(!isMemberListOpen);
  };

  const handleToggleSearchPopup = () => {
    setIsSearchPopupOpen(!isSearchPopupOpen);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredMembers = members.filter(
    member =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchCard = async () => {
      const res = await fetch(
        `https://localhost:7174/api/Project/SingleProjectById/${projectId}`
      );
      const data = await res.json();
      setProject(data);
      console.log(data);
      console.log(project);
    };
    fetchCard().catch((error) => console.error(error));
  }, [projectId]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      setLastUpdated(currentDate);
    }
  }, []); // Empty dependency array ensures this effect runs only once on mount
  }, []);

  const PageContent = ({ currentPage }: { currentPage: string }) => {
    return (
      <div>
        {/* Conditional rendering based on currentPage state */}
        {currentPage === "overview" && <Overview project={project} />}
        {currentPage === "overview" && <Overview project={project} />}
        {currentPage === "board" && <Board />}
        {currentPage === "list" && <List />}
        {currentPage === "timeline" && <Timeline />}
        {currentPage === "calendar" && <Calendar />}
        {currentPage === "workflow" && <Workflow />}
        {currentPage === "files" && <Files />}
        {currentPage === "form_builder" && <Formbuilder />}
      </div>
    );
  };

  const List = () => {
    return <h1 className="text-black">List Page Content</h1>;
  };

  const Workflow = () => {
    return <h1 className="text-black">Workflow Page Content</h1>;
  };

  const Files = () => {
    return <h1 className="text-black">Files Page Content</h1>;
  };

  const Formbuilder = () => {
    return <h1 className="text-black">Formbuilder Page Content</h1>;
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="flex space-x-2">
        <div className="w-1/5 h-screen bg-white rounded-md my-2 shadow-2xl">
          <NavBar />
        </div>
        <div className="h-full bg-white rounded-md my-2 mr-2 w-4/5">

        <div className="h-full bg-white rounded-md my-2 mr-2 w-4/5">
          <div className="p-4 flex-col h-full space-x-0">
            <div className="h-1/6">
              <div className="flex space-x-96">
                <h1 className="text-neutral-900 text-2xl font-bold pr-96">
            <div className="h-1/6">
              <div className="flex space-x-96">
                <h1 className="text-neutral-900 text-2xl font-bold pr-96">
                  {project?.title}
                </h1>
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
                  <div className="absolute left-24 top-1">
                    <div
                      className="rounded-full h-6 w-6 flex items-center justify-center border-dotted border-2 border-gray-500 cursor-pointer"
                      onClick={handleToggleSearchPopup}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="black"
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              {lastUpdated && (
                <p className="text-sm text-gray-600">Last Update: {lastUpdated}</p>
              )}
              <div className="space-y-1.5 mt-5">
                <Navigation setCurrentPage={setCurrentPage} />
                <div className="border-t border-grey"></div>
              </div>
              <div className="space-y-10"></div>
            </div>
            <div className="h-5/6 m-3">
              <div className="flex h-full space-x-2 mx-2">
                <div className="w-72 grow bg-white rounded-md shadow-2xl p-10">
                  <PageContent currentPage={currentPage} />
                  {isMemberListOpen && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                      <div className="bg-white rounded-lg shadow-lg p-6 w-3/5 h-3/5">
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
                                <p className="text-sm text-gray-600">
                                  {member.role}
                                </p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                  {isSearchPopupOpen && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                      <div className="bg-white rounded-lg shadow-lg p-6 w-3/5 h-3/5">
                        <div className="flex justify-between items-center mb-4">
                          <h2 className="text-xl font-bold">
                            Search To Add Member
                          </h2>
                          <button
                            className="text-gray-500 hover:text-gray-700"
                            onClick={handleToggleSearchPopup}
                          >
                            &times;
                          </button>
                        </div>
                        <input
                          type="text"
                          className="border rounded p-2 mb-4 w-full"
                          placeholder="Search by name or email"
                          value={searchTerm}
                          onChange={handleSearchChange}
                        />
                        <ul>
                          {filteredMembers.map((member, index) => (
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
                                <p className="text-sm text-gray-600">
                                  {member.role}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {member.email}
                                </p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
                <div className="w-72 bg-white rounded-md shadow-2xl">
                  {currentPage === "calendar" && <SideCalendar />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
