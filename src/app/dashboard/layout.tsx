'use client';
import Link from "next/link";
import Project_Header from "../component/project_header";
import NotificationBell from "../component/notificationBell";

import React, { ReactNode } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
}

interface DashboardLayoutState {
  notificationCount: number;
  userId: string | null;
  apiBaseUrl: string | undefined;
  intervalId?: NodeJS.Timeout;
}

class DashboardLayout extends React.Component<DashboardLayoutProps, DashboardLayoutState> {
  constructor(props: DashboardLayoutProps) {
    super(props);
    this.state = {
      notificationCount: 0,
      userId: typeof window !== 'undefined' ? localStorage.getItem('loggeduserid') : null,
      apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    };
  }

  componentDidMount() {
    this.fetchNotifications();
    const intervalId = setInterval(this.fetchNotifications, 1000);
    this.setState({ intervalId });
  }

  componentWillUnmount() {
    if (this.state.intervalId) {
      clearInterval(this.state.intervalId);
    }
  }

  fetchNotifications = async () => {
    try {
      const { userId, apiBaseUrl } = this.state;
      const res = await fetch(`${apiBaseUrl}/api/Notification/user/${userId}/unread/count`);
      const data = await res.json();
      this.setState({ notificationCount: data });
    } catch (error) {
      console.error("Error", error);
    }
  };

  setNotificationToRead = async () => {
    try {
      const { userId } = this.state;
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const res = await fetch(`${apiBaseUrl}/api/Notification/user/${userId}/mark-as-read`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (res.ok) {
        console.log("Notifications marked as read successfully.");
        this.fetchNotifications();
      } else {
        console.error("Failed to mark notifications as read:", res.statusText);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  render() {
    const { children } = this.props;
    const { notificationCount } = this.state;

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
                    href="/dashboard/account"
                  >
                    <UsersIcon className="h-4 w-4" />
                    Account
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
}

export default DashboardLayout;

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
        d="M5 21h14c1.1 0 1.99-.9 1.99-2L21 8c0-1.1-.9-2-2-2h-4.24l-1.34-1.34C13.18 4.26 12.76 4 12.29 4H7c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2zm6.7-7.46c.6.6 1.3.96 2.3.96 1 0 1.7-.36 2.3-.96l2.18-2.19c.19-.18.44-.29.71-.29s.51.1.71.29c.18.19.29.44.29.71s-.11.52-.29.71l-2.18 2.19c-.9.89-2.01 1.34-3.3 1.34s-2.4-.45-3.3-1.34l-2.19-2.19c-.18-.18-.29-.43-.29-.71s.11-.52.29-.71c.39-.39 1.03-.39 1.42 0l2.18 2.19zm0-6c.6.6 1.3.96 2.3.96 1 0 1.7-.36 2.3-.96l2.18-2.19c.19-.18.44-.29.71-.29s.51.1.71.29c.18.19.29.44.29.71s-.11.52-.29.71l-2.18 2.19c-.9.89-2.01 1.34-3.3 1.34s-2.4-.45-3.3-1.34l-2.19-2.19c-.18-.18-.29-.43-.29-.71s.11-.52.29-.71c.39-.39 1.03-.39 1.42 0l2.18 2.19z"
      />
    </svg>
  );
}

function ProjectsIcon(props: any) {
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
      <path d="M4 21V8a2 2 0 0 1 2-2h3" />
      <path d="M16 21v-4" />
      <path d="M12 21V11" />
      <path d="M20 21v-6" />
      <path d="M18 5l3 3-3 3" />
      <path d="M15 2h6v6" />
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
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
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
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 5 15.4a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 5.6V5a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 18.4 9c0 .64.24 1.26.68 1.74.45.45 1.06.68 1.69.68H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
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
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.91 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  );
}
