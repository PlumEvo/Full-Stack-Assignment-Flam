import { useState, useEffect } from 'react';
import PerformanceHistory from './PerformanceHistory';
import ProjectsList from './ProjectsList';
import FeedbackList from './FeedbackList';

// mock data for testing
const mockData = {
  id: 1,
  name: 'Alice Johnson',
  email: 'alice.johnson@company.com',
  position: 'Senior Software Engineer',
  dept: 'Engineering',
  joined: '2022-03-15',
  manager: 'Bob Smith',
  location: 'New York, NY',
  team: 'Frontend Development',
  skills: ['React', 'TypeScript', 'Node.js', 'AWS', 'GraphQL'],
  certs: ['AWS Certified Developer', 'Google Cloud Professional'],
  history: [
    {
      year: 2023,
      rating: 5,
      highlights: [
        'Led legacy system migration',
        'Mentored 3 juniors',
        'Improved perf by 40%'
      ],
      improvements: [
        'Keep growing leadership skills',
        'Document more'
      ]
    },
    {
      year: 2022,
      rating: 4,
      highlights: [
        'Shipped 5 major projects',
        'Added automated tests',
        'Cut bugs by 30%'
      ],
      improvements: [
        'Take lead on architecture',
        'Level up presentations'
      ]
    }
  ]
};

export default function EmployeeDetails({ employeeId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('overview');

  useEffect(() => {
    // fake api call
    const getData = async () => {
      await new Promise(r => setTimeout(r, 1000));
      setData(mockData);
      setLoading(false);
    };

    getData();
  }, [employeeId]);

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No employee found</p>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'performance', label: 'Performance' },
    { id: 'projects', label: 'Projects' },
    { id: 'feedback', label: 'Feedback' }
  ];

  return (
    <div className="max-w-5xl mx-auto p-8">
      {/* header */}
      <div className="bg-white rounded shadow p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">{data.name}</h2>
            <p className="text-gray-600">{data.position}</p>
          </div>
          <div className="mt-4 md:mt-0">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Edit
            </button>
          </div>
        </div>
      </div>

      {/* tabs */}
      <div className="border-b mb-6">
        <nav className="flex gap-8">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                tab === t.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </div>

      {/* content */}
      <div className="bg-white rounded shadow p-6">
        {tab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-bold mb-4">Info</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-500">Email</label>
                    <p className="mt-1">{data.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Department</label>
                    <p className="mt-1">{data.dept}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Location</label>
                    <p className="mt-1">{data.location}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Joined</label>
                    <p className="mt-1">{data.joined}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4">Team</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-500">Team</label>
                    <p className="mt-1">{data.team}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Manager</label>
                    <p className="mt-1">{data.manager}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold">Skills & Certs</h3>
              <div>
                <label className="text-sm text-gray-500">Skills</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {data.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-500">Certifications</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {data.certs.map((cert, i) => (
                    <span
                      key={i}
                      className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'performance' && (
          <PerformanceHistory history={data.history} />
        )}

        {tab === 'projects' && (
          <ProjectsList employeeId={data.id} />
        )}

        {tab === 'feedback' && (
          <FeedbackList employeeId={data.id} />
        )}
      </div>
    </div>
  );
} 