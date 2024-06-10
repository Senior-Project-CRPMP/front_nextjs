'use client'
import React, { useEffect, useState } from "react";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
}

const User = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(`https://localhost:7174/api/Account/users`);
      const data = await res.json();
      setUsers(data);
      console.log("Did it work?");
    };
    fetchUsers().catch((error) => console.error(error));
  }, []);

  const toggleAdminStatus = async (userId: string) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      const updatedUser = { ...user, isAdmin: !user.isAdmin };

      try {
        const res = await fetch(`https://localhost:7174/api/Account/update-user/${userId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        });

        if (res.ok) {
          setUsers((prevUsers) =>
            prevUsers.map((u) => (u.id === userId ? updatedUser : u))
          );
          console.log("User updated successfully");
        } else {
          console.error("Failed to update user:", res.statusText);
        }
      } catch (error) {
        console.error("Error updating user:", error);
      }
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      const res = await fetch(`https://localhost:7174/api/Account/delete-user/${userId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setUsers((prevUsers) => prevUsers.filter((u) => u.id !== userId));
        console.log("User deleted successfully");
      } else {
        console.error("Failed to delete user:", res.statusText);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="w-full bg-gray-100 my-2">
      <div className="px-4 sm:px-8 pt-4">
        <h1 className="font-bold mb-4">Users</h1>
        <div className="border border-gray-200 rounded overflow-hidden shadow-md">
          {users.map((u) => (
            <div
              key={u.id}
              className="w-full px-4 py-2 bg-white hover:bg-sky-100 hover:text-sky-900 border-b last:border-none border-gray-200 transition-all duration-300 ease-in-out flex justify-between items-center"
            >
              <div>
                {u.firstName} {u.lastName} - {u.email} - {u.isAdmin ? "Admin" : "User"}
              </div>
              <div>
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded mr-2"
                  onClick={() => toggleAdminStatus(u.id)}
                >
                  {u.isAdmin ? "Demote" : "Promote"}
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
                  onClick={() => deleteUser(u.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default User;
