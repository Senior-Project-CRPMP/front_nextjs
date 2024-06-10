"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Navigation from "./nav_button";
import images from "../../../public/assets/exportimages";
import Calendar from "./Calendar/page";
import SideCalendar from "./Calendar/sideCalendar";
import Timeline from "./timeline";
import NavBar from "./nav_bar";
import Board from "./board";
import Overview from "./overview/page";
import TaskLister from "@/app/component/taskLister";
import Link from "next/link";

type Project = {
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
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
};

type Role = {
  userId: string;
  role: string;
};

const ProjectPage: React.FC = () => {
  const [project, setProject] = useState<Project | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>();
  const [currentPage, setCurrentPage] = useState("overview");
  const [isMemberListOpen, setIsMemberListOpen] = useState(false);
  const [isSearchPopupOpen, setIsSearchPopupOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [roles, setRoles] = useState<Role[]>([]);
  const [allUsers, setAllUsers] = useState<Member[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<{
    [userId: string]: string;
  }>({});
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const projectIdStr =
    typeof window !== "undefined" ? localStorage.getItem("projectId") : null;
  const projectId = projectIdStr !== null ? parseInt(projectIdStr) : null;

  const [members, setMembers] = useState<Member[]>([]);

  const handleToggleMemberList = () => {
    setIsMemberListOpen(!isMemberListOpen);
  };

  const handleToggleSearchPopup = () => {
    setIsSearchPopupOpen(!isSearchPopupOpen);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = allUsers.filter(
    (user) =>
      user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.userName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(`${apiBaseUrl}/api/Account/users`);
      const data = await res.json();
      setAllUsers(data);
      console.log(data);
      console.log(allUsers);
    };
    fetchUsers().catch((error) => console.error(error));
  }, [projectId]);

  useEffect(() => {
    const fetchCard = async () => {
      const res = await fetch(
        `${apiBaseUrl}/api/Project/SingleProjectById/${projectId}`
      );
      const data = await res.json();
      setProject(data);
      console.log(data);
      console.log(project);
    };
    fetchCard().catch((error) => console.error(error));
  }, [projectId]);

  useEffect(() => {
    const fetchMember = async () => {
      const res = await fetch(
        `${apiBaseUrl}/api/UserProject/usersByProjectId/${projectId}`
      );
      const data = await res.json();
      setMembers(data);
      console.log(data);
      console.log(members);
    };
    fetchMember().catch((error) => console.error(error));
  }, [projectId]);

  useEffect(() => {
    const fetchRole = async () => {
      const res = await fetch(
        `${apiBaseUrl}/api/UserProject/userProjectsByProjectId/${projectId}`
      );
      const data = await res.json();
      setRoles(data);
      console.log("Roles:", data);
      console.log(roles);
    };
    fetchRole().catch((error) => console.error(error));
  }, []);

  const getRoleByMember = (member: Member): Role | null => {
    console.log(member.id);
    console.log(roles);
    const role = roles.find((r) => r.userId === member.id);
    console.log(role);
    return role || null;
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

  const handleRoleChange = (userId: string, role: string) => {
    setSelectedRoles((prevState) => ({
      ...prevState,
      [userId]: role,
    }));
  };

  const handleAddClick = async (user: Member) => {
    // Check if a role is selected
    if (!selectedRoles) {
      alert("Please select a role");
      return;
    }

    try {
      const response = await fetch(`${apiBaseUrl}/api/UserProject`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          projectId: projectId,
          role: selectedRoles[user.id],
        }),
      });

      if (response.ok) {
        console.log("Member added successfully");
        setMembers((prevMembers) => [...prevMembers, user]);
      } else {
        // Handle error, maybe show an error message or handle it in another way
        console.error("Failed to add user to project");
      }
    } catch (error) {
      console.error("Error adding user to project:", error);
    }
  };

  const PageContent = ({ currentPage }: { currentPage: string }) => {
    return (
      <div>
        {currentPage === "overview" && <Overview project={project} />}
        {currentPage === "board" && <Board />}
        {currentPage === "list" && <List />}
        {/* {currentPage === "timeline" && <Timeline />} */}
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
          <div className="p-4 flex-col h-full space-x-0">
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
                <p className="text-sm text-gray-600">
                  Last Update: {lastUpdated}
                </p>
              )}
              <div className="space-y-1.5 mt-5">
                <Navigation setCurrentPage={setCurrentPage} />
                <div className="border-t border-grey"></div>
              </div>
              <div className="space-y-10"></div>
            </div>
            <div className="h-5/6 m-3">
              <div className="flex h-full space-x-2 mx-2">
                <div className="w-92 grow bg-white rounded-md shadow-2xl p-10">
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
                          {members.map((member) => (
                            <li
                              key={member.id}
                              className="flex items-center mb-2"
                            >
                              <div>
                                <p className="font-bold">
                                  {member.firstName} {member.lastName}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {getRoleByMember(member)?.role ||
                                    "Role not found"}
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
                          {filteredUsers.map((user) => {
                            const isMember = members.some(
                              (member) => member.id === user.id
                            );
                            return (
                              <li
                                key={user.id}
                                className="flex items-center mb-2"
                              >
                                <div>
                                  <p className="font-bold">
                                    {user.firstName} {user.lastName}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    {user.userName}
                                  </p>
                                </div>
                                <div className="flex items-center ml-auto">
                                  {isMember ? (
                                    <span className="text-green-500">✔</span>
                                  ) : (
                                    <>
                                      <select
                                        className="mr-2"
                                        value={selectedRoles[user.id] || ""}
                                        onChange={(e) =>
                                          handleRoleChange(
                                            user.id,
                                            e.target.value
                                          )
                                        }
                                      >
                                        <option value="">Select Role</option>
                                        <option value="supervisor">
                                          Supervisor
                                        </option>
                                        <option value="researcher">
                                          Researcher
                                        </option>
                                      </select>
                                      <button
                                        onClick={() => handleAddClick(user)}
                                      >
                                        Add
                                      </button>
                                    </>
                                  )}
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
                <div className="w-72 bg-white rounded-md shadow-2xl">
                  {currentPage === "calendar" && <SideCalendar />}
                  {currentPage === "overview" && (
                    <div>
                      <Link href="/addtask">
                        <button className="flex items-center bg-gradient-to-r from-violet-300 to-indigo-300 border border-fuchsia-00 hover:border-violet-100 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300">
                          <svg
                            className="w-4 h-4 mr-2 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            ></path>
                          </svg>
                          <p className="text-white">Add Task</p>
                        </button>
                      </Link>
                      <TaskLister />
                    </div>
                  )}
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
