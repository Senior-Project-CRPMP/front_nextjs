'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";

type FileUpload = {
  id: number;
  filePath: string;
  fileName: string;
  name: string;
  description: string;
  projectId: number;
};

const ProjectFiles = () => {
  const router = useRouter();
  const  projectId = 1;
  const [files, setFiles] = useState<FileUpload[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    if (!projectId) return;

    const fetchFiles = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/FileUpload/project/${projectId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch files');
        }
        const data: FileUpload[] = await response.json();
        setFiles(data);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchFiles();
  }, [projectId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const openFile = (id: number) => {
    router.push(`/project_dashboard/FileUpload/FileDetail/${id}`);
}; 

  return (
    <div>
      <h1>Files for Project {projectId}</h1>
      <ul>
        {files.map(file => (
          <li key={file.id}>
            <h2>{file.name}</h2>
            <button onClick={() => openFile(file.id)}>Open</button>
          </li>
        ))}
      </ul>
      <Link href="../FileUpload/AddFile">
          <button className="button">Add File</button>
        </Link>
    </div>
  );
};

export default ProjectFiles;
