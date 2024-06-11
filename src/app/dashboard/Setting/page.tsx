"use client";
import { useState, useEffect, KeyboardEvent } from "react";

const Settings = () => {
  const [displayDensity, setDisplayDensity] = useState<string>("comfortable");
  const [notificationsEnabled, setNotificationsEnabled] =
    useState<boolean>(true);
  // const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // useEffect(() => {
  //   if (
  //     localStorage.getItem("color-theme") === "dark" ||
  //     (!("color-theme" in localStorage) &&
  //       window.matchMedia("(prefers-color-scheme: dark)").matches)
  //   ) {
  //     setIsDarkMode(true);
  //   }
  // }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      displayDensity,
      notificationsEnabled,
      // isDarkMode,
    });
  };

  // const toggleDarkMode = () => {
  //   if (isDarkMode) {
  //     document.documentElement.classList.remove("dark");
  //     localStorage.setItem("color-theme", "light");
  //   } else {
  //     document.documentElement.classList.add("dark");
  //     localStorage.setItem("color-theme", "dark");
  //   }
  //   setIsDarkMode(!isDarkMode);
  // };

  return (
    <div className="container mx-auto">
    <div className="flex justify-center">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6 mt-6">
      <form onSubmit={handleSubmit}>
        <h1 className="text-xl font-semibold leading-7 text-gray-900 pb-4">
          Settings
        </h1>

        {/* General Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold leading-7 text-gray-900 pb-4">
            General
          </h2>
          <div className="mb-4"></div>
          <div className="mb-4"></div>
          <div className="mb-4"></div>
        </section>

        {/* Display Settings Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold leading-7 text-gray-900 pb-4">
            Display Settings
          </h2>
          <div className="mb-4">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Display Density:
            </label>
            <select
              value={displayDensity}
              onChange={(e) => setDisplayDensity(e.target.value)}
             className="block w-full rounded-md border-0 p-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="comfortable">Comfortable</option>
              <option value="compact">Compact</option>
            </select>
          </div>
        </section>

        {/* Dark Mode Section */}
        {/* <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
            Dark Mode
          </h2>
          <div className="mb-4">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              <input
                type="checkbox"
                checked={isDarkMode}
                onChange={toggleDarkMode}
                
              />
              Enable Dark Mode
            </label>
          </div>
        </section> */}

        {/* Notifications Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
            Notifications
          </h2>
          <div className="mb-4">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={(e) => setNotificationsEnabled(e.target.checked)}
                
              />
              Enable Notifications
            </label>
          </div>
        </section>

        <button
          type="submit"
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
        >
          Save Settings
        </button>
      </form>
    </div>
    </div>
    </div>
  );
};

export default Settings;
