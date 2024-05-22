import React from "react";
import RadialChart from "@/app/component/radialChart";
import AreaChart from "@/app/component/areaChart";
function Overview() {
  return (
    <div>
      <div>
        <RadialChart />
      </div>
      <div className="mt-4">
        <AreaChart />
      </div>
    </div>
  );
}

export default Overview;
