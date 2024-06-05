

import { useState } from 'react';

const EmailPage = () => {
  const [emailSettings, setEmailSettings] = useState({
    primaryEmail: 'yordanosyadessa2019@gmail.com',
    secondaryEmail: '',
    notifications: true,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setEmailSettings({
      ...emailSettings,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Email settings updated:', emailSettings);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4 text-black">Email Settings</h1>
      <p className="text-gray-700 mb-4">
        Manage your email addresses and notification preferences.
      </p>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-black ">Email Addresses</h2>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="primaryEmail">
              Primary Email
            </label>
            <input
              type="email"
              id="primaryEmail"
              name="primaryEmail"
              value={emailSettings.primaryEmail}
              onChange={handleInputChange}
              className="border rounded w-full py-2 px-3 text-gray-700"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="secondaryEmail">
              Secondary Email
            </label>
            <input
              type="email"
              id="secondaryEmail"
              name="secondaryEmail"
              value={emailSettings.secondaryEmail}
              onChange={handleInputChange}
              className="border rounded w-full py-2 px-3 text-gray-700"
            />
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-black">Notification Preferences</h2>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="notifications"
              name="notifications"
              checked={emailSettings.notifications}
              onChange={handleInputChange}
              className="mr-2"
            />
            <label className="text-gray-700" htmlFor="notifications">
              Receive email notifications
            </label>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmailPage;
