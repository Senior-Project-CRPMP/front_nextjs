"use client";
import { useState, useEffect } from "react";
import Link from "next/link";


type Form = {
  id: string;
  title: string;
};

const FormList: React.FC = () => {
  const [forms, setForms] = useState<Form[]>([]);

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

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

  const formElements = forms.map((form) => (
    <div key={form.id} className="form-tile">
      <Link href={`/admindashboard/forms/${form.id}`}>
        <div className="form-info">
          <p className="form-info-text">{form.title}</p>
        </div>
      </Link>
    </div>
  ));

  return (
    <>
      <div className="form-list-container">
        <h2 className="form-header">Forms</h2>
        <div className="form-list">{formElements}</div>
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
