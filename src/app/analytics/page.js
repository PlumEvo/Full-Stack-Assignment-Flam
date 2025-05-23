'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { departments } from '@/constants';

// setup charts
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

// bar chart setup
const barConfig = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Department Ratings',
    },
  },
  scales: {
    y: {
      min: 0,
      max: 5,
      ticks: {
        stepSize: 1,
      },
    },
  },
};

// line chart setup
const lineConfig = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Stars Over Time',
    },
  },
  scales: {
    y: {
      min: 0,
      ticks: {
        stepSize: 5,
      },
    },
  },
};

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [deptStats, setDeptStats] = useState({});
  const [starHistory, setStarHistory] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        // get users
        const res = await fetch('https://dummyjson.com/users?limit=100');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();

        // calc dept averages
        const stats = {};
        departments.forEach(d => {
          stats[d] = { sum: 0, count: 0 };
        });

        data.users.forEach(user => {
          const score = Math.floor(Math.random() * 5) + 1;
          const dept = departments[Math.floor(Math.random() * departments.length)];
          stats[dept].sum += score;
          stats[dept].count += 1;
        });

        const avgs = {};
        Object.entries(stats).forEach(([dept, data]) => {
          avgs[dept] = data.count > 0 ? (data.sum / data.count).toFixed(2) : 0;
        });

        setDeptStats(avgs);

        // mock star history
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
        const mockData = months.map(m => ({
          month: m,
          stars: Math.floor(Math.random() * 30) + 10,
        }));

        setStarHistory(mockData);
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const barData = {
    labels: departments,
    datasets: [
      {
        label: 'Avg Rating',
        data: departments.map(d => deptStats[d] || 0),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderColor: 'rgb(53, 162, 235)',
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels: starHistory.map(x => x.month),
    datasets: [
      {
        label: 'Stars',
        data: starHistory.map(x => x.stars),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.3,
      },
    ],
  };

  // helper to get top dept
  const getTopDept = () => {
    const sorted = Object.entries(deptStats).sort(([, a], [, b]) => b - a);
    return sorted[0] || [];
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/" className="inline-flex items-center text-blue-500 hover:text-blue-600">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </Link>
          <h1 className="text-3xl font-bold">Analytics</h1>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Bar options={barConfig} data={barData} />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <Line options={lineConfig} data={lineData} />
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">Top Department</h3>
              <p className="text-2xl font-bold text-blue-600">{getTopDept()[0]}</p>
              <p className="text-gray-600">Rating: {getTopDept()[1]}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">Total Stars</h3>
              <p className="text-2xl font-bold text-green-600">
                {starHistory.reduce((sum, x) => sum + x.stars, 0)}
              </p>
              <p className="text-gray-600">All time</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">Overall Rating</h3>
              <p className="text-2xl font-bold text-purple-600">
                {(Object.values(deptStats).reduce((sum, v) => sum + Number(v), 0) / departments.length).toFixed(2)}
              </p>
              <p className="text-gray-600">Company average</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 