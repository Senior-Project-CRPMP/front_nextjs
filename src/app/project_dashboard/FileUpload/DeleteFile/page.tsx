'use client'
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from 'next/navigation';
const FileDeletePage = () => {
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchFiles = async () => {
        try {
          const response = await fetch('');
          if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
          }
          const data = await response.json();
          setFiles(data);
        } catch (error) {
          setError(error.message);
          console.error('Error fetching files:', error);
        }
      };
      fetchFiles();
    }, []);
  
    const handleFileSelect = (fileName) => {
      setSelectedFile(fileName);
    };
  
    const handleDelete = async () => {
      if (!selectedFile) {
        return;
      }
  
      try {
        const response = await fetch(``, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          setFiles(files.filter((file) => file !== selectedFile));
          setSelectedFile(null);
          console.log('File deleted successfully');
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
          <h1 className="text-2xl font-bold mb-4">File Delete</h1>
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : files.length === 0 ? (
            <p>No files to display.</p>
          ) : (
            <div>
              <ul className="space-y-4">
                {files.map((file) => (
                  <li
                    key={file}
                    className={`flex justify-between items-center bg-gray-100 p-4 rounded-md ${
                      selectedFile === file ? 'bg-blue-100' : ''
                    }`}
                    onClick={() => handleFileSelect(file)}
                  >
                    <p className="text-gray-800">{file}</p>
                    {selectedFile === file && (
                      <button
                        onClick={handleDelete}
                        className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md"
                      >
                        Delete
                      </button>
                    )}
                  </li>
                ))}
              </ul>
              {selectedFile && (
                <div className="mt-4">
                  <p>Selected file: {selectedFile}</p>
                  <button
                    onClick={handleDelete}
                    className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md mt-2"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default FileDeletePage;