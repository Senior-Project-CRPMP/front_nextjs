"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

const AddFile = () => {
  const router = useRouter();
  const projectId = 1;

  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
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
      setError("Please select a file and ensure project ID is available.");
      return;
    }

    const formData = new FormData();
    formData.append("File", file);
    formData.append("Name", name);
    formData.append("Description", description);
    formData.append("ProjectId", projectId.toString());

    try {
      const response = await fetch(`${apiBaseUrl}/api/FileUpload/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      setSuccess("File uploaded successfully");
      setError(null);
      setName("");
      setDescription("");
      setFile(null);

      router.push("/project_dashboard/FileUpload/FileList");
    } catch (error: any) {
      setError(error.message);
      setSuccess(null);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Add File to Project {projectId}</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block font-medium text-gray-700 mb-2">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="description" className="block font-medium text-gray-700 mb-2">Description:</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="file" className="block font-medium text-gray-700 mb-2">File:</label>
            <input type="file" id="file" onChange={handleFileChange} required className="border border-gray-300 rounded-md px-4 py-2 w-full"/>
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md">Upload File</button>
        </form>
      </div>
    </div>
  );
};

export default AddFile;
