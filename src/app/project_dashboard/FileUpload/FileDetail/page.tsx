'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const FileDetailPage = () => {
  const router = useRouter();
  const { fileName } = router.query;
  const [fileDetails, setFileDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFileDetails = async () => {
      try {
        const response = await fetch(``);
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        const data = await response.json();
        setFileDetails(data);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching file details:', error);
      }
    };
    fetchFileDetails();
  }, [fileName]);

  const handleDelete = async () => {
    try {
      const response = await fetch(``, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('File deleted successfully');
        router.push('/');
      } else {
        console.error('Failed to delete file');
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">File Details</h1>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : fileDetails ? (
          <div>
            <p>File Name: {fileDetails.name}</p>
            <p>File Size: {fileDetails.size} bytes</p>
            <p>File Type: {fileDetails.type}</p>
            <p>Last Modified: {fileDetails.lastModified}</p>
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md mt-4"
            >
              Delete
            </button>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default FileDetailPage;