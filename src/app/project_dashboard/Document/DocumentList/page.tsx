'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { IdentificationIcon } from '@heroicons/react/24/outline';

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
                throw new Error('Failed to fetch documents');
            }
            const data: Document[] = await response.json();
            setDocuments(data);
        } catch (error) {
            console.error('Failed to fetch documents', error);
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
    
            const response = await fetch(`${apiBaseUrl}/api/Document/CreateDocument`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: uniqueTitle, data: '' }),
            });
    
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
                console.error("Failed to extract document ID from response:", responseData);
                await fetchDocuments();
                return;
            }
        } catch (error) {
            console.error('Failed to create document', error);
        }
    };
    

    const openDocument = (id: string) => {
        router.push(`/project_dashboard/Document/Document/${id}`);
    };    

    return (
        <div>
            <h1>Documents</h1>
            <button onClick={createNewDocument}>Create New Document</button>
            <ul>
                {documents.map(doc => (
                    <li key={doc.id}>
                        <span>{doc.title}</span>
                        <button onClick={() => openDocument(doc.id)}>Open</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DocumentList;
