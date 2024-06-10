"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import images from "../../../public/assets/exportimages";
import Link from "next/link";
import { useRouter } from "next/navigation";

type User = {
  id: string;
  firstName: string;
  lastName: string;
};

const ProfileDropdown: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const userEmail = typeof window !== 'undefined' ? localStorage.getItem('loggedinfo') : null;
  const router = useRouter();

  function logout() {
    if (isClient) {
      localStorage.setItem("loggedin", "false");
      localStorage.setItem("loggedinfo", "");
      localStorage.setItem("loggeduserinfo", "");
      router.push("/");
    }
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(
          `https://localhost:7174/api/Account/user/email/${userEmail}`
        );
        const data = await res.json();
        console.log(data);

        setUser(data);
        localStorage.setItem("loggeduserid", data.id);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    // Set isClient to true to ensure we're in a client-side context
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="relative flex justify-center items-center">
      <div className="w-64 flex justify-center items-center">
        <div
          onClick={() => setOpen(!open)}
          className={`relative border-b-4 border-transparent py-3 cursor-pointer ${
            open ? "border-indigo-700 transform transition duration-300" : ""
          }`}
        >
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 dark:border-white border-gray-900">
              <Image
                src={images.avatar1}
                alt="Profile"
                width={48}
                height={48}
                className="object-cover"
              />
            </div>
            <div className="font-semibold dark:text-white text-white text-lg">
              <div>
                {user?.firstName} {user?.lastName}
              </div>
            </div>
          </div>
          {open && (
            <div
              className="absolute w-60 px-5 py-3 dark:bg-gray-800 bg-white rounded-lg shadow border dark:border-transparent mt-5"
              style={{
                top: "70px",
                transition: "transform opacity 0.3s ease-out",
              }}
            >
              <ul className="space-y-3 text-black">
                <li className="font-medium">
                  <Link
                    href="/dashboard/Test"
                    className="flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-indigo-700"
                  >
                    <div className="mr-3">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    Account
                  </Link>
                </li>
                <li className="font-medium">
                  <a
                    href="#"
                    className="flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-indigo-700"
                  >
                    <div className="mr-3">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    Setting
                  </a>
                </li>
                <hr className="dark:border-gray-700" />
                <li className="font-medium">
                  <button
                    onClick={logout}
                    className="flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-red-600"
                  >
                    <div className="mr-3 text-red-600">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                    </div>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileDropdown;
