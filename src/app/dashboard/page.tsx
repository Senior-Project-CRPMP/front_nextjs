'use client'
import React, {useState, useEffect} from "react";
import Image from "next/image";
import Link from "next/link";

type User = {
  id: string;
  firstName: string;
  lastName: string;
};

function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const userEmail = typeof window !== 'undefined' ? localStorage.getItem('loggedinfo') : null;
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${apiBaseUrl}/api/Account/user/email/${userEmail}`);
        const data = await res.json();
        console.log(data)

        setUser(data);
        localStorage.setItem('loggeduserid', data.id)
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchUser();
  }, []);
  
  return (
    <>
    <div className="max-w-4xl mx-auto m-10">
      {/* <h6 className="text-3xl font-extralight text-gray-900 text-center p-6">
        Recent Projects
      </h6> */}
      <div className="flex flex-wrap justify-around">
        {[
          "Create new project",
        ].map((project, index) => (
          <div
            key={index}
            className="flex flex-col justify-between max-w-xs w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-4 p-6"
            style={{ minHeight: "300px" }}
          >
            <div className="text-center">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {project}
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {project === "Create new project"
                  ? "New project here"
                  : "Description"}
              </p>
            </div>
            <div className="text-center">
              <Link
                href={
                  project === "Create new project"
                    ? "/dashboard/createProject"
                    : "/project_dashboard"
                }
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {project === "Create new project" ? "Add" : "Open"}
                {project === "Create new project" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.5em"
                    height="1.5em"
                    viewBox="0 0 24 24"
                    className="ml-2"
                  >
                    <g fill="none">
                      <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                      <path
                        fill="#fffafa"
                        d="M10.5 20a1.5 1.5 0 0 0 3 0v-6.5H20a1.5 1.5 0 0 0 0-3h-6.5V4a1.5 1.5 0 0 0-3 0v6.5H4a1.5 1.5 0 0 0 0 3h6.5z"
                      />
                    </g>
                  </svg>
                )}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Dashboard;
