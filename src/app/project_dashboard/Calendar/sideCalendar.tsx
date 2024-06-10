import React, {useState, useEffect} from "react";

interface Task {
    id: number;
    projectId: number;
    title: string;
    description: string;
    assignedTo: string;
    deadline: string;
    status: string;
  }

export default function sideCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  let today = new Date();
  const projectIdStr = localStorage.getItem('projectId');
  const projectId = projectIdStr !== null ? parseInt(projectIdStr) : null;

  useEffect(() => {
    // Update the calendar when the component mounts
    updateCalendar(currentDate);
  }, [currentDate]);

  // Function to get the number of days in a month
  function getDaysInMonth(month: number, year: number) : number {
    return new Date(year, month + 1, 0).getDate();
  }

  function getDateOneMonthAgo(currentDate : Date) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
  
    // Calculate the new month and year
    let newMonth = month - 1;
    let newYear = year;
  
    if (newMonth < 0) {
      // If the new month is negative, subtract it from the year and set the month to December (11)
      newMonth = 11;
      newYear--;
    }
  
    // Construct and return the new date
    setCurrentDate(new Date(newYear, newMonth, currentDate.getDate()));
  }

  function getDateOneMonthLater(currentDate : Date) {
    const year = currentDate.getFullYear();
    let month = currentDate.getMonth();
  
    // Calculate the new month and year
    let newMonth = month + 1;
    let newYear = year;
  
    if (newMonth > 11) {
      // If the new month exceeds 11 (December), increment the year and set the month to January (0)
      newMonth = 0;
      newYear++;
    }
  
    // Construct and return the new date
    setCurrentDate(new Date(newYear, newMonth, currentDate.getDate()));
  }

  // Function to update the calendar
  function updateCalendar(date: Date) {
    const numDays = getDaysInMonth(date.getMonth(), date.getFullYear());
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const offset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;


    // Generate buttons for each day
    const days = [];
    for (let i = 0; i < offset; i++) {
        days.push(
            <div key={`empty-${i}`} className="bg-gray-200"></div>
        );
    }
    

    for (let i = 1; i <= numDays; i++) {
        if (currentDate.getMonth() === today.getMonth() && i === today.getDate()){
            days.push(
                <div key={i} className="flex h-14 flex-col bg-indigo-500 px-3 py-2 text-white hover:bg-gray-100 focus:z-10 justify-center">
                    {i}
                </div>
         ); 
        }
        else{
      days.push(
        
        <div key={i} className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10 justify-center">
                    {i}
                </div>
            
    
      );
        }
    }

    return days;
  }
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const res = await fetch(`https://localhost:7174/api/Task/ProjectTasks/${projectId}`);
        const data = await res.json();
        setTasks(data);
        console.log(tasks);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCard();
  }, [projectId]);


  const sortedTasks = tasks.slice().sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());

    // Filter upcoming tasks
    const upcomingTasks = sortedTasks.filter(task => new Date(task.deadline) >= new Date());

    // Take the first three upcoming tasks
    const threeUpcomingTasks = upcomingTasks.slice(0, 3);

  
    return(
        <div className="flex items-center justify-center py-8 px-4">

                    <div className="max-w-sm w-full shadow-lg">
                        <div className="md:p-8 p-5 dark:bg-gray-800 bg-white rounded-t">
                            <div className="px-4 flex items-center justify-between">
                                <span  tabIndex={0} className="focus:outline-none  text-base font-bold dark:text-gray-100 text-gray-800">{currentDate.toLocaleString('default', { month: 'short', year: 'numeric' })}</span>
                                <div className="flex items-center">
                                    <button aria-label="calendar backward" className="focus:text-gray-400 hover:text-gray-400 text-gray-800 dark:text-gray-100" onClick={() => getDateOneMonthAgo(currentDate)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-left" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <polyline points="15 6 9 12 15 18" />
                                    </svg>
                                </button>
                                <button aria-label="calendar forward" className="focus:text-gray-400 hover:text-gray-400 ml-3 text-gray-800 dark:text-gray-100" onClick={() => getDateOneMonthLater(currentDate)}> 
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler  icon-tabler-chevron-right" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <polyline points="9 6 15 12 9 18" />
                                    </svg>
                                </button>

                                </div>
                            </div>
                            <div className="flex items-center justify-between pt-12 overflow-x-auto">
                            <div className="w-full">
                            <div className="flex justify-between">
                                <div className="w-full flex justify-center">
                                    <p className="text-base font-medium text-center text-gray-800 dark:text-gray-100">Mo</p>
                                </div>
                                <div className="w-full flex justify-center">
                                    <p className="text-base font-medium text-center text-gray-800 dark:text-gray-100">Tu</p>
                                </div>
                                <div className="w-full flex justify-center">
                                    <p className="text-base font-medium text-center text-gray-800 dark:text-gray-100">We</p>
                                </div>
                                <div className="w-full flex justify-center">
                                    <p className="text-base font-medium text-center text-gray-800 dark:text-gray-100">Th</p>
                                </div>
                                <div className="w-full flex justify-center">
                                    <p className="text-base font-medium text-center text-gray-800 dark:text-gray-100">Fr</p>
                                </div>
                                <div className="w-full flex justify-center">
                                    <p className="text-base font-medium text-center text-gray-800 dark:text-gray-100">Sa</p>
                                </div>
                                <div className="w-full flex justify-center">
                                    <p className="text-base font-medium text-center text-gray-800 dark:text-gray-100">Su</p>
                                </div>
                            </div>
                            <div className="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
                            <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
                                {updateCalendar(currentDate)}
                                </div>
                            </div>
                        </div>
                        </div>
                        </div>
                        <div className="md:py-8 py-5 md:px-16 px-5 dark:bg-gray-700 bg-gray-50 rounded-b">
                            <p className="text-sm font-light border-b pb-4 border-gray-400 border-dashed pt-5"> UPCOMING TASKS</p>
                            {threeUpcomingTasks.map(task => (
                            <div key={task.id} className="">
                            <li className="text-sm font-light mb-1">{task.title} {task.deadline}</li>
                            </div>
                            ))}
                        </div>
                        
                    </div>
                </div>
    );
}