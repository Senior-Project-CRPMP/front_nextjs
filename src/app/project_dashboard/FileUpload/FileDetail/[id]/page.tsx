'use client';
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import React from "react";
import { useRouter } from "next/navigation";
import { FaDownload, FaTrash, FaFileAlt } from 'react-icons/fa';

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
  const [showOpenModal, setShowOpenModal] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
    <div className="flex justify-center items-center h-screen w-full">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">File Details</h1>
        <p>
          <strong>Name:</strong> {fileDetails.name}
        </p>
        <p>
          Description: {fileDetails.description}
        </p>
        <div className="flex justify-end space-x-4">
          <button onClick={() => setShowOpenModal(true)} className="text-blue-500 hover:text-blue-600 focus:outline-none">
            <FaFileAlt className="w-6 h-6" />
          </button>
          <button onClick={() => setShowDownloadModal(true)} className="text-blue-500 hover:text-blue-600 focus:outline-none">
            <FaDownload className="w-6 h-6" />
          </button>
          <button onClick={() => setShowDeleteModal(true)} className="text-red-500 hover:text-red-600 focus:outline-none">
            <FaTrash className="w-6 h-6" />
          </button>
        </div>
      </div>
      {showOpenModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Open File</h2>
            <div className="flex justify-end space-x-4 mt-4">
              <button onClick={openFile} className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md">Open</button>
              <button onClick={() => setShowOpenModal(false)} className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 px-4 rounded-md">Cancel</button>
            </div>
          </div>
        </div>
      )}
 {showDownloadModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Download File</h2>
            <p>Are you sure you want to download this file?</p>
            <div className="flex justify-end space-x-4 mt-4">
              <button onClick={downloadFile} className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md">Download</button>
              <button onClick={() => setShowDownloadModal(false)} className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 px-4 rounded-md">Cancel</button>
            </div>
          </div>
        </div>
      )}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Delete File</h2>
            <p>Are you sure you want to delete the file?</p>
            <div className="flex justify-end space-x-4 mt-4">
              <button onClick={deleteFile} className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md">Delete</button>
              <button onClick={() => setShowDeleteModal(false)} className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 px-4 rounded-md">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileDetails;