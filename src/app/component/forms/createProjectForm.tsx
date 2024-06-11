"use client";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import React, { useState, ChangeEvent, FormEvent, MouseEventHandler } from "react";

function CreateProjectForm() {
  const router = useRouter();
  const userId = typeof window !== 'undefined' ? localStorage.getItem('loggeduserid') : null;
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    objective: "",
    startDate: "2024-05-01",
    endDate: "",
    status: "pending",
    userId: userId,
  });

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };

  async function addProject() {
    try {
      const response = await fetch(
        `${apiBaseUrl}/api/Project/CreateProject`,
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
  
  const handleSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {

    addProject()
    router.push('/dashboard/projects');
    console.log(formData);
  };

  return (
    <form >
      <div className="flex flex-col justify-center px-20  lg:px-28 py-12">
      <div className="w-11/12 md:w-3/5 bg-white shadow-xl rounded-lg p-6">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-xl font-semibold leading-7 text-gray-900">
              Project Creation Form
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              create you project here.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Title
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <span className="flex select-none items-center  text-gray-500 sm:text-sm"></span>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      autoComplete="title"
                      className="block w-full rounded-md border-0 p-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="project one"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 p-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                    onChange={handleChange}
                  />
                </div>
                {/* <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p> */}
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Objective
                </label>
                <div className="mt-2">
                  <textarea
                    id="objective"
                    name="objective"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 p-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-span-full">
                  <div className="relative max-w-sm">
                    <label
                      htmlFor="date"
                      className="block text-sm font-medium leading-6 pt-7 pb-2 text-gray-900"
                    >
                      Choose End date
                    </label>
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none"></div>
                    <input
                      type="date"
                      name="endDate"
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Select date"
                      min={new Date().toISOString().split('T')[0]}
                    ></input>
                  </div>
                </div>
                {/* <p classNameName="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p> */}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Link href="/dashboard">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
          </Link>
                     
            <button onClick={handleSubmit}
              type="button"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Save
            </button>
        
        </div>
      </div>
      </div>
    </form>
  );
}
export default CreateProjectForm;
