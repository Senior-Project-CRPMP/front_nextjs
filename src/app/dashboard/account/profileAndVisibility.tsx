import React, { useEffect, useState } from "react";

type UserProfile = {
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
  visibility: string;
};

const ProfilePage: React.FC = () => {
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("loggeduserid") : null;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/Account/user/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [apiBaseUrl]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setUserData((prevUserData) =>
      prevUserData ? { ...prevUserData, [id]: value } : null
    );
    console.log(userData)
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/Account/update-user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        console.log("Updated user data");
      }
      if (!response.ok) {
        throw new Error("Failed to update user data");
      }
      // Optionally, you can show a success message or handle the response
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      try {
        const response = await fetch(`${apiBaseUrl}/api/Account/delete-user/${userId}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Failed to delete account");
        }
        // Optionally, you can handle post-deletion logic, such as redirecting the user
        alert("Your account has been deleted.");
        // Example: redirecting the user to the homepage
        window.location.href = "/";
      } catch (error) {
        console.error("Error deleting account:", error);
      }
    }
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>Error loading profile data</div>;
  }

  return (
    <div>
      {/* ProfileDetails  */}
      <div className="container ml-5 mx-auto p-4 ">
        <h1 className="text-2xl font-semibold mb-4 mt-0 text-black">
          Profile and Visibility
        </h1>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/2 bg-white p-4 rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-black">
              Profile Information
            </h2>
            <form>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="firstName"
                  type="text"
                  value={userData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="lastName"
                  type="text"
                  value={userData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  value={userData.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="bio"
                >
                  Bio
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="bio"
                  value={userData.bio}
                  onChange={handleChange}
                  placeholder="Tell us about yourself"
                ></textarea>
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={handleSubmit}
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
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="visibility"
                >
                  Profile Visibility
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="visibility"
                  value={userData.visibility}
                  onChange={handleChange}
                >
                  <option value="Public">Public</option>
                  <option value="Private">Private</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={handleSubmit}
                >
                  Save Changes
                </button>
              </div>
            </form>
            <div className="flex items-center justify-between mt-4">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleDeleteAccount}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
