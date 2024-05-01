import React from 'react';

const Task = () => {
  return (
    <div className="container mx-auto">
      <div className="flex justify-center">
        <div className="max-w-md w-full bg-white shadow-md rounded-md p-6">
          <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
          <div className="mb-4">
            <label htmlFor="task" className="block font-medium mb-2">
              Task Assignment
            </label>
            <input
              type="text"
              id="task"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
              placeholder="Enter task assignment"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="priority" className="block font-medium mb-2">
              Priority
            </label>
            <select
              id="priority"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
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
            />
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default Task;
