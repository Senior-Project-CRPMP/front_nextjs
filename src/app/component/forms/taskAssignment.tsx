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
            <label htmlFor="description" className="block font-medium mb-2">
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
            <label htmlFor="status" className="block font-medium mb-2">
              Status
            </label>
            <select
              name="status"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
              onChange={handleChange}
            >
              <option value="TODO">TODO</option>
              <option value="inProgress">In progress</option>
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
              Assignee
            </label>
            <select
              name="userId"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
              onChange={handleChange}
            >
              <option value="">Select Assignee</option>
              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.firstName} {member.lastName}
                </option>
              ))}
            </select>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
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
