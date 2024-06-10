"use client";
import { useState, useEffect, KeyboardEvent } from "react";

const Settings = () => {
  const [displayDensity, setDisplayDensity] = useState<string>("comfortable");
  const [notificationsEnabled, setNotificationsEnabled] =
    useState<boolean>(true);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    if (
      localStorage.getItem("color-theme") === "dark" ||
      (!("color-theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setIsDarkMode(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      displayDensity,
      notificationsEnabled,
      isDarkMode,
    });
  };

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="w-full h-screen mx-auto p-8 bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <form onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold text-center mb-8 text-black dark:text-white">
          Settings
        </h1>

        {/* General Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 mt-0 text-black dark:text-white">
            General
          </h2>
          <div className="mb-4"></div>
          <div className="mb-4"></div>
          <div className="mb-4"></div>
        </section>

        {/* Display Settings Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
            Display Settings
          </h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Display Density:
            </label>
            <select
              value={displayDensity}
              onChange={(e) => setDisplayDensity(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
            >
              <option value="comfortable">Comfortable</option>
              <option value="compact">Compact</option>
            </select>
          </div>
        </section>

        {/* Dark Mode Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
            Dark Mode
          </h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                checked={isDarkMode}
                onChange={toggleDarkMode}
                className="mr-2 leading-tight"
              />
              Enable Dark Mode
            </label>
          </div>
        </section>

        {/* Notifications Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
            Notifications
          </h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
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

        <button
          type="submit"
          className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default Settings;
