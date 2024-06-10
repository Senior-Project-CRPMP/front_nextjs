'use client'

import { useState, useEffect, ChangeEvent } from 'react';
import { Edit2 } from 'react-feather';

interface Task {
  id: number,
    title: string,
    description: string,
    userId: string,
    deadline: string,
}

const TaskLister = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [currentTask, setCurrentTask] = useState<string>('');
  const projectIdStr = typeof window !== 'undefined' ? localStorage.getItem('projectId') : null;
  const projectId = projectIdStr !== null ? parseInt(projectIdStr) : null;
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await fetch(`${apiBaseUrl}/api/Task/ProjectTasks/${projectId}`);
        const data: Task[] = await res.json();
        console.log(data)

        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchCards();
  }, []);

  const handleDeleteTask = (id: number) => {
    const confirmed = window.confirm('Are you sure you want to delete this task?');
    if (confirmed) {
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

  const handleEditTask = (id: number) => {
    setIsEditing(id);
    const task = tasks.find(task => task.id === id);
    if (task) {
      setCurrentTask(task.title);
    }
  };

  const handleUpdateTask = (id: number) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, title: currentTask } : task)));
    setIsEditing(null);
    setCurrentTask('');
  };

  const handleEditInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentTask(e.target.value);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Project tasks</h1>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task.id} className="flex items-center justify-between p-2 border border-gray-300 rounded">
            {isEditing === task.id ? (
              <div className="flex items-center space-x-2 flex-grow">
                <input
                  type="text"
                  value={currentTask}
                  onChange={handleEditInputChange}
                  className="p-1 border border-gray-300 rounded flex-grow"
                />
                <button
                  onClick={() => handleUpdateTask(task.id)}
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
                    onClick={() => handleDeleteTask(task.id)}
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
    </div>
  );
};

export default TaskLister;
