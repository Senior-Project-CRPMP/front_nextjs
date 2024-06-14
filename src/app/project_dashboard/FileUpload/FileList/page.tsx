"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AddFile from '../AddFile/AddFile';
import FileDetail from '../FileDetail/[id]/page';
import { FaPlus } from 'react-icons/fa';
import NavBar from "../../nav_bar";

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
  const projectIdStr =
    typeof window !== "undefined" ? localStorage.getItem("projectId") : null;
  const projectId = projectIdStr !== null ? parseInt(projectIdStr) : null;
  const [files, setFiles] = useState<FileUpload[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      closeModal();
    }
  };

  return (
    <div className="flex">
      <div className="w-full flex-1 flex flex-col h-full items-center  justify-start pt-4" onClick={handleClickOutside}>
        <div className="bg-white p-4 rounded-lg shadow-md w-full mt-20 ">
          <h1 className="text-2xl font-bold mb-4">Files for Project {projectId}</h1>
          <ul className="space-y-4">
            {files.map((file) => (
              <li key={file.id} className="flex justify-between items-center bg-gray-100 p-4 rounded-md">
                <h2>{file.name}</h2>
                <button onClick={() => openFile(file.id)}>Open</button>
              </li>
            ))}
          </ul>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md mt-4"
            onClick={openModal}
          >
            <FaPlus className="inline-block mr-2" />
            Add File
          </button>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md" ref={modalRef}>
              <AddFile />
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md mt-4"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectFiles;
