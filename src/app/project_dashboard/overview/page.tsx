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
    <div className="p-6 space-y-6 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6">
          <a href="#">
            <h5 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              {project.title}
            </h5>
          </a>
          <div className="mb-4">
            <h6 className="mb-2 text-xl font-semibold text-gray-700 dark:text-gray-300">
              Description
            </h6>
            <p className="text-base font-normal text-gray-700 dark:text-gray-400">
              {project.description}
            </p>
          </div>
          <div className="mb-4">
            <h6 className="mb-2 text-xl font-semibold text-gray-700 dark:text-gray-300">
              Objective
            </h6>
            <p className="text-base font-normal text-gray-700 dark:text-gray-400">
              {project.objective}
            </p>
          </div>
          <a
            href="#"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Details
            <svg
              className="w-4 h-4 ml-2 rtl:rotate-180"
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
