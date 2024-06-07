// pages/account-preferences.tsx

import { useState } from "react";

const AccountPreferencesPage = () => {
  const [preferences, setPreferences] = useState({
    language: "English",
    region: "United States",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setPreferences({
      ...preferences,
      [name]: value,
    });
  };

  const handleDeleteAccount = () => {
    // Handle account deletion logic here
    console.log("Account deletion requested");
  };

  return (
    <div className="container mx-auto ml-5 p-4">
      <h1 className="text-2xl font-semibold mb-4 mt-0 text-black">
        Account Preferences
      </h1>
      <p className="text-gray-700 mb-4">
        Manage your account settings, including language preferences and account
        deletion.
      </p>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-2 text-black">
          Language & Region
        </h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="language"
          >
            Language
          </label>
          <select
            id="language"
            name="language"
            value={preferences.language}
            onChange={handleInputChange}
            className="border rounded w-full py-2 px-3 text-gray-700"
          >
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
            {/* Add more languages as needed */}
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="region"
          >
            Region
          </label>
          <select
            id="region"
            name="region"
            value={preferences.region}
            onChange={handleInputChange}
            className="border rounded w-full py-2 px-3 text-gray-700"
          >
            <option>United States</option>
            <option>Canada</option>
            <option>United Kingdom</option>
            {/* Add more regions as needed */}
          </select>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2 text-red-400">
          Delete Your Account
        </h2>
        <p className="text-gray-700 mb-4">
          Deleting your account will remove all your data from our system. This
          action is irreversible.
        </p>
        <button
          onClick={handleDeleteAccount}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default AccountPreferencesPage;
