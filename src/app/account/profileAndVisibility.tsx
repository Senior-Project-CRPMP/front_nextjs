
import React from 'react';


const ProfilePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
       {/* ProfileDetails  */}
      <div className="container mx-auto p-4 mt-4 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-4">Profile and Visibility</h1>
        <div className="flex flex-col md:flex-row gap-4">
         <div className="w-full md:w-1/2 bg-white p-4 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Profile Information</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bio">
            Bio
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="bio"
            placeholder="Tell us about yourself"
          ></textarea>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  
          {/* <VisibilitySettings /> */}
          <div className="w-full md:w-1/2 bg-white p-4 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Visibility Settings</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profileVisibility">
            Profile Visibility
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="profileVisibility"
          >
            <option>Public</option>
            <option>Private</option>
            <option>Only me</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="activityVisibility">
            Activity Visibility
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="activityVisibility"
          >
            <option>Everyone</option>
            <option>Only connections</option>
            <option>Only me</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
