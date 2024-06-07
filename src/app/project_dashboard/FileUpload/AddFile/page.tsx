'use client'
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

const AddFile = () => {
  const router = useRouter();
  const projectId = 1;

  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!file || !projectId) {
      setError('Please select a file and ensure project ID is available.');
      return;
    }

    const formData = new FormData();
    formData.append('File', file);
    formData.append('Name', name);
    formData.append('Description', description);
    formData.append('ProjectId', projectId.toString()); 

    try {
      const response = await fetch(`${apiBaseUrl}/api/FileUpload/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload file');
      }

      setSuccess('File uploaded successfully');
      setError(null);
      setName('');
      setDescription('');
      setFile(null);

      router.push("/project_dashboard/FileUpload/FileList");
    } catch (error: any) {
      setError(error.message);
      setSuccess(null);
    }
  };

  return (
    <div>
      <h1>Add File to Project {projectId}</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="file">File:</label>
          <input type="file" id="file" onChange={handleFileChange} required />
        </div>
        <button type="submit">Upload File</button>
      </form>
    </div>
  );
};

export default AddFile;
