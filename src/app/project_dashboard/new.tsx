"use client";
import React from "react";
import Image from "next/image";
import { useState } from "react";
import Navigation from "./nav_button";
import images from "../../../public/assets/exportimages";
import Calendar from "./Calendar/page";
import SideCalendar from "./Calendar/sideCalendar";
import Timeline from "./timeline";
import NavBar from "./nav_bar";
import Board from "./board";

type StaticImageData = {
  src: string;
  height: number;
  width: number;
  placeholder?: string;
};


type Member = {
  name: string;
  role: string;
  email: string;
  avatar: String | StaticImageData;
};

const ProjectPage: React.FC = () => {
  // Define state for lastUpdated
  const [lastUpdated, setLastUpdated] = React.useState<string>();
  const [currentPage, setCurrentPage] = useState("overview");
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);

  const members: Member[]  = [
    { name: 'Member One', role: 'Role One', email: 'member1@example.com', avatar: images.avatar1 },
    { name: 'Member Two', role: 'Role Two', email: 'member2@example.com', avatar: images.avatar2 },
    { name: 'Member Three', role: 'Role Three', email: 'member3@example.com', avatar: images.avatar3 },
    // Add more members as needed
  ];

  const handleMemberClick = (member: Member) => {
    setSelectedMember(member);
  };

  const handleAddMemberClick = () => {
    setIsAddMemberModalOpen(true);
  };

  const handleAddMember = (newMember: Member) => {
    // Add the new member to your state or handle as needed
    console.log('New member added:', newMember);
  };

  const handleCloseMemberDetails = () => {
    setSelectedMember(null);
  };

  const handleCloseAddMemberModal = () => {
    setIsAddMemberModalOpen(false);
  };

  React.useEffect(() => {
    // Run this effect only on the client side
    if (typeof window !== "undefined") {
      // Get the current date and format it as needed
      const currentDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      setLastUpdated(currentDate);
    }
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const PageContent = ({ currentPage }: { currentPage: string }) => {
    return (
      <div>
        {/* Conditional rendering based on currentPage state */}
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
  };

  const Overview = () => {
    return <h1 className="text-black">Overview Page Content</h1>;
  };

  // const Board = () => {
  //   return <h1 className="text-black">Board Page Content</h1>;
  // };

  const List = () => {
    return <h1 className="text-black">List Page Content</h1>;
  };

  // const Timeline = () => {
  //   return <h1 className="text-black">Timeline Page Content</h1>;
  // };

  // const Calendar = () => {
  //   return (
  //     <h1 className="text-black">
  //       <Calendar />
  //     </h1>
  //   );
  // };

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
    <div>
      <div className="flex space-x-2">
        <div className="w-1/5 h-screen bg-white rounded-md my-2 shadow-2xl">
          <NavBar />
        </div>
        <div className=" h-full bg-white rounded-md my-2 mr-2 w-4/5">
          <div className="p-4 flex-col h-full space-x-0">
            <div className="h-1/6 "> 
              <div className="flex space-x-96 ">
                <h1 className=" text-neutral-900 text-2xl font-bold pr-96 ">
                  Project One
                </h1>
                <div className="relative ">
                  <div className="absolute left-0">
                    <div className=" rounded-full h-8 w-8 items-center justify-center">
                      <Image
                        src={images.avatar3}
                        className="h-full w-full rounded-full object-cover"
                        alt="profile"
                      />
                    </div>
                  </div>
                  <div className="absolute left-5">
                    <div className=" rounded-full h-8 w-8 items-center justify-center">
                      <Image
                        src={images.avatar2}
                        className="h-full w-full rounded-full object-cover"
                        alt="profile"
                      />
                    </div>
                  </div>
                  <div className="absolute left-10">
                    <div className=" rounded-full h-8 w-8 items-center justify-center">
                      <Image
                        src={images.avatar1}
                        className="h-full w-full rounded-full object-cover"
                        alt="profile"
                      />
                    </div>
                  </div>
                  <div className="absolute left-14">
                    <div className="bg-blue-500 rounded-full h-8 w-8 flex items-center justify-center">
                      <span className="text-white font-bold text-sm ">+7</span>
                    </div>
                  </div>

                  <div className="absolute left-24 top-1">
                    {/* <a href="#" onClick={handleClick}> */}
                    <div className="rounded-full h-6 w-6 flex items-center justify-center border-dotted border-2 border-gray-500">
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
                    {/* </a> */}
                  </div>
                </div>
              </div>
              {lastUpdated && (
                <p className=" text-sm text-gray-600 mb-5">
                  Last Update: {lastUpdated}
                </p>
              )}
              <div className="space-y-28 text-black"><h1>htu</h1></div>
              <div className=" space-y-1.5 ">
                <Navigation setCurrentPage={setCurrentPage} />

                <div className="border-t border-grey"></div>
              </div>
                </div>    
            </div>
            <div className="h-5/6 m-3">
              <div className="flex h-full space-x-2  mx-2 ">
                <div className="  w-72 grow   bg-white rounded-md shadow-2xl p-10 ">
                  <PageContent currentPage={currentPage} />
                </div>
                <div className=" w-72  bg-white rounded-md shadow-2xl">
                {currentPage === "calendar" && <SideCalendar />}
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default ProjectPage;