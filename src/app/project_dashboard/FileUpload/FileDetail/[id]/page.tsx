'use client';
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import React from "react";
import { useRouter } from "next/navigation";

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

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">File Details</h1>
        <p>
          <strong>Name:</strong> {fileDetails.name}
        </p>
        <p>
          Description: {fileDetails.description}
        </p>
        <button onClick={openFile} className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md">Open File</button>
        <button onClick={downloadFile} className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md">Download File</button>
        <button onClick={deleteFile} className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md">Delete File</button>
      </div>
    </div>
  );
};

export default FileDetails;
