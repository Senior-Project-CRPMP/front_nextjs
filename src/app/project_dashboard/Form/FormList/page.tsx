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

  const router = useRouter();

  const fetchData = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/Form/EveryForm`);

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
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md ">
          <h2 className="text-2xl font-bold mb-4">Forms</h2>
          <ul className="space-y-4">
            {forms.map((doc) => (
              <li key={doc.id} className="flex justify-between items-center bg-gray-100 p-4 rounded-md">
                <span>{doc.title}</span>
                <button onClick={() => openForm(doc.id)}>Open</button>
              </li>
            ))}
          </ul>
          <Link href="../Form/CreateForm">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md">Create Form</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default FormList;
