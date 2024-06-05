import React from 'react';
import Link from 'next/link';
import { FiBell } from 'react-icons/fi';

// Define the props for the NotificationBell component
interface NotificationBellProps {
  unreadCount: number; // Required unreadCount prop
  className?: string;  // Optional className prop
}

const NotificationBell: React.FC<NotificationBellProps> = ({ unreadCount, className }) => {
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
      <label>Notification</label>
    </Link>
  );
};

export default NotificationBell;
