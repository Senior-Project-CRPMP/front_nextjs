'use client'
import React,{useState} from 'react';
//import NavBar from './Nav_Bar';
import Feedback from './feedbacks';
import User from './users';
import Link from "next/link";
 function Admin() {
    const [currentPage, setCurrentPage] = useState('dashboard')
    const [isOpen, setIsOpen] = useState(false);

    const PageContent = ({ currentPage }: { currentPage: string }) => {
        return (
          <div>
            {/* Conditional rendering based on currentPage state */}
            {currentPage === "dashboard" && <Dashboard />}
            {currentPage === "feedback" && <Feedback />}
            {currentPage === "user" && <User />}
            
          </div>
        );
      };

    //   const User = () => {
    //     return <h1 className="text-black">User List Content</h1>;
    //   };
      
      const Dashboard = () => {
        return <h1 className="text-black">Dashboard Content</h1>;
      };
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
    return(
        <div className="flex space-x-2">
        <div className="w-1/4 h-screen bg-white rounded-md my-2 shadow-2xl">
            <nav className="border-r bg-white shadow-xl dark:bg-gray-800/40">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-[60px] items-center border-b px-6">
                <button
                    className="flex items-center gap-2 font-semibold"
                    onClick={(e)=>setCurrentPage("dashboard")}
                >
                    <LayoutDashboardIcon className="h-6 w-6" />
                    <span className="">Dashboard</span>
                </button>
                </div>
                <div className="flex-1 overflow-auto py-2">
                <nav className="grid items-start px-4 text-sm font-medium">
                    <button
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    onClick={(e)=>setCurrentPage("feedback")}
                    >
                    <InboxIcon className="h-4 w-4" />
                    FeedBack
                    </button>

                    <button
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    onClick={(e)=>setCurrentPage("user")}
                    >
                    <UsersIcon className="h-4 w-4" />
                    Users
                    </button>
                    <div className="relative">
                    <button
                    type="button"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    onClick={toggleDropdown}
                    >
                    <ProjectsIcon className="h-4 w-4" />
                    Pages
                    </button>

                    {isOpen && (
                    <div className="right-0 mt-2 w-56 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 dark:bg-gray-500">
                    <div className="py-1">
                        <Link href="/"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                        target="_blank" 
                        rel="noopener noreferrer">
                            Welcome Page
                        </Link>
                        <Link href="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                        target="_blank" 
                        rel="noopener noreferrer">
                            Home Page
                        </Link>
                        <Link href="/project_dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                        target="_blank" 
                        rel="noopener noreferrer">
                            Project Page
                        </Link>
                        
                    </div>
                    </div>
                    )}
                    </div>
                </nav>
                </div>
            </div>
            </nav>
        </div>
        <div className='w-full'>
        <PageContent currentPage={currentPage} />
        </div>
        </div>
    );
 }

 function LayoutDashboardIcon(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="7" height="9" x="3" y="3" rx="1" />
        <rect width="7" height="5" x="14" y="3" rx="1" />
        <rect width="7" height="9" x="14" y="12" rx="1" />
        <rect width="7" height="5" x="3" y="16" rx="1" />
      </svg>
    );
  }
  
  
  function UsersIcon(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    );
  }
  
  function InboxIcon(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="#626060"
          d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm0-2h14v-3h-3q-.75.95-1.787 1.475T12 18t-2.212-.525T8 16H5zm7-3q.95 0 1.725-.55T14.8 14H19V5H5v9h4.2q.3.9 1.075 1.45T12 16m-7 3h14z"
        />
      </svg>
    );
  }
  
  function ProjectsIcon(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="1.2rem"
        height="1.2rem"
        viewBox="0 0 24 24"
      >
        <g fill="none" stroke="#626060" stroke-width="1.5">
          <path stroke-linecap="round" d="M18 10h-5" />
          <path d="M10 3h6.5c.464 0 .697 0 .892.026a3 3 0 0 1 2.582 2.582c.026.195.026.428.026.892" />
          <path d="M2 6.95c0-.883 0-1.324.07-1.692A4 4 0 0 1 5.257 2.07C5.626 2 6.068 2 6.95 2c.386 0 .58 0 .766.017a4 4 0 0 1 2.18.904c.144.119.28.255.554.529L11 4c.816.816 1.224 1.224 1.712 1.495a4 4 0 0 0 .848.352C14.098 6 14.675 6 15.828 6h.374c2.632 0 3.949 0 4.804.77c.079.07.154.145.224.224c.77.855.77 2.172.77 4.804V14c0 3.771 0 5.657-1.172 6.828C19.657 22 17.771 22 14 22h-4c-3.771 0-5.657 0-6.828-1.172C2 19.657 2 17.771 2 14z" />
        </g>
      </svg>
    );
  }
  

 export default Admin;