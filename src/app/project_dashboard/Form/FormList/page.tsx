"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';


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
      <div className="form-list-container">
        <h2 className="form-header">Forms</h2>
        <ul>
                {forms.map(doc => (
                    <li key={doc.id}>
                        <span>{doc.title}</span>
                        <button onClick={() => openForm(doc.id)}>Open</button>
                    </li>
                ))}
            </ul>
      </div>
      <div className="create-form-container">
        <Link href="../Form/CreateForm">
          <button className="button">Create Form</button>
        </Link>
      </div>
    </>
  );
};

export default FormList;
