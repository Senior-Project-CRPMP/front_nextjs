import React, {useState, useEffect} from "react";

function RadialChart() {
  const [todoCount, setTodoCount] = useState(0);
  const [inprogressCount, setInprogressCount] = useState(0);
  const [doneCount, setDoneCount] = useState(0);
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const projectIdStr =
    typeof window !== "undefined" ? localStorage.getItem("projectId") : null;
  const projectId = projectIdStr !== null ? parseInt(projectIdStr) : null;

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const res = await fetch(`${apiBaseUrl}/api/Task/CountTasksByStatus/${projectId}/todo`);
        const data = await res.json();
        setTodoCount(data);
        console.log(todoCount);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTodo();
  }, [projectId]);

  useEffect(() => {
    const fetchInProgress = async () => {
      try {
        const res = await fetch(`${apiBaseUrl}/api/Task/CountTasksByStatus/${projectId}/inprogress`);
        const data = await res.json();
        setInprogressCount(data);
        console.log(inprogressCount);
      } catch (error) {
        console.error(error);
      }
    };
    fetchInProgress();
  }, [projectId]);

  useEffect(() => {
    const fetchDone = async () => {
      try {
        const res = await fetch(`${apiBaseUrl}/api/Task/CountTasksByStatus/${projectId}/done`);
        const data = await res.json();
        setDoneCount(data);
        console.log(doneCount);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDone();
  }, [projectId]);
  return (
    <div>
      <div className="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
        <div className="flex justify-between mb-3">
          <div className="flex items-center">
            <div className="flex justify-center items-center">
              <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white pe-1">
                Your team progress
              </h5>
              
              
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
          <div className="grid grid-cols-3 gap-3 mb-2">
            <dl className="bg-orange-50 dark:bg-gray-600 rounded-lg flex flex-col items-center justify-center h-[78px]">
              <dt className="w-8 h-8 rounded-full bg-orange-100 dark:bg-gray-500 text-orange-600 dark:text-orange-300 text-sm font-medium flex items-center justify-center mb-1">
                {todoCount}
              </dt>
              <dd className="text-orange-600 dark:text-orange-300 text-sm font-medium">
                To do
              </dd>
            </dl>
            <dl className="bg-teal-50 dark:bg-gray-600 rounded-lg flex flex-col items-center justify-center h-[78px]">
              <dt className="w-8 h-8 rounded-full bg-teal-100 dark:bg-gray-500 text-teal-600 dark:text-teal-300 text-sm font-medium flex items-center justify-center mb-1">
                {inprogressCount}
              </dt>
              <dd className="text-teal-600 dark:text-teal-300 text-sm font-medium">
                In progress
              </dd>
            </dl>
            <dl className="bg-blue-50 dark:bg-gray-600 rounded-lg flex flex-col items-center justify-center h-[78px]">
              <dt className="w-8 h-8 rounded-full bg-blue-100 dark:bg-gray-500 text-blue-600 dark:text-blue-300 text-sm font-medium flex items-center justify-center mb-1">
                {doneCount}
              </dt>
              <dd className="text-blue-600 dark:text-blue-300 text-sm font-medium">
                Done
              </dd>
            </dl>
          </div>
          
          
        </div>

        {/* <!-- Radial Chart --> */}
        <div className="py-6" id="radial-chart"></div>

        
      </div>
    </div>
  );
}

export default RadialChart;
