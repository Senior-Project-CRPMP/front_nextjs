'use client'
import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Form {
  id: number;
  title: string;
  description: string;
  projectId: number;
}

interface ClipboardLinkProps {
  id: number;
}

const ClipboardLink: React.FC<ClipboardLinkProps> = ({ id }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = useCallback(() => {
    const link = `http://localhost:3000/Form/${id}`;
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); 
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  }, [id]);

  return (
    <div>
      <a href="#" onClick={(e) => { e.preventDefault(); copyToClipboard(); }}>
        Form Link
      </a>
      {copied && <span style={{ marginLeft: '10px', color: 'green' }}>Link copied to clipboard!</span>}
    </div>
  );
};




const Forms = () => {
  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const projectIdStr = typeof window !== "undefined" ? localStorage.getItem("projectId") : null;
  const projectId = projectIdStr !== null ? parseInt(projectIdStr) : null;
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    if (!projectId) return;

    const fetchForms = async () => {
      try {
        const response = await fetch(
          `${apiBaseUrl}/api/Form/ProjectFormsWithResponsesOnly/${projectId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch forms");
        }
        const data: Form[] = await response.json();
        setForms(data);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchForms();
  }, [projectId, apiBaseUrl]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const openFile = (id: number) => {
    router.push(`/project_dashboard/Analyze/View/${id}`);
  };

  return (
    <div className="flex flex-col items-center min-h-screen mt-10 space-y-8">
      <h1 className="text-4xl font-semibold">Forms with Responses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {forms.map((form) => (
          <div
            key={form.id}
            className="p-4 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100"
            onClick={() => openFile(form.id)}
          >
            <h2 className="text-xl font-semibold">{form.title}</h2>
            <ClipboardLink id={form.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forms;
