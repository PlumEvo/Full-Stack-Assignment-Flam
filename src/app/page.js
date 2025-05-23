'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import UserCard from '@/components/UserCard';
import SearchAndFilter from '@/components/SearchAndFilter';
import { departments } from '@/constants';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showBookmarked, setShowBookmarked] = useState(false);
  const [bookmarkedUsers, setBookmarkedUsers] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    departments: ['All Departments'],
    ratings: ['All Ratings']
  });

  // Generate and store consistent ratings for users
  const [userRatings] = useState(() => {
    const ratings = new Map();
    return ratings;
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://dummyjson.com/users?limit=20');
        if (!response.ok) throw new Error('Failed to fetch users');
        const data = await response.json();
        
        // Assign random departments and ratings to users
        const usersWithData = data.users.map(user => {
          // Generate and store a consistent rating for each user
          if (!userRatings.has(user.id)) {
            userRatings.set(user.id, Math.floor(Math.random() * 5) + 1);
          }
          
          return {
            ...user,
            department: user.department || departments[Math.floor(Math.random() * departments.length)],
            rating: userRatings.get(user.id)
          };
        });

        setUsers(usersWithData);
        setFilteredUsers(usersWithData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [userRatings]);

  useEffect(() => {
    let result = [...users];

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(user => 
        user.firstName.toLowerCase().includes(searchLower) ||
        user.lastName.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.department.toLowerCase().includes(searchLower)
      );
    }

    // Apply department filter
    if (!filters.departments.includes('All Departments')) {
      result = result.filter(user => 
        filters.departments.includes(user.department)
      );
    }

    // Apply rating filter
    if (!filters.ratings.includes('All Ratings')) {
      result = result.filter(user => 
        filters.ratings.includes(user.rating.toString())
      );
    }

    // Apply bookmark filter
    if (showBookmarked) {
      result = result.filter(user => bookmarkedUsers.has(user.id));
    }

    setFilteredUsers(result);
  }, [searchTerm, filters, showBookmarked, bookmarkedUsers, users]);

  const handleBookmarkChange = (userId, isBookmarked) => {
    setBookmarkedUsers(prev => {
      const newSet = new Set(prev);
      if (isBookmarked) {
        newSet.add(userId);
      } else {
        newSet.delete(userId);
      }
      return newSet;
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">HR Dashboard</h1>
          <p className="text-gray-600 mt-1">
            {filteredUsers.length} of {users.length} Employees
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Link
            href="/analytics"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Analytics
          </Link>
          <button
            onClick={() => router.push('/bookmarks')}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition-colors flex items-center gap-2"
          >
            <span className="text-lg">★</span>
            View Bookmarks
          </button>
        </div>
      </div>

      <SearchAndFilter 
        onSearchChange={setSearchTerm}
        onFilterChange={setFilters}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map(user => (
          <UserCard 
            key={user.id} 
            user={user}
            rating={user.rating}
            onBookmarkChange={handleBookmarkChange}
          />
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          No employees match your search criteria
        </div>
      )}
    </div>
  );
}
