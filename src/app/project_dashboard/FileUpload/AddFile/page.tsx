"use client";
import React, { useState } from "react";

const FileUploadPage = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [description, setDescription] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);
    formData.append('description', description);

    try {
      const response = await fetch(`${apiBaseUrl}/api/FileUpload/upload`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setShowSuccessMessage(true);
      } else {
        console.error('Failed to upload file');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">File Upload</h1>
        {showSuccessMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md mb-4">
            File uploaded successfully!
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="file" className="block font-medium text-gray-700 mb-2">
              Select a file:
            </label>
            <input
              type="file"
              id="file"
              onChange={handleFileChange}
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="fileName" className="block font-medium text-gray-700 mb-2">
              File Name:
            </label>
            <input
              type="text"
              id="fileName"
              value={fileName}
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
              readOnly
            />
          </div>
          <div>
            <label htmlFor="description" className="block font-medium text-gray-700 mb-2">
              Description:
            </label>
            <textarea
              id="description"
              value={description}
              onChange={handleDescriptionChange}
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default FileUploadPage;