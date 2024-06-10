import React, { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

const chartSetting = {
  yAxis: [
    {
      label: 'Tasks assigned',
    },
  ],
  width: 500,
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-20px, 0)',
    },
  },
};

interface User {
  id: string;
  firstName: string;
  lastName: string;
}

const valueFormatter = (value: number | null) => `${value}`;

export default function MemberContributionChart() {
  const [taskData, setTaskData] = useState<any[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const projectIdStr = typeof window !== "undefined" ? localStorage.getItem("projectId") : null;
  const projectId = projectIdStr !== null ? parseInt(projectIdStr) : null;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/UserProject/usersByProjectId/${projectId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data: User[] = await response.json();
        setUsers(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [apiBaseUrl, projectId]);

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const allTaskData = [];

        for (const user of users) {
          const res = await fetch(`${apiBaseUrl}/api/Task/CountTasksByStatusForUser/${projectId}/${user.id}/done`);
          const taskCount = await res.json();

          // Log the taskCount to inspect its structure
          console.log(`Task count for user ${user.firstName} ${user.lastName}:`, taskCount);

          // Ensure taskCount is a number
          if (typeof taskCount !== 'number') {
            console.error(`Expected number but got ${typeof taskCount}`, taskCount);
            continue;
          }

          allTaskData.push({
            member: `${user.firstName} ${user.lastName}`,
            tasks: taskCount,
          });
        }

        setTaskData(allTaskData);
      } catch (error) {
        console.error('Error fetching task data:', error);
      }
    };

    if (users.length > 0) {
      fetchTaskData();
    }
  }, [apiBaseUrl, projectId, users]);

  return (
    <BarChart
      dataset={taskData}
      xAxis={[{ scaleType: 'band', dataKey: 'member' }]}
      series={[
        { dataKey: 'tasks', label: 'Tasks', valueFormatter },
      ]}
      {...chartSetting}
    />
  );
}