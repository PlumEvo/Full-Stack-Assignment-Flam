import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import UserModal from './UserModal';

// departments list
const depts = ['HR', 'Engineering', 'Marketing', 'Sales', 'Finance', 'Operations'];

export default function UserCard({ user, rating, onBookmarkChange }) {
  const router = useRouter();
  const [isStarred, setIsStarred] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isPromoted, setIsPromoted] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  
  // keep dept value stable
  const { dept } = useMemo(() => ({
    dept: user.department || depts[Math.floor(Math.random() * depts.length)],
  }), [user.department]);

  // check if user is starred on load
  useEffect(() => {
    const stars = new Set(JSON.parse(localStorage.getItem('bookmarkedUsers') || '[]'));
    setIsStarred(stars.has(user.id));
  }, [user.id]);

  const handleStar = () => {
    const newState = !isStarred;
    setIsStarred(newState);
    
    // update stars in storage
    const stars = new Set(JSON.parse(localStorage.getItem('bookmarkedUsers') || '[]'));
    if (newState) {
      stars.add(user.id);
    } else {
      stars.delete(user.id);
    }
    localStorage.setItem('bookmarkedUsers', JSON.stringify([...stars]));
    
    onBookmarkChange?.(user.id, newState);
  };

  const handlePromote = () => {
    setIsPromoted(true);
    // show toast
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    toast.textContent = `${user.firstName} ${user.lastName} has been promoted!`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  const goToProfile = () => {
    router.push(`/employee/${user.id}`);
    setShowMenu(false);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold">{`${user.firstName} ${user.lastName}`}</h3>
            <p className="text-gray-600 text-sm mt-1">{user.email}</p>
            <p className="text-gray-500 text-sm mt-1">Age: {user.age}</p>
            <p className="text-gray-500 text-sm mt-1">
              Department: {dept}
              {isPromoted && <span className="ml-2 text-green-500">(Promoted)</span>}
            </p>
          </div>
          <button 
            onClick={handleStar}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label={isStarred ? 'Remove star' : 'Add star'}
          >
            {!isStarred ? 
              <img src="/bookmark.svg" alt="Star" className="w-6 h-5" /> : 
              <img src="/not_bookmark.svg" alt="Unstar" className="w-6 h-5" />
            }
          </button>
        </div>

        <div className="mt-4">
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-2">Performance:</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-lg ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`}>
                  ★
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <div className="relative">
            <button 
              onClick={() => setShowMenu(!showMenu)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm transition-colors flex items-center"
            >
              View
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showMenu && (
              <div className="absolute z-10 mt-2 w-48 bg-white rounded-md shadow-lg">
                <div className="py-1">
                  <button
                    onClick={() => setShowModal(true)}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Quick View
                  </button>
                  <button
                    onClick={goToProfile}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            )}
          </div>
          <button 
            onClick={handlePromote}
            disabled={isPromoted}
            className={`${
              isPromoted 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-green-500 hover:bg-green-600'
            } text-white px-4 py-2 rounded text-sm transition-colors`}
          >
            {isPromoted ? 'Promoted' : 'Promote'}
          </button>
        </div>
      </div>

      {showModal && (
        <UserModal 
          user={user}
          department={dept}
          rating={rating}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
} 