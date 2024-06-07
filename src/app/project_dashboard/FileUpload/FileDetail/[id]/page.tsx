'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface FileUpload {
  id: number;
  filePath: string;
  fileName: string;
  name: string;
  description: string;
  projectId: number;
}

const FileDetails = () => {
  const params = useParams();
  const fileId = params.id;

  const [fileDetails, setFileDetails] = useState<FileUpload | null>(null);
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchFileDetails = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/FileUpload/${fileId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch file details');
        }
        const data: FileUpload = await response.json();
        setFileDetails(data);
      } catch (error: any) {
        setError(error.message);
      }
    };

    const fetchFileContent = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/FileUpload/download/${fileId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch file content');
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
    window.open(`${apiBaseUrl}/${fileDetails.filePath}`, '_blank');
}; 

const downloadFile = () => {
  
}; 

  return (
    <div>
      <h1>File Details</h1>
      <p><strong>Name:</strong> {fileDetails.name}</p>
      <p><strong>Description:</strong> {fileDetails.description}</p>
      <button onClick={openFile}>Open File</button>
      <button onClick={downloadFile}>Download File</button>
    </div>
  );
};


export default FileDetails;
