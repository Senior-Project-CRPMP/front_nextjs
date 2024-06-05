'use client'
import Link from "next/link";
import Project_Header from "../component/project_header";
import NotificationBell from "../component/notificationBell";

import {useEffect, useState} from 'react';

export default function DashboardLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const [notificationCount, setNotificationCount] = useState(0)
  const userId = typeof window !== 'undefined' ? localStorage.getItem('loggeduserid') : null;

    const fetchNotifications = async () => {
      try {
        const res = await fetch(`https://localhost:7174/api/Notification/user/${userId}/unread/count`);
        const data = await res.json();
        console.log(data)

        setNotificationCount(data);
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchNotifications();

  async function setNotificationToRead() {
    try {
        const res = await fetch(`https://localhost:7174/api/Notification/user/${userId}/mark-as-read`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (res.ok) {
            console.log("Notifications marked as read successfully.");
            fetchNotifications()
        } else {
            console.error("Failed to mark notifications as read:", res.statusText);
        }
    } catch (error) {
        console.error("Error", error);
    }
}


  return (
    <div className="h-screen grid grid-rows-[auto_1fr]">
      <div className="border-b bg-white shadow-xl dark:bg-gray-800/40">
        <Project_Header />
      </div>
      <div className="grid grid-cols-[240px_1fr] h-full">
        <nav className="border-r bg-white shadow-xl dark:bg-gray-800/40">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-[60px] items-center border-b px-6">
              <Link
                className="flex items-center gap-2 font-semibold"
                href="/dashboard"
              >
                <LayoutDashboardIcon className="h-6 w-6" />
                <span className="">Dashboard</span>
              </Link>
            </div>
            <div className="flex-1 overflow-auto py-2">
              <nav className="grid items-start px-4 text-sm font-medium">
                <Link
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  href="/dashboard/projects"
                >
                  <ProjectsIcon className="h-4 w-4" />
                  Projects
                </Link>

                <Link
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  href="/dashboard/account"
                >
                  <UsersIcon className="h-4 w-4" />
                  Account
                </Link>

                <Link
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  href="/dashboard/chat"
                >
                  <InboxIcon className="h-4 w-4" />
                  Inbox
                </Link>

                <NotificationBell unreadCount={notificationCount} />

                <Link
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  href="/dashboard/browse"
                >
                  <BrowseIcon className="h-4 w-4" />
                  Browse
                </Link>

                <Link
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  href="/dashboard/Setting"
                >
                  <SettingsIcon className="h-4 w-4" />
                  Settings
                </Link>
                <Link
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  href="/dashboard/help"
                >
                  <HelpIcon className="h-4 w-4" />
                  Help
                </Link>
              </nav>
            </div>
          </div>
        </nav>
        <main className="flex flex-col overflow-scroll">{children}</main>
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

function PieChartIcon(props: any) {
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
      <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
      <path d="M22 12A10 10 0 0 0 12 2v10z" />
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

function ViewIcon(props: any) {
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
      <path d="M5 12s2.545-5 7-5c4.454 0 7 5 7 5s-2.546 5-7 5c-4.455 0-7-5-7-5z" />
      <path d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
      <path d="M21 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2" />
      <path d="M21 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2" />
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
function NotificationIcon(props: any) {
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
        d="M4 8a8 8 0 0 1 16 0v6h1v1h-3v1H6v-1H3v-1h1V8zm2.5 7h11V8a5.5 5.5 0 0 0-11 0v7zm5.5 5c-.825 0-1.413-.587-1.413-1.413h2.825C13.413 19.587 12.825 20 12 20zm-.5-4h1v.5h-1V16zm-6 0h1v.5h-1V16zm12 0h1v.5h-1V16z"
      />
    </svg>
  );
}

function BrowseIcon(props: any) {
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
        d="M5 18.414 18.414 5 19 5.586 5.586 19 5 18.414zm0-4 9.414-9.414.586.586L5.586 15 5 14.414zm0-4L9.414 6l.586.586L5.586 11 5 10.414zm0-4L6.586 3 7 3.414 5.414 5 5 4.414zM4 19q-.825 0-1.413-.587T2 17V7q0-.825.588-1.413T4 5h10q.825 0 1.413.588T16 7v10q0 .825-.587 1.413T14 19H4zm0-2h10V7H4v10zm14 2q-.425 0-.713-.288T17 18V4q0-.425.288-.713T18 3h3q.425 0 .713.288T22 4v14q0 .425-.288.713T21 19h-3z"
      />
    </svg>
  );
}
function SettingsIcon(props: any) {
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
        d="M6 21q-.825 0-1.412-.588T4 19v-3h2v3h12V8h-3V6h3q.825 0 1.413.588T20 8v11q0 .825-.587 1.413T18 21H6zm0-7q-.825 0-1.412-.588T4 12V8q0-.825.588-1.413T6 6h4V5q0-.825.588-1.413T12 3h6q.825 0 1.413.588T20 5v6q0 .825-.587 1.413T18 13h-1v-2h1V5h-6v1h-2v1h-5v4h3v2H6zm0 4v-2h2v2H6zm0-5v-2h2v2H6zm8-3v-1h1v1h-1zm0-2v-1h1v1h-1zM7 10q-.425 0-.713-.288T6 9q0-.425.288-.713T7 8h1v2H7zm-2 1H4V9q0-.425.288-.713T5 8h1v3zm-2 2q-.425 0-.713-.288T2 11q0-.425.288-.713T3 10h1v3H3zm6 1H7v-1h2v1zm2-2H9V8h2v3zm1-5q-.425 0-.713-.288T10 3q0-.425.288-.713T11 2h2v1h-2zm6 5q-.425 0-.713-.288T16 8q0-.425.288-.713T17 7h1v3h-1zm2 3q-.425 0-.713-.288T18 12q0-.425.288-.713T19 11h1v3h-1zM8 3H7v1h1V3zm-2 2H5V4h1v1zm-2 3H3V6h1v1zm6 8q-.425 0-.713-.288T7 17q0-.425.288-.713T8 16h1v2H8zM6 4q-.425 0-.713-.288T5 3q0-.425.288-.713T6 2h2v1H6v1zM4 5V3h1v2H4zm0 4V7h1v2H4z"
      />
    </svg>
  );
}

function HelpIcon(props: any) {
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
        d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20zm0 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-7v-1c0-.82.448-1.528 1.112-1.946C12.416 9.434 13 8.762 13 8c0-.82-.673-1.5-1.5-1.5S10 7.18 10 8H9c0-1.327 1.074-2.4 2.4-2.4S14 6.673 14 8c0 1.124-.818 1.974-1.799 2.477-.458.25-.701.748-.701 1.274v1h-1zm0 4v-2h1v2h-1z"
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
