"use client";
import React from "react";
import KanbanBoard from "@/app/component/kanbanBoard";

function MyTask() {
  return (
    <div className="flex space-x-2 mt-0">
      <KanbanBoard />
    </div>
  );
}

export default MyTask;
