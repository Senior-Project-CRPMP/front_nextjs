import React from "react";
import RadialChart from "@/app/component/radialChart";
import AreaChart from "@/app/component/areaChart";
import MemberList from "@/app/component/MemberList";


type Project = {
  id: number;
  title: string;
  description: string;
  objective: string;
  startDate: string;
  endDate: string;
  status: string;
  managerId: number;
};

type OverviewProps = {
  project: Project | null;
};

const Overview: React.FC<OverviewProps> = ({ project }) => {
  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {project.title}
            </h5>
          </a>
          <p className="mb-3 font-extrabold text-gray-700 dark:text-gray-400">
            Description: {project.description}{" "}
          </p>
          <p className="mb-3 font-extrabold text-gray-700 dark:text-gray-400">
            Objectives: {project.objective}{" "}
          </p>
          <a
            href="#"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Details
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        </div>
      </div>
      <div>
        <RadialChart />
      </div>
      <div className="mt-4">
        {/* <AreaChart /> */}
        <MemberList />
      </div>
    </div>
  );
};

export default Overview;
