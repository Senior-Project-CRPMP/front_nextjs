'use client'
import React, { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';

// Define the type for a task
interface TaskType {
  task: string;
  priority: string;
  dueDate: string;
  assignee: string;
}

const Task = () => {
  const router = useRouter();
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
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState('low');
  const [dueDate, setDueDate] = useState('');
  const [assignee, setAssignee] = useState('');

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleTaskChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value);
  };

  const handlePriorityChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setPriority(event.target.value);
  };

  const handleDueDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDueDate(event.target.value);
  };

  const handleAssigneeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAssignee(event.target.value);
  };

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

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addTask();
    router.push('/project_dashboard');
    console.log(formData);
  };

  const handleAddTask = () => {
    const newTaskObject: TaskType = {
      task: newTask,
      priority: priority,
      dueDate: dueDate,
      assignee: assignee,
    };

    setTasks([...tasks, newTaskObject]);
    setNewTask('');
    setPriority('low');
    setDueDate('');
    setAssignee('');
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
              id="task"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
              placeholder="Enter task"
              value={newTask}
              onChange={handleTaskChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="priority" className="block font-medium mb-2">
              Priority
            </label>
            <select
              id="priority"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
              value={priority}
              onChange={handlePriorityChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="dueDate" className="block font-medium mb-2">
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
              value={dueDate}
              onChange={handleDueDateChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="assignee" className="block font-medium mb-2">
              Assignee
            </label>
            <input
              type="text"
              id="assignee"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
              placeholder="Enter assignee"
              value={assignee}
              onChange={handleAssigneeChange}
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleAddTask}
          >
            Add Task
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={handleSubmit}
          >
            Submit Task
          </button>
        </div>
        <div className="flex flex-wrap justify-center mt-10">
          {tasks.map((task, index) => (
            <div
              key={index}
              className="max-w-md w-full bg-white shadow-md rounded-md p-6 m-4"
            >
              <h2 className="text-lg font-bold mb-2">{task.task}</h2>
              <p className="mb-2">Priority: {task.priority}</p>
              <p className="mb-2">Due Date: {task.dueDate}</p>
              <p>Assignee: {task.assignee}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Task;
