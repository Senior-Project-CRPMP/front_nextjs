import React from "react";
import RadialChart from "@/app/component/radialChart";
import AreaChart from "@/app/component/areaChart";

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
        <p>Description: {project.description}</p>
        <p>Objective: {project.objective}</p>
      </div>
      <div>
        <RadialChart />
      </div>
      <div className="mt-4">
        <AreaChart />
      </div>
    </div>
  );
};

export default Overview;
