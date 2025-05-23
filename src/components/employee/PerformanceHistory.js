export default function PerformanceHistory({ history }) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Performance History</h3>
      <div className="space-y-6">
        {history.map(record => (
          <div key={record.year} className="border-b pb-6 last:border-b-0">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-medium text-lg">{record.year}</h4>
                <div className="flex mt-1">
                  {[...Array(5)].map((_, index) => (
                    <span 
                      key={index}
                      className={`text-lg ${index < record.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm ${
                record.rating >= 4 ? 'bg-green-100 text-green-800' :
                record.rating >= 3 ? 'bg-blue-100 text-blue-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {record.rating >= 4 ? 'Exceptional' :
                 record.rating >= 3 ? 'Meeting Expectations' :
                 'Needs Improvement'}
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h5 className="font-medium text-sm text-gray-600 mb-2">Key Highlights</h5>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  {record.highlights.map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h5 className="font-medium text-sm text-gray-600 mb-2">Areas for Improvement</h5>
                <p className="text-gray-600">{record.improvements}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 