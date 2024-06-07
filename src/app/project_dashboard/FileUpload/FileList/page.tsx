"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
  const projectId = 1;
  const [files, setFiles] = useState<FileUpload[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    if (!projectId) return;

    const fetchFiles = async () => {
      try {
        const response = await fetch(
          `${apiBaseUrl}/api/FileUpload/project/${projectId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch files");
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
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md ">
        <h1 className="text-2xl font-bold mb-4">Files for Project {projectId}</h1>
        <ul className="space-y-4">
          {files.map((file) => (
            <li key={file.id} className="flex justify-between items-center bg-gray-100 p-4 rounded-md">
              <h2>{file.name}</h2>
              <button onClick={() => openFile(file.id)}>Open</button>
            </li>
          ))}
        </ul>
        <Link href="../FileUpload/AddFile">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md">Add File</button>
        </Link>

        
      </div>
    </div>
  );
};

export default ProjectFiles;
