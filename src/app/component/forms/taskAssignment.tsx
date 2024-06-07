'use client'
import React, { useState, ChangeEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Task = () => {
  const router = useRouter();
  const projectIdStr = localStorage.getItem('projectId');
  const projectId = projectIdStr ? parseInt(projectIdStr, 10) : null;
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [formData, setFormData] = useState({
    projectId: projectId,
    title: "",
    description: "",
    assignedTo: "c2ac2e34-c67a-4c19-a6a1-87d3e1ff94a0",
    deadline: "",
    status: ""
  });

  async function addTask() {
    try {
      const response = await fetch(
        `${apiBaseUrl}/api/Task/CreateTask`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        console.log("Item created successfully");
        // Optionally, you can redirect the user or update the UI here
      } else {
        console.error("Failed to create item:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating item:", error);
    }
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };
  
  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {

    addTask()
    router.push('/project_dashboard');
    console.log(formData);
  };

  

  
  return (
    <div className="container mx-auto">
      <div className="flex justify-center">
        <div className="max-w-md w-full bg-white shadow-md rounded-md p-6 mt-10">
          <h1 className="text-2xl font-bold mb-4">Task Assignment</h1>
          <div className="mb-4">
            <label htmlFor="task" className="block font-medium mb-2">
              Task
            </label>
            <input
              type="text"
              name="title"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
              placeholder="Enter task"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="task" className="block font-medium mb-2">
              Description
            </label>
            <input
              type="text"
              name="description"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
              placeholder="Enter task"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="priority" className="block font-medium mb-2">
              Status
            </label>
            <select
              name="status"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
              onChange={(e)=>handleChange}
            >
              <option value="TODO">TODO</option>
              <option value="inProgress">In progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="dueDate" className="block font-medium mb-2">
              Deadline
            </label>
            <input
              type="date"
              name="deadline"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="assignedTo" className="block font-medium mb-2">
              Assignee
            </label>
            <input
              type="text"
              name="assignedTo"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
              placeholder="Enter assignee"
              value = "c2ac2e34-c67a-4c19-a6a1-87d3e1ff94a0"
              onChange={handleChange}
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleSubmit}
          >
            Add Task
          </button>
        </div>
        <div className="flex flex-wrap justify-center mt-10">
        </div>
      </div>
    </div>
  );
};

export default Task;