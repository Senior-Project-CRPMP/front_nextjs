'use client'
import React, { useState, ChangeEvent } from 'react';

const Task = () => {
  const projectIdStr = localStorage.getItem('projectId');
  const projectId = projectIdStr !== null ? parseInt(projectIdStr) : null;
  const [formData, setFormData] = useState({
    projectId: projectId,
    title: "",
    description: "",
    assignedTo: "",
    deadline: "",
    status: ""
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };

  async function addTask() {
    try {
      const response = await fetch(
        "https://localhost:7174/api/Task/CreateTask",
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
  
  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {

    addTask()
    console.log(formData);
  };


  return (
    <div className="container mx-auto">
      <div className="flex justify-center">
        <div className="max-w-md w-full bg-white shadow-md rounded-md p-6 mt-10">
          <h1 className="text-2xl font-bold mb-4">Task Assignment</h1>
          <div className="mb-4">
            <label htmlFor="title" className="block font-medium mb-2">
              Task Title
            </label>
            <input
              type="text"
              name="title"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
              placeholder="Enter task title"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block font-medium mb-2">
              Description
            </label>
            <input
              type="text"
              name="description"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
              placeholder="Enter task description"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="status" className="block font-medium mb-2">
              Status
            </label>
            <select
              name="status"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
              onChange={handleChange}
            >
              <option value="TODO">TODO</option>
              <option value="In progress">In progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="deadline" className="block font-medium mb-2">
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
              Assigned To
            </label>
            <input
              type="text"
              name="assignedTo"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
              placeholder="Enter assignee"
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
          {/* {tasks.map((task, index) => (
            <div
              key={index}
              className="max-w-md w-full bg-white shadow-md rounded-md p-6 m-4"
            >
              <h2 className="text-lg font-bold mb-2">{task.task}</h2>
              <p className="mb-2">Priority: {task.priority}</p>
              <p className="mb-2">Due Date: {task.dueDate}</p>
              <p>Assignee: {task.assignee}</p>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default Task;