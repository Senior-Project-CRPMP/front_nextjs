'use client'
import React, { useEffect, useState, useCallback } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { useRouter, usePathname, useParams } from 'next/navigation';

const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['bold', 'italic', 'underline'],
    [{ color: [] }, { background: [] }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ align: [] }],
    ['image', 'blockquote', 'code-block'],
    ['clean'],
];

const Document: React.FC = () => {
    const params = useParams();
    const id = params.id;
    const [editor, setEditor] = useState<Quill | null>(null);
    const [title, setTitle] = useState<string>('');
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    useEffect(() => {
        const fetchDocument = async () => {
            try {
                const response = await fetch(`${apiBaseUrl}/api/Document/SingleDocument/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch document');
                }
                const data = await response.json();
                setTitle(data.title);
                if (editor) {
                    editor.setContents(JSON.parse(data.data));
                }
            } catch (error) {
                console.error('Failed to fetch document', error);
            }
        };

        if (editor && id) {
            fetchDocument();
        }
    }, [editor, id]);

    const wrapperRef = useCallback((wrapper: HTMLDivElement | null) => {
        if (wrapper == null) return;
        wrapper.innerHTML = '';

        const editorInstance = document.createElement('div');
        wrapper.append(editorInstance);
        const quill = new Quill(editorInstance, { theme: 'snow', modules: { toolbar: TOOLBAR_OPTIONS } });
        setEditor(quill);
    }, []);

    const handleSave = async () => {
        try {
            if (!id || !editor) return;
            const response = await fetch(`${apiBaseUrl}/api/Document/UpdateDocument/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id,
                    title,
                    data: JSON.stringify(editor.getContents())
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to save document');
            }

            alert('Document saved!');
        } catch (error) {
            console.error('Failed to save document', error);
        }
    };

    return (
        <div>
            <style>
                {`
                *,
                *::before,
                *::after {
                    box-sizing: border-box;
                }

                body {
                    background-color: #F3F3F3;
                    margin: 0;
                }

                .container .ql-editor {
                    width: 8.5in;
                    min-height: 11in;
                    padding: 1in;
                    margin: 1rem;
                    box-shadow: 0 0 5px 0 rgba(0, 0, 0, .5);
                    background-color: white;
                }

                .container .ql-container.ql-snow {
                    border: none;
                    display: flex;
                    justify-content: center;
                }

                .container .ql-toolbar.ql-snow {
                    display: flex;
                    justify-content: center;
                    position: sticky;
                    top: 0;
                    z-index: 1;
                    background-color: #F3F3F3;
                    border: none;
                    box-shadow: 0 0 5px 0 rgba(0, 0, 0, .5);
                }

                @page {
                    margin: 1in;
                }

                @media print {
                    body {
                        background: none;
                    }

                    .container .ql-editor {
                        width: 6.5in;
                        height: 9in;
                        padding: 0;
                        margin: 0;
                        box-shadow: none;
                        align-self: flex-start;
                    }

                    .container .ql-toolbar.ql-snow {
                        display: none;
                    }
                }
                `}
            </style>
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Document Title"
            />
            <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md">Save</button>
            <div className="container" ref={wrapperRef}></div>
        </div>
    );
};

export default Document;
