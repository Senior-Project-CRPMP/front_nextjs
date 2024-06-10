import React, { useState, useEffect } from "react";
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

export default function CustomGaugeChart() {
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

  const totalTasks = todoCount + inprogressCount + doneCount;
  const donePercentage = totalTasks > 0 ? (doneCount / totalTasks) * 100 : 0;

  const settings = {
    width: 200,
    height: 200,
    value: donePercentage,
  };

  return (
    <Gauge
      {...settings}
      cornerRadius="50%"
      sx={(theme) => ({
        [`& .${gaugeClasses.valueText}`]: {
          fontSize: 40,
        },
        [`& .${gaugeClasses.valueArc}`]: {
          fill: '#52b202',
        },
        [`& .${gaugeClasses.referenceArc}`]: {
          fill: theme.palette.text.disabled,
        },
      })}
    />
  );
}
