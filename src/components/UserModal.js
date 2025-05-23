export default function UserModal({ user, department, rating, onClose }) {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">{user.firstName} {user.lastName}</h2>
            <div className="space-y-3">
              <p><span className="font-semibold">Email:</span> {user.email}</p>
              <p><span className="font-semibold">Age:</span> {user.age}</p>
              <p><span className="font-semibold">Department:</span> {department}</p>
              <p><span className="font-semibold">Phone:</span> {user.phone}</p>
              <p><span className="font-semibold">Address:</span> {user.address.address}, {user.address.city}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Performance Rating</h3>
              <div className="flex">
                {[...Array(5)].map((_, index) => (
                  <span 
                    key={index}
                    className={`text-2xl ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Company Details</h3>
              <p><span className="font-semibold">Employee ID:</span> {user.id}</p>
              <p><span className="font-semibold">Join Date:</span> {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 