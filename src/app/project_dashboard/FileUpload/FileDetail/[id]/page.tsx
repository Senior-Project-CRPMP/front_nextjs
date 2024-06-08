'use client';
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import React from "react";
import { useRouter } from "next/navigation";
import { FaFileAlt, FaDownload, FaTrashAlt } from 'react-icons/fa';

interface FileUpload {
  id: number;
  filePath: string;
  fileName: string;
  name: string;
  description: string;
  projectId: number;
}

const FileDetails: React.FC = () => {
  const params = useParams();
  const fileId = params.id;
  
  const router = useRouter();

  const [fileDetails, setFileDetails] = useState<FileUpload | null>(null);
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchFileDetails = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/FileUpload/${fileId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch file details");
        }
        const data: FileUpload = await response.json();
        setFileDetails(data);
      } catch (error: any) {
        setError(error.message);
      }
    };

    const fetchFileContent = async () => {
      try {
        const response = await fetch(
          `${apiBaseUrl}/api/FileUpload/download/${fileId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch file content");
        }
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onload = () => {
          setFileContent(reader.result as string);
        };
        reader.readAsText(blob);
      } catch (error: any) {
        setError(error.message);
      }
    };

    if (fileId) {
      fetchFileDetails();
      fetchFileContent();
    }
  }, [fileId, apiBaseUrl]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!fileDetails) {
    return <p>Loading...</p>;
  }

  const openFile = () => {
    window.open(`${apiBaseUrl}/${fileDetails.filePath}`, "_blank");
  };

  const downloadFile = async () => {
    try {
      const response = await fetch(
        `${apiBaseUrl}/api/FileUpload/download/${fileId}`
      );
      if (!response.ok) {
        throw new Error("Failed to download file");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileDetails.fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const deleteFile = () => {
    router.push(`/project_dashboard/FileUpload/DeleteFile/${fileId}`);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md relative">
        <h1 className="text-2xl font-bold mb-4">File Details</h1>
        <p>
          <strong>Name:</strong> {fileDetails.name}
        </p>
        <p>
          Description: {fileDetails.description}
        </p>
        <div className="absolute top-4 right-4 flex gap-2">
        <button
            onClick={() => setShowModal(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium p-3 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            </button>
          {showPopup && (
            <div className="absolute top-8 right-0 bg-white p-4 shadow-md rounded-md z-10">
              <button
                  onClick={openFile}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md flex items-center space-x-2 mb-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>Open File</span>
                </button>
                <button
                  onClick={downloadFile}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md flex items-center space-x-2 mb-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  <span>Download File</span>
                </button>
                <button
            onClick={deleteFile}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md flex items-center space-x-2"
>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6"
                        />
                      </svg>
                      <span>Delete File</span>
                        </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileDetails;