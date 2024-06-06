'use client'
import React, {useState} from 'react';
import Link from 'next/link';
import { FiBell } from 'react-icons/fi';

// Define the props for the NotificationBell component
interface NotificationBellProps {
  unreadCount: number; // Required unreadCount prop
  className?: string;  // Optional className prop
}

const NotificationBell: React.FC<NotificationBellProps> = ({ unreadCount, className }) => {
  const [notificationCount, setNotificationCount] = useState(0)
  const userId = typeof window !== 'undefined' ? localStorage.getItem('loggeduserid') : null;


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
        } else {
            console.error("Failed to mark notifications as read:", res.statusText);
        }
    } catch (error) {
        console.error("Error", error);
    }
}


  return (
    <Link
      className={`relative flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${className}`}
      href="/dashboard/Notification"
    >
      
      <FiBell className="h-4 w-4" />
      
      {unreadCount > 0 && (
        <span className="absolute top-2 right-45 transform translate-x-1/2 -translate-y-1/2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
          {unreadCount}
        </span>
      )}
      <label onClick={setNotificationToRead}>Notification</label>
    </Link>
  );
};

export default NotificationBell;
