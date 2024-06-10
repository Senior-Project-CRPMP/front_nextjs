'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';


interface Form{
    id:number;
    name: string
}
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const Forms = () => {
  const [forms, setForms] = useState<Form[]>([
    {
        id: 1,
        name: 'Form1'

    },
  ]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/forms-with-responses`);
        const data = await response.json();
        setForms(data);
      } catch (error) {
        console.error('Error fetching forms:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchForms();
  }, []);

  const handleFormClick = (formId:number) => {
    router.push(`/project_dashboard/Analyze/View/${formId}`);
  };

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (forms.length === 0) {
    return <p className=" text-center">No forms found</p>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen mt-10 space-y-8">
      <h1 className="text-4xl font-semibold">Forms with Responses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {forms.map((form) => (
          <div
            key={form.id}
            className="p-4 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100"
            onClick={() => handleFormClick(form.id)}
          >
            <h2 className="text-xl font-semibold">{form.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forms;
