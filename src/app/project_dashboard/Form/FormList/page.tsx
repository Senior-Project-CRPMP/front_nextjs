"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NavBar from "../../nav_bar";

type Form = {
  id: string;
  title: string;
};

const FormList: React.FC = () => {
  const [forms, setForms] = useState<Form[]>([]);

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const projectId = 2;

  const router = useRouter();

  const fetchData = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/Form/ProjectForms/${projectId}`);

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const responseData: Form[] = await response.json();
      setForms(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openForm = (id: string) => {
    router.push(`/project_dashboard/Form/FormPreview/${id}`);
  };

  return (
    <div className="flex">
      <div className="w-1/5 h-screen bg-white rounded-md my-2">
        <NavBar />
      </div>
      <div className="w-full flex">
        <div className="w-full bg-white mt-4 p-8 rounded-lg shadow-md ">
          <h2 className="text-2xl font-bold mb-4">Forms</h2>
          <ul className="space-y-4">
            {forms.map((doc) => (
              <li
                key={doc.id}
                className="flex justify-between items-center bg-gray-100 p-4 rounded-md cursor-pointer hover:bg-gray-200"
                onClick={() => openForm(doc.id)}
              >
                <span className="text-gray-800 hover:text-blue-500">{doc.title}</span>
              </li>
            ))}
          </ul>
          <Link href="../Form/CreateForm">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md">Create Form</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FormList;
