import React, { useState, useEffect } from "react";
import { PieChart as MUIPieChart } from '@mui/x-charts/PieChart';

export default function CustomPieChart() {
  const [todoCount, setTodoCount] = useState(0);
  const [inprogressCount, setInprogressCount] = useState(0);
  const [doneCount, setDoneCount] = useState(0);
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const projectIdStr = typeof window !== "undefined" ? localStorage.getItem("projectId") : null;
  const projectId = projectIdStr !== null ? parseInt(projectIdStr) : null;

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const res = await fetch(`${apiBaseUrl}/api/Task/CountTasksByStatus/${projectId}/todo`);
        const data = await res.json();
        setTodoCount(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTodo();
  }, [apiBaseUrl, projectId]);

  useEffect(() => {
    const fetchInProgress = async () => {
      try {
        const res = await fetch(`${apiBaseUrl}/api/Task/CountTasksByStatus/${projectId}/inprogress`);
        const data = await res.json();
        setInprogressCount(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchInProgress();
  }, [apiBaseUrl, projectId]);

  useEffect(() => {
    const fetchDone = async () => {
      try {
        const res = await fetch(`${apiBaseUrl}/api/Task/CountTasksByStatus/${projectId}/done`);
        const data = await res.json();
        setDoneCount(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDone();
  }, [apiBaseUrl, projectId]);

  return (
    <MUIPieChart
      series={[
        {
          data: [
            { id: 0, value: todoCount, label: 'To Do' },
            { id: 1, value: inprogressCount, label: 'In progress' },
            { id: 2, value: doneCount, label: 'Done' },
          ],
        },
      ]}
      width={400}
      height={200}
    />
  );
}