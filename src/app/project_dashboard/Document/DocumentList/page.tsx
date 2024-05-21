'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Document = {
    id: string;
    title: string;
};

const DocumentList: React.FC = () => {
    const [documents, setDocuments] = useState<Document[]>([]);
    const router = useRouter();

    const fetchDocuments = async () => {
        try {
            const response = await fetch('https://localhost:44316/api/Document/EveryDocument');
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
        try {
            const uniqueTitle = `Untitled_${Date.now()}`;
            const response = await fetch('https://localhost:44316/api/Document/CreateDocument', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: uniqueTitle, data: '' }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to create document: ${errorText}`);
            }

            const responseData = await response.text();
            let newDocument: Document;

            try {
                newDocument = JSON.parse(responseData);
            } catch {
                await fetchDocuments();
                return;
            }

            router.push(`/project_dashboard/Document/Document/${newDocument.id}`);
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
