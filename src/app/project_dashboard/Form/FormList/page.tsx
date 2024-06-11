"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Form = {
  id: string;
  title: string;
};

const FormList: React.FC = () => {
  const [forms, setForms] = useState<Form[]>([]);

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const projectIdStr =typeof window !== "undefined" ? localStorage.getItem("projectId") : null;
  const projectId = projectIdStr !== null ? parseInt(projectIdStr) : null;

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
    <div className="container mx-auto">
    <div className="flex justify-center">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6 mt-6">
          <h2 className="text-xl font-semibold leading-7 text-gray-900 pb-4">Forms</h2>
          <ul className="space-y-4">
            {forms.map((doc) => (
              <li
                key={doc.id}
                className="flex justify-between items-center bg-gray-100 p-4 rounded-md cursor-pointer hover:bg-gray-200"
                onClick={() => openForm(doc.id)}
              >
                <span className="text-gray-800 hover:text-blue-500">
                  {doc.title}
                </span>
              </li>
            ))}
          </ul>
          <Link href="../Form/CreateForm">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 mt-4 px-4 rounded-md">
              Create Form
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FormList;
