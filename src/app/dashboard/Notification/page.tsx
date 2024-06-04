// components/NotificationPage.tsx
'use client'
import React, { useState } from 'react';
import { FiBell, FiSettings, FiX } from 'react-icons/fi';

const members = [
  { name: 'Member One', role: 'Role One', email: 'member1@example.com', avatar: '/avatar1.jpg' },
  { name: 'Member Two', role: 'Role Two', email: 'member2@example.com', avatar: '/avatar2.jpg' },
  { name: 'Member Three', role: 'Role Three', email: 'member3@example.com', avatar: '/avatar3.jpg' },
  // Add more members as needed
];

const notifications = [
  { id: 1, type: 'task', message: 'Task "Literature Review" has been assigned to you. Due date: July 15, 2024.', timestamp: '2 hours ago' },
  { id: 2, type: 'project', message: 'Project "AI Research" has reached the milestone "Prototype Development".', timestamp: '1 day ago' },
  { id: 3, type: 'comment', message: 'John Doe commented on the task "Data Analysis": "Can we discuss the latest findings?"', timestamp: '3 days ago' },
  { id: 4, type: 'document', message: 'New version of "Research Proposal" has been uploaded by Jane Smith.', timestamp: '5 days ago' },
  { id: 5, type: 'meeting', message: 'Reminder: Meeting on "Research Methodologies" scheduled for tomorrow at 10 AM.', timestamp: '1 week ago' },
  // Add more notifications as needed
];

const NotificationPage: React.FC = () => {
  const [showSettings, setShowSettings] = useState(false);

  const handleSettingsToggle = () => {
    setShowSettings(!showSettings);
  };

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notifications.map(notification => (
            <div key={notification.id} className="bg-white p-4 rounded shadow-md flex flex-col">
              <div className="flex justify-between items-center">
                <div className="text-gray-600">{notification.message}</div>
                <div className="text-gray-400 text-sm">{notification.timestamp}</div>
              </div>
              <button className="self-end mt-2 p-1 bg-red-500 text-white rounded">
                <FiX />
              </button>
            </div>
          ))}
        </div>
      </div>
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Notification Settings</h2>
            {/* Add settings form here */}
            <button onClick={handleSettingsToggle} className="p-2 bg-gray-200 rounded mt-4">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationPage;
