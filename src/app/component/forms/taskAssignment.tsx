'use client'
import React, { useState, ChangeEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';


type Member = {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
};

const Task = () => {
  const router = useRouter();
  const [members, setMembers] = useState<Member[]>([]);
  const [project, setProject] = useState({
    title: ""
  })
  const projectIdStr = typeof window !== 'undefined' ? localStorage.getItem('projectId') : null;
  const projectId = projectIdStr ? parseInt(projectIdStr, 10) : null;
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [formData, setFormData] = useState({
    projectId: projectId,
    title: "",
    description: "",
    userId: "",
    deadline: "",
    status: "todo"
  });

  useEffect(() => {
    const fetchMembers = async () => {
      if (projectId) {
        const res = await fetch(`${apiBaseUrl}/api/UserProject/usersByProjectId/${projectId}`);
        const data = await res.json();
        setMembers(data);
        console.log(data)
      }
    };
    fetchMembers().catch((error) => console.error(error));
  }, [projectId]);

  useEffect(() => {
    const fetchProject = async () => {
      if (projectId) {
        const res = await fetch(`${apiBaseUrl}/api/Project/SingleProjectById/${projectId}`);
        const data = await res.json();
        setProject(data.title);
        console.log(data.title)
      }
    };
    fetchProject().catch((error) => console.error(error));
  }, [projectId]);
  

  async function addTask() {
    try {
      const response = await fetch(`${apiBaseUrl}/api/Task/CreateTask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Item created successfully");
        console.log(formData.userId)
      } else {
        console.error("Failed to create item:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating item:", error);
    }
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData)
    console.log(members[0].id)
  };

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    addTask();
    SetNotification(formData.userId);
    router.push('/project_dashboard');
  };

  async function SetNotification(userId : string) {
    const notification= {
        userId: userId,
        message: `New Task has been added to you on Project: ${project.title}` ,
        isRead: false,
        dateCreated: new Date().toISOString(),
      };
        try {
          
          const response = await fetch(`${apiBaseUrl}/api/Notification`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(notification),
          });
    
          if (response.ok) {
            console.log("Notification created successfully");
          } else {
            console.error("Failed to create item:", response.statusText);
          }
        } catch (error) {
          console.error("Error creating item:", error);
        }
      }
    
    



  return (
   <div className="container mx-auto">
  <div className="flex justify-center">
    <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6 mt-6">
      <h1 className="text-xl font-semibold leading-7 text-gray-900 pb-4">Assign Task</h1>
      <div className="mb-4">
        <label htmlFor="task"  className="block text-sm font-medium leading-6 text-gray-900">
          Task Name
        </label>
        <input
          type="text"
          name="title"
          className="block w-full rounded-md border-0 p-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Enter task name"
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
          Description
        </label>
        <input
          type="text"
          name="description"
          className="block w-full rounded-md border-0 p-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Enter task description"
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="status" className="block text-sm font-medium leading-6 text-gray-900">
          Status
        </label>
        <select
          name="status"
          className="block w-full rounded-md border-0 p-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onChange={handleChange}
        >
          <option value="TODO" className="block text-sm font-medium leading-6 text-gray-900">TODO</option>
          <option value="inProgress" className="block text-sm font-medium leading-6 text-gray-900">In progress</option>
          <option value="Done" className="block text-sm font-medium leading-6 text-gray-900">Done</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="deadline" className="block text-sm font-medium leading-6 text-gray-900">
          Deadline
        </label>
        <input
          type="date"
          name="deadline"
          className="block w-full rounded-md border-0 p-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onChange={handleChange}
          min={new Date().toISOString().split('T')[0]}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="assignedTo" className="block text-sm font-medium leading-6 text-gray-900">
          Assignee
        </label>
        <select
          name="userId"
          className="block w-full rounded-md border-0 p-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onChange={handleChange}
        >
          <option value="" >Select Assignee</option>
          {members.map((member) => (
            <option key={member.id} value={member.id}>
              {member.firstName} {member.lastName}
            </option>
          ))}
        </select>
      </div>
      <button
        className="px-4 py-1 text-white bg-blue-500 rounded-md mr-3"
        onClick={handleSubmit}
      >
        Add Task
      </button>
    </div>
  </div>
</div>
  );
};

export default Task;
