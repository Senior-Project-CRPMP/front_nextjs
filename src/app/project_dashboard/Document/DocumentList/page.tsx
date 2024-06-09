"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IdentificationIcon } from "@heroicons/react/24/outline";

type Document = {
  id: string;
  title: string;
};

const DocumentList: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const router = useRouter();

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const fetchDocuments = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/Document/EveryDocument`);
      if (!response.ok) {
        throw new Error("Failed to fetch documents");
      }
      const data: Document[] = await response.json();
      setDocuments(data);
    } catch (error) {
      console.error("Failed to fetch documents", error);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const createNewDocument = async () => {
    console.log("createNewDocument called");
    try {
      const uniqueTitle = `Untitled_${Date.now()}`;
      console.log("Creating document with title:", uniqueTitle);

      const response = await fetch(
        `${apiBaseUrl}/api/Document/CreateDocument`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: uniqueTitle, data: "" }),
        }
      );

      console.log("API response received");

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response from API:", errorText);
        throw new Error(`Failed to create document: ${errorText}`);
      }

      const responseData = await response.json();
      console.log("Response data:", responseData);

      const documentId = responseData.id;
      if (documentId) {
        console.log("New document ID:", documentId);
        router.push(`/project_dashboard/Document/Document/${documentId}`);
      } else {
        console.error(
          "Failed to extract document ID from response:",
          responseData
        );
        await fetchDocuments();
        return;
      }
    } catch (error) {
      console.error("Failed to create document", error);
    }
  };

  const openDocument = (id: string) => {
    router.push(`/project_dashboard/Document/Document/${id}`);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Documents</h1>
        
        <ul className="space-y-4">
          {documents.map((doc) => (
            <li key={doc.id} className="flex justify-between items-center bg-gray-100 p-4 rounded-md">
              <span>{doc.title}</span>
              <button onClick={() => openDocument(doc.id)}>Open</button>
            </li>
          ))}
        </ul>
        <button onClick={createNewDocument} className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md">Create New Document</button>
      </div>
    </div>
  );
};

export default DocumentList;
