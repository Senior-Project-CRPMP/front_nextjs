'use client'
import { useState, KeyboardEvent } from 'react';

const Settings = () => {
  const [projectName, setProjectName] = useState<string>('');
  const [deadline, setDeadline] = useState<string>('');
  const [color, setColor] = useState<string>('#ffffff');
  const [members, setMembers] = useState<string[]>(['Alice', 'Bob']);
  const [displayDensity, setDisplayDensity] = useState<string>('comfortable');
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(true);

  const addMember = (member: string) => {
    setMembers([...members, member]);
  };

  const removeMember = (index: number) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      projectName,
      deadline,
      color,
      members,
      displayDensity,
      notificationsEnabled,
    });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
      addMember(e.currentTarget.value);
      e.currentTarget.value = '';
      e.preventDefault();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <form onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold text-center mb-8">Settings</h1>

        {/* General Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">General</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Project Name:</label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Deadline:</label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Color:</label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </section>

        {/* Members Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Members</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Add Member:</label>
            <input
              type="text"
              onKeyDown={handleKeyDown}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <ul className="list-disc pl-5">
            {members.map((member, index) => (
              <li key={index} className="flex justify-between items-center mb-2">
                {member} 
                <button 
                  type="button"
                  onClick={() => removeMember(index)} 
                  className="text-red-500 hover:text-red-700">
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* Display Settings Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Display Settings</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Display Density:</label>
            <select
              value={displayDensity}
              onChange={(e) => setDisplayDensity(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="comfortable">Comfortable</option>
              <option value="compact">Compact</option>
            </select>
          </div>
        </section>

        {/* Notifications Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Notifications</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={(e) => setNotificationsEnabled(e.target.checked)}
                className="mr-2 leading-tight"
              />
              Enable Notifications
            </label>
          </div>
        </section>

        <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600">
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default Settings;
