'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import PerformanceHistory from '@/components/employee/PerformanceHistory';
import ProjectsList from '@/components/employee/ProjectsList';
import FeedbackList from '@/components/employee/FeedbackList';

const tabs = ['Overview', 'Projects', 'Feedback'];

export default function EmployeePage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('Overview');
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/users/${id}`);
        if (!response.ok) throw new Error('Failed to fetch employee');
        const data = await response.json();
        
        // Add mock data
        const mockData = {
          ...data,
          bio: "Dedicated professional with expertise in cross-functional team leadership and project management. Proven track record of delivering results while maintaining high team morale.",
          department: ['HR', 'Engineering', 'Marketing', 'Sales', 'Finance'][Math.floor(Math.random() * 5)],
          rating: Math.floor(Math.random() * 5) + 1,
          joinDate: new Date(Date.now() - Math.random() * 5 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          performance: generatePerformanceHistory(),
        };
        
        setEmployee(mockData);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Employee not found</h1>
          <Link href="/" className="text-blue-500 hover:underline mt-4 inline-block">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link 
        href="/" 
        className="inline-flex items-center text-blue-500 hover:text-blue-600 mb-6"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Dashboard
      </Link>

      {/* Employee Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {employee.firstName} {employee.lastName}
            </h1>
            <p className="text-gray-600">{employee.department}</p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-2">Performance:</span>
              <div className="flex">
                {[...Array(5)].map((_, index) => (
                  <span 
                    key={index}
                    className={`text-lg ${index < employee.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-1">Joined: {employee.joinDate}</p>
          </div>
        </div>
      </div>

      {/* Employee Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
          <div className="space-y-3">
            <p><span className="font-medium">Email:</span> {employee.email}</p>
            <p><span className="font-medium">Phone:</span> {employee.phone}</p>
            <p><span className="font-medium">Address:</span> {employee.address.address}, {employee.address.city}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <div className="space-y-3">
            <p><span className="font-medium">Age:</span> {employee.age}</p>
            <p><span className="font-medium">Gender:</span> {employee.gender}</p>
            <p><span className="font-medium">Birth Date:</span> {employee.birthDate}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Company Details</h2>
          <div className="space-y-3">
            <p><span className="font-medium">Department:</span> {employee.department}</p>
            <p><span className="font-medium">Employee ID:</span> {employee.id}</p>
            <p><span className="font-medium">Status:</span> <span className="text-green-500">Active</span></p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b">
          <nav className="flex">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === tab
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'Overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Bio</h3>
                <p className="text-gray-600">{employee.bio}</p>
              </div>
              <PerformanceHistory history={employee.performance} />
            </div>
          )}
          
          {activeTab === 'Projects' && (
            <ProjectsList employeeId={employee.id} />
          )}
          
          {activeTab === 'Feedback' && (
            <FeedbackList employeeId={employee.id} />
          )}
        </div>
      </div>
    </div>
  );
}

function generatePerformanceHistory() {
  const history = [];
  const currentYear = new Date().getFullYear();
  
  for (let i = 0; i < 5; i++) {
    const year = currentYear - i;
    history.push({
      year,
      rating: Math.floor(Math.random() * 5) + 1,
      highlights: [
        'Exceeded quarterly targets by ' + (Math.floor(Math.random() * 30) + 10) + '%',
        'Completed ' + (Math.floor(Math.random() * 5) + 2) + ' major projects',
        'Received ' + (Math.floor(Math.random() * 3) + 1) + ' performance awards'
      ],
      improvements: [
        'Time management',
        'Cross-team collaboration',
        'Technical documentation'
      ][Math.floor(Math.random() * 3)]
    });
  }
  
  return history;
} 