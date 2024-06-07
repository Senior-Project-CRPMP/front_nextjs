'use client';

import { useRouter, useParams } from "next/navigation";
import React from "react";

const DeleteFile: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const fileId = params.id;

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const deleteFile = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/FileUpload/delete/${fileId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.push('/project_dashboard/FileUpload/FileList');
      } else {
        console.error('Failed to delete file');
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  const goBack = () => {
    router.back();
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="font-bold mb-4">Are you sure you want to delete this file?</h2>
        <button onClick={deleteFile} className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md">Yes</button>
        <button onClick={goBack} className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md">No</button>
      </div>
    </div>
  );
};

export default DeleteFile;
