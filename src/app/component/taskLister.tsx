"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { Edit2 } from "react-feather";

interface Task {
  id: number,
    title: string,
    description: string,
    userId: string,
    deadline: string,
    status: string,
}

const TaskLister = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [currentTask, setCurrentTask] = useState<string>("");
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const projectIdStr =
    typeof window !== "undefined" ? localStorage.getItem("projectId") : null;
  const projectId = projectIdStr !== null ? parseInt(projectIdStr) : null;
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await fetch(
          `${apiBaseUrl}/api/Task/ProjectTasks/${projectId}`
        );
        const data: Task[] = await res.json();
        console.log(data);

        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchCards();
  }, []);

  async function EditTask(id:number) {
    try {
        const res = await fetch(`${apiBaseUrl}/api/Task/UpdateTask/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tasks.map(task => (task.id === id ? {
              id: task.id,
              description:task.description, 
              deadline: task.deadline,
              userId: task.userId,
              status: task.status,
              projectId: projectId,
              title: currentTask } : task))),
        });

        if (res.ok) {
            console.log("Notifications marked as read successfully.");
        } else {
            console.error("Failed to mark notifications as read:", res.statusText);
        }
    } catch (error) {
        console.error("Error", error);
    }
}

  const handleDeleteTask = (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (confirmed) {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  const handleEditTask = (id: number) => {
    setIsEditing(id);
    const task = tasks.find((task) => task.id === id);
    if (task) {
      setCurrentTask(task.title);
    }
  };

  const handleUpdateTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, title: currentTask } : task
      )
    );
    setIsEditing(null);
    setCurrentTask("");
  };

  const handleEditInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentTask(e.target.value);
  };

  const confirmDeleteTask = (task: Task) => {
    setTaskToDelete(task);
  };

  const cancelDeleteTask = () => {
    setTaskToDelete(null);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Project tasks</h1>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between p-2 border border-gray-300 rounded"
          >
            {isEditing === task.id ? (
              <div className="flex items-center space-x-2 flex-grow">
                <input
                  type="text"
                  value={currentTask}
                  onChange={handleEditInputChange}
                  className="p-1 border border-gray-300 rounded flex-grow"
                />
                <button
                  onClick={() => EditTask(task.id)}
                  className="p-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  <Edit2 size={16} />
                </button>
              </div>
            ) : (
              <>
                <span className="flex-grow">{task.title}</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditTask(task.id)}
                    className="p-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => confirmDeleteTask(task)}
                    className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      {taskToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-xl mb-4">Are you sure you want to delete this task?</h2>
            <div className="flex justify-end space-x-2">
              <button
                onClick={cancelDeleteTask}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteTask(taskToDelete.id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskLister;
