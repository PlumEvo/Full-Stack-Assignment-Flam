import { useState, useEffect } from 'react';

const mockProjects = [
  {
    id: 1,
    name: 'Website Redesign',
    status: 'Completed',
    completion: 100,
    role: 'Lead Developer',
    startDate: '2023-01-15',
    endDate: '2023-04-30',
    description: 'Led the complete overhaul of company website with focus on user experience and performance optimization.'
  },
  {
    id: 2,
    name: 'Mobile App Development',
    status: 'In Progress',
    completion: 75,
    role: 'Senior Developer',
    startDate: '2023-06-01',
    endDate: '2023-12-31',
    description: 'Developing a cross-platform mobile application using React Native for internal communication.'
  },
  {
    id: 3,
    name: 'Data Analytics Dashboard',
    status: 'In Progress',
    completion: 40,
    role: 'Full Stack Developer',
    startDate: '2023-09-01',
    endDate: '2024-02-28',
    description: 'Creating a real-time analytics dashboard for monitoring business metrics and KPIs.'
  }
];

export default function ProjectsList({ employeeId }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchProjects = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProjects(mockProjects);
      setLoading(false);
    };

    fetchProjects();
  }, [employeeId]);

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Projects</h3>
      <div className="space-y-6">
        {projects.map(project => (
          <div key={project.id} className="bg-gray-50 rounded-lg p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <div>
                <h4 className="text-xl font-medium">{project.name}</h4>
                <p className="text-gray-600 text-sm mt-1">Role: {project.role}</p>
              </div>
              <div className="mt-2 md:mt-0">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  project.status === 'Completed' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {project.status}
                </span>
              </div>
            </div>

            <p className="text-gray-600 mb-4">{project.description}</p>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{project.completion}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 rounded-full h-2"
                    style={{ width: `${project.completion}%` }}
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div>
                  <span className="font-medium">Start Date:</span> {project.startDate}
                </div>
                <div>
                  <span className="font-medium">End Date:</span> {project.endDate}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 