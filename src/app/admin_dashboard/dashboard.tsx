import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function AdminDashboard() {
  const [adminCount, setAdminCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    async function fetchData() {
      try {
        const [adminRes, userRes] = await Promise.all([
          fetch(`${apiBaseUrl}/api/Account/admin-count`),
          fetch(`${apiBaseUrl}/api/Account/standard-user-count`),
        ]);
        const adminData = await adminRes.json();
        const userData = await userRes.json();
        setUserCount(userData);
        setAdminCount(adminData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const data = {
    labels: ['Admins', 'Users'],
    datasets: [
      {
        label: 'Count',
        data: [adminCount, userCount],
        backgroundColor: ['#4CAF50', '#2196F3'],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const, // Fixed typing for position
      },
      title: {
        display: true,
        text: 'Admins and Users Count',
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">Admin Dashboard</h1>
        <div className="bg-white shadow-md rounded-lg p-6 m-4 w-full">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
