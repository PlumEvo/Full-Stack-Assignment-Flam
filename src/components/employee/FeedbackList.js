import { useState, useEffect } from 'react';

const mockFeedback = [
  {
    id: 1,
    type: 'Peer Review',
    reviewer: 'John Smith',
    date: '2024-02-15',
    rating: 5,
    content: 'Excellent team player with strong problem-solving skills. Always willing to help others and contribute to team success.',
    strengths: ['Technical expertise', 'Collaboration', 'Initiative'],
    improvements: ['Documentation could be more detailed']
  },
  {
    id: 2,
    type: 'Manager Review',
    reviewer: 'Sarah Johnson',
    date: '2024-01-10',
    rating: 4,
    content: 'Consistently delivers high-quality work and meets deadlines. Shows great potential for leadership roles.',
    strengths: ['Project management', 'Communication', 'Reliability'],
    improvements: ['Could delegate more effectively']
  },
  {
    id: 3,
    type: 'Project Feedback',
    reviewer: 'Mike Wilson',
    date: '2023-12-05',
    rating: 5,
    content: 'Demonstrated exceptional technical skills during the recent project launch. Great attention to detail.',
    strengths: ['Technical skills', 'Attention to detail', 'Meeting deadlines'],
    improvements: ['Could improve presentation skills']
  }
];

export default function FeedbackList({ employeeId }) {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchFeedback = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setFeedback(mockFeedback);
      setLoading(false);
    };

    fetchFeedback();
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
      <h3 className="text-lg font-semibold mb-4">Feedback & Reviews</h3>
      <div className="space-y-6">
        {feedback.map(item => (
          <div key={item.id} className="bg-gray-50 rounded-lg p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
              <div>
                <h4 className="text-xl font-medium">{item.type}</h4>
                <p className="text-gray-600 text-sm mt-1">
                  By {item.reviewer} • {item.date}
                </p>
              </div>
              <div className="mt-2 sm:mt-0 flex items-center">
                <span className="text-sm text-gray-600 mr-2">Rating:</span>
                <div className="flex">
                  {[...Array(5)].map((_, index) => (
                    <span 
                      key={index}
                      className={`text-lg ${index < item.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-gray-600 mb-4">{item.content}</p>

            <div className="space-y-4">
              <div>
                <h5 className="font-medium text-sm text-gray-600 mb-2">Key Strengths</h5>
                <div className="flex flex-wrap gap-2">
                  {item.strengths.map((strength, index) => (
                    <span 
                      key={index}
                      className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                    >
                      {strength}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="font-medium text-sm text-gray-600 mb-2">Areas for Improvement</h5>
                <div className="flex flex-wrap gap-2">
                  {item.improvements.map((improvement, index) => (
                    <span 
                      key={index}
                      className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm"
                    >
                      {improvement}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 