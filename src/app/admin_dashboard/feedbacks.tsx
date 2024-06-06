'use client'
import React, {useEffect, useState} from "react";
interface Feedback {
    id: number;
    name: string;
    email: string;
    message: string
  }
function Feedback(){
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    useEffect(() => {
        const fetchCard = async () => {
          const res = await fetch(
            `${apiBaseUrl}/api/Feedback/feedbacks`
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
                <h1 className=" font-bold mb-4">Feedbacks</h1>
                <div className="border border-gray-200 rounded overflow-hidden shadow-md">
                {feedbacks.map((f) => (
                    <div key={f.id} className="w-full px-4 py-2 bg-white hover:bg-sky-100 hover:text-sky-900 border-b last:border-none border-gray-200 transition-all duration-300 ease-in-out">
                    <div>{f.name}-{f.email}</div>
                    <div>{f.message}</div>
                    </div>
                ))}
                </div>
            </div>
        </div>
    );
}
export default Feedback;