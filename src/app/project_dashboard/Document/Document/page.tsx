'use client'
import React, { useEffect, useState, useCallback } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

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
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [editor, setEditor] = useState<Quill | null>(null);
    const [title, setTitle] = useState<string>('');

    useEffect(() => {
        const fetchDocument = async () => {
            try {
                const response = await fetch(`/api/Document/SingleDocument/${id}`);
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
            const response = await fetch(`/api/Document/UpdateDocument/${id}`, {
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
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Document Title"
            />
            <button onClick={handleSave}>Save</button>
            <div className="container" ref={wrapperRef}></div>
        </div>
    );
};

export default Document;
