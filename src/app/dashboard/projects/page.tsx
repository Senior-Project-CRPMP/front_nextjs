"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Project {
  id: number;
  title: string;
  status: string;
  description : string;
  // Add other properties as needed
}

export default function Projects() {
  const router = useRouter();
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("loggeduserid") : null;
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectDescription, setNewProjectDescription] = useState("");
  const [inviteFriend, setInviteFriend] = useState("");
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(
          `${apiBaseUrl}/api/UserProject/projectsByUserId/${userId}`
        );
        const data = await res.json();
        setProjects(data);
        console.log(data)
        console.log(projects)
      } catch (error) {
        console.error(error);
      }
    };

    fetchProjects();
  }, []);

  const handleCreateProject = () => {
    console.log("Project Name:", newProjectName);
    console.log("Project Description:", newProjectDescription);
    console.log("Invite Friend:", inviteFriend);
    setIsModalOpen(false);
  };

  return (
    <div className="bg-slate-50 from-violet-100 to-indigo-100 flex  h-screen">
      <div className="w-11/12 sm:w-11/12 md:w-8/12 lg:w-full backdrop-blur-sm bg-white/40 p-8  rounded-lg shadow-lg border-violet-200 border">
        <div className="w-full flex justify-between  p-4">
          <h2 className="text-xl font-semibold">My Project</h2>
          <button
            id="openModalBtn"
            className="flex items-center bg-gradient-to-r from-violet-300 to-indigo-300 border border-fuchsia-00 hover:border-violet-100 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300"
            onClick={()=>router.push('/dashboard/createProject')}
          >
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
            <p className="text-white">New Project</p>
          </button>
        </div>
        <div className="w-full flex justify-center p-1 mb-4">
          <div className="relative w-full">
            <input
              type="text"
              className="w-full backdrop-blur-sm bg-white/20 py-2 pl-10 pr-4 rounded-lg focus:outline-none border-2 border-gray-100 focus:border-violet-300 transition-colors duration-300"
              placeholder="Search..."
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="backdrop-blur-sm bg-white/20 p-6 rounded-md shadow-sm cursor-pointer border-2 border-gray-100 hover:border-blue-200 transition-colors duration-300"
              onClick={()=>{localStorage.setItem('projectId', JSON.stringify(project.id)); router.push('/project_dashboard')}}
            >
              <h2 className="text-xl font-semibold mb-4">{project.title}</h2>
              <p className="text-gray-700">
                {project.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && (
        <div
          id="myModal"
          className="fixed inset-0 z-10 overflow-hidden backdrop-blur-lg flex items-center justify-center transition-transform duration-300"
        >
          <div className="modal-container p-6 backdrop-blur-sm bg-white/90 w-11/12 sm:w-11/12 md:w-8/12 lg:w-6/12 rounded-md shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">Create New Project</h2>
            <label
              htmlFor="projectName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Project Name
            </label>
            <input
              type="text"
              id="projectName"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              className="w-full p-2 mb-4 rounded-lg focus:outline-none border-2 border-gray-100 focus:border-violet-300 transition-colors duration-300"
            />
            <div className="lg:flex">
              <div className="lg:w-1/2 lg:pr-4">
                <label
                  htmlFor="projectDescription"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Description
                </label>
                <input
                  id="projectDescription"
                  value={newProjectDescription}
                  onChange={(e) => setNewProjectDescription(e.target.value)}
                  className="w-full p-2 mb-4 rounded-lg focus:outline-none border-2 border-gray-100 focus:border-violet-300 transition-colors duration-300"
                />
              </div>
              <div className="lg:w-1/2">
                <label
                  htmlFor="inviteFriend"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Invite Friend
                </label>
                <input
                  type="text"
                  id="inviteFriend"
                  value={inviteFriend}
                  onChange={(e) => setInviteFriend(e.target.value)}
                  className="w-full p-2 mb-4 rounded-lg focus:outline-none border-2 border-gray-100 focus:border-violet-300 transition-colors duration-300"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                className="bg-gradient-to-r from-violet-300 to-indigo-300 border border-fuchsia-00 hover:border-violet-100 text-white font-semibold py-2 px-4 rounded-md mr-2"
                onClick={handleCreateProject}
              >
                Create
              </button>
              <button
                className="bg-gradient-to-r from-gray-100 to-slate-200 border border-fuchsia-00 hover:border-violet-100 text-gray-800 font-semibold py-2 px-4 rounded-md transition-colors duration-300"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
