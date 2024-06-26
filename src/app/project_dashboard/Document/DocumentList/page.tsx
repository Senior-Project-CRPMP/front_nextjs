"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IdentificationIcon } from "@heroicons/react/24/outline";

type Document = {
  id: string;
  title: string;
  projectId: number;
};

const DocumentList: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const router = useRouter();
  const projectId = localStorage.getItem("projectId");

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const fetchDocuments = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/Document/DocumentsByProject/${projectId}`);
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
  
      const requestBody = { title: uniqueTitle, data: "", projectId };
      console.log("Request body:", requestBody);
  
      const response = await fetch(
        `${apiBaseUrl}/api/Document/CreateDocument`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );
  
      console.log("API response received");
      console.log(projectId);
      console.log(requestBody);
  
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
    <div className="container mx-auto">
    <div className="flex justify-center">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6 mt-6">
          <h1 className="text-xl font-semibold leading-7 text-gray-900 pb-4">Documents</h1>

          <ul className="space-y-4">
            {documents.map((doc) => (
              <li
                key={doc.id}
                className="flex justify-between items-center bg-gray-100 p-4 rounded-md"
              >
                <span>{doc.title}</span>
                <button
                  onClick={() => openDocument(doc.id)}
                  className="text-blue-500"
                >
                  Open
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={createNewDocument}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
          >
            Create New Document
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentList;
