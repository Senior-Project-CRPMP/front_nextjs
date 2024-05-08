'use client'
import React, { useState } from 'react';

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState('low');
  const [dueDate, setDueDate] = useState('');
  const [assignee, setAssignee] = useState('');

  const handleTaskChange = (event) => {
    setNewTask(event.target.value);
  };

  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  const handleDueDateChange = (event) => {
    setDueDate(event.target.value);
  };

  const handleAssigneeChange = (event) => {
    setAssignee(event.target.value);
  };

  const handleAddTask = () => {
    const newTaskObject = {
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
          <h1 className="mb-4 font-medium text-gray-700 dark:text-gray-400">Task Assignment</h1>
          <div className="mb-4">
            <label htmlFor="task" className="block  text-sm font-medium leading-6 text-gray-900">
              Task
            </label>
            <input
              type="text"
              id="task"
              className="block w-full rounded-md border-0 p-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Enter task"
              value={newTask}
              onChange={handleTaskChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="priority" className="block text-sm font-medium leading-6 text-gray-900">
              Priority
            </label>
            <select
              id="priority"
              className="block w-full rounded-md border-0 p-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={priority}
              onChange={handlePriorityChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="dueDate" className="block  text-sm font-medium leading-6 text-gray-900">
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              className="block w-full rounded-md border-0 p-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={dueDate}
              onChange={handleDueDateChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="assignee" className="block  text-sm font-medium leading-6 text-gray-900" >
              Assignee
            </label>
            <input
              type="text"
              id="assignee"
              className="block w-full rounded-md border-0 p-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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