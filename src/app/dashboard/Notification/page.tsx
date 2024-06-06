// components/NotificationPage.tsx
'use client'
import React, { useState, useEffect } from 'react';
import { FiBell, FiSettings, FiX } from 'react-icons/fi';
import NotificationSettings from './NotificatonSettings';

const members = [
  { name: 'Member One', role: 'Role One', email: 'member1@example.com', avatar: '/avatar1.jpg' },
  { name: 'Member Two', role: 'Role Two', email: 'member2@example.com', avatar: '/avatar2.jpg' },
  { name: 'Member Three', role: 'Role Three', email: 'member3@example.com', avatar: '/avatar3.jpg' },
  // Add more members as needed
];

type Notification = {
  id: number;
  userid : string;
  message: string;
  dateCreated: string;
  isRead: boolean;

}

const NotificationPage: React.FC = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [notification, setNotification] = useState<Notification[]>([])
  const userId = typeof window !== 'undefined' ? localStorage.getItem('loggeduserid') : null;

  const handleSettingsToggle = () => {
    setShowSettings(!showSettings);
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch('https://localhost:7174/api/Notification/user/${userId}');
        const data = await res.json();
        console.log(data)

        setNotification(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-4 rounded shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Notifications</h1>
          <button onClick={handleSettingsToggle} className="flex items-center p-2 bg-gray-200 rounded">
            <FiSettings className="text-xl" />
            <span className="ml-2">Settings</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
          {notification.map(notification => (
            <div key={notification.id} className="bg-white p-4 rounded shadow-md flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="text-gray-600">{notification.message}</div>
                <button className="ml-2 p-1 bg-red-500 text-white rounded">
                  <FiX />
                </button>
              </div>
              <div className="text-gray-400 text-sm mt-4 self-end">{notification.dateCreated}</div>
            </div>
          ))}
        </div>
      </div>
      {showSettings && (
          < NotificationSettings />
      )}
    </div>
  
  );
};

export default NotificationPage;