'use client'
import React, {useEffect, useState} from "react";
interface User {
    id: number;
    name: string;
    email: string;
    role: string
  }
function User(){
    const [feedbacks, setFeedbacks] = useState<User[]>([])
    useEffect(() => {
        const fetchCard = async () => {
          const res = await fetch(
            `https://localhost:7174/api/User`
          );
          const data = await res.json();
          setFeedbacks(data);
          console.log("Did it work?");
        };
        fetchCard().catch((error) => console.error(error));
      }, []);
    return(
        <div className="w-full bg-gray-100 my-2">
            <div className="px-4 sm:px-8 pt-4">
                <h1 className=" font-bold mb-4">Users</h1>
                <div className="border border-gray-200 rounded overflow-hidden shadow-md">
                {feedbacks.map((u) => (
                    <div key={u.id} className="w-full px-4 py-2 bg-white hover:bg-sky-100 hover:text-sky-900 border-b last:border-none border-gray-200 transition-all duration-300 ease-in-out">
                    <div>{u.name}-{u.email}-{u.role}</div>
                    </div>
                ))}
                </div>
            </div>
        </div>
    );
}
export default User;