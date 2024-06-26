"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

interface Task {
  id: number;
  projectId: number;
  title: string;
  description: string;
  assignedTo: string;
  deadline: string;
  status: string;
}

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const today = new Date();
  const [isOpen, setIsOpen] = useState(false);
  const projectIdStr = localStorage.getItem("projectId");
  const projectId = projectIdStr !== null ? parseInt(projectIdStr) : null;
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const res = await fetch(`${apiBaseUrl}/api/Task/ProjectTasks/${projectId}`);

        const data = await res.json();
        setTasks(data);
        console.log(tasks);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCard();
  }, [projectId]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // Update the calendar when the component mounts
    updateCalendar(currentDate);
  }, [currentDate, tasks]);

  // Function to get the number of days in a month
  function getDaysInMonth(month: number, year: number): number {
    return new Date(year, month + 1, 0).getDate();
  }

  function getDateOneMonthAgo(currentDate: Date) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    let newMonth = month - 1;
    let newYear = year;

    if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    }

    setCurrentDate(new Date(newYear, newMonth, currentDate.getDate()));
  }

  function getDateOneMonthLater(currentDate: Date) {
    const year = currentDate.getFullYear();
    let month = currentDate.getMonth();

    let newMonth = month + 1;
    let newYear = year;

    if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    }

    setCurrentDate(new Date(newYear, newMonth, currentDate.getDate()));
  }

  function updateCalendar(date: Date) {
    const numDays = getDaysInMonth(date.getMonth(), date.getFullYear());
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    ).getDay();
    const offset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    const days = [];
    for (let i = 0; i < offset; i++) {
      days.push(<div key={`empty-${i}`} className="bg-gray-200"></div>);
    }

    for (let i = 1; i <= numDays; i++) {
      const currentDayDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        i + 1
      );
      const currentDayStr = currentDayDate.toISOString().split("T")[0];

      const tasksForDay = tasks.filter((task) =>
        task.deadline.startsWith(currentDayStr)
      );
      if (
        currentDate.getMonth() === today.getMonth() &&
        i === today.getDate()
      ) {
        days.push(
          <div
            className="flex h-full flex-col bg-blue-300 px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
            key={i}
            onClick={() => handleDayClick(i)}
          >
            <span>{i}</span>
            {tasksForDay.map((task) => (
              <div key={task.id} className="text-sm">
                <div>{task.title}</div>
                <div>{task.status}</div>
              </div>
            ))}
          </div>
        );
      } else {
        days.push(
          <div
            className="flex h-full flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
            key={i}
            onClick={() => handleDayClick(i)}
          >
            <span>{i}</span>
            {tasksForDay.map((task) => (
              <div key={task.id} className="text-sm">
                <div className="text-gray-900">{task.title}</div>
                <div className="text-gray-300">{task.status}</div>
              </div>
            ))}
          </div>
        );
      }
    }

    return days;
  }

  function handleDayClick(day: number) {
    console.log(`Clicked on day ${day}`);
  }

  // Assuming you have already fetched and stored tasks in the 'tasks' state

  return (
    <div className="lg:flex lg:h-full lg:flex-col">
      <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4 lg:flex-none">
        <h1 className="text-base font-semibold leading-6 text-gray-900">
          <div>
            {currentDate.toLocaleString("default", {
              month: "short",
              year: "numeric",
            })}
          </div>
        </h1>
        <div className="flex items-center">
          <div className="relative flex items-center md:items-stretch">
            <button
              type="button"
              className="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
              onClick={() => getDateOneMonthAgo(currentDate)}
            >
              <span className="sr-only">Previous month</span>
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <button
              type="button"
              className="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block"
              onClick={() => setCurrentDate(new Date())}
            >
              Today
            </button>
            <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden"></span>
            <button
              type="button"
              className="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50"
              onClick={() => getDateOneMonthLater(currentDate)}
            >
              <span className="sr-only">Next month</span>
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="hidden md:ml-4 md:flex md:items-center">
            <div className="relative">
              <button
                type="button"
                className="flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                id="menu-button"
                onClick={toggleMenu}
                aria-expanded={isOpen ? "true" : "false"}
                aria-haspopup="true"
              >
                Month view
                <svg
                  className="-mr-1 h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
              {isOpen && (
                <div
                  id="dropdown-menu"
                  className="absolute right-0 z-10 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                >
                  <div className="py-1" role="none">
                    <a
                      href="#"
                      className="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      tabIndex={-1}
                      id="menu-item-0"
                    >
                      Day view
                    </a>
                    <a
                      href="#"
                      className="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      tabIndex={-1}
                      id="menu-item-1"
                    >
                      Week view
                    </a>
                    <a
                      href="#"
                      className="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      tabIndex={-1}
                      id="menu-item-2"
                    >
                      Month view
                    </a>
                    <a
                      href="#"
                      className="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      tabIndex={-1}
                      id="menu-item-3"
                    >
                      Year view
                    </a>
                  </div>
                </div>
              )}
            </div>
            <div className="ml-6 h-6 w-px bg-gray-300"></div>
            <Link href="/project_dashboard/addtask">
              <button
                type="button"
                className="ml-6 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Add Task
              </button>
            </Link>
          </div>
        </div>
      </header>
      <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
        <div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
          <div className="flex justify-center bg-white py-2">
            <span>M</span>
            <span className="sr-only sm:not-sr-only">on</span>
          </div>
          <div className="flex justify-center bg-white py-2">
            <span>T</span>
            <span className="sr-only sm:not-sr-only">ue</span>
          </div>
          <div className="flex justify-center bg-white py-2">
            <span>W</span>
            <span className="sr-only sm:not-sr-only">ed</span>
          </div>
          <div className="flex justify-center bg-white py-2">
            <span>T</span>
            <span className="sr-only sm:not-sr-only">hu</span>
          </div>
          <div className="flex justify-center bg-white py-2">
            <span>F</span>
            <span className="sr-only sm:not-sr-only">ri</span>
          </div>
          <div className="flex justify-center bg-white py-2">
            <span>S</span>
            <span className="sr-only sm:not-sr-only">at</span>
          </div>
          <div className="flex justify-center bg-white py-2">
            <span>S</span>
            <span className="sr-only sm:not-sr-only">un</span>
          </div>
        </div>
        <div className="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
          <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
            {updateCalendar(currentDate)}
          </div>
        </div>
      </div>
    </div>
  );
}
