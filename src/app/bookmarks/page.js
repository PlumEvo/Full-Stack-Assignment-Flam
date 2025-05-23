'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import UserCard from '@/components/UserCard';

export default function BookmarksPage() {
  const [bookmarkedUsers, setBookmarkedUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarkedUsers = async () => {
      try {
        // Get bookmarked user IDs from localStorage
        const bookmarkedIds = new Set(JSON.parse(localStorage.getItem('bookmarkedUsers') || '[]'));
        
        if (bookmarkedIds.size === 0) {
          setBookmarkedUsers([]);
          setLoading(false);
          return;
        }

        // Fetch all bookmarked users
        const response = await fetch('https://dummyjson.com/users?limit=100');
        if (!response.ok) throw new Error('Failed to fetch users');
        const data = await response.json();
        
        // Filter only bookmarked users
        const bookmarked = data.users.filter(user => bookmarkedIds.has(user.id));
        
        // Add ratings for each user
        const usersWithRatings = bookmarked.map(user => ({
          ...user,
          rating: Math.floor(Math.random() * 5) + 1
        }));
        
        setBookmarkedUsers(usersWithRatings);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarkedUsers();
  }, []);

  const handleBookmarkChange = (userId, isBookmarked) => {
    // Update localStorage
    const bookmarkedIds = new Set(JSON.parse(localStorage.getItem('bookmarkedUsers') || '[]'));
    if (isBookmarked) {
      bookmarkedIds.add(userId);
    } else {
      bookmarkedIds.delete(userId);
      // Remove from current view
      setBookmarkedUsers(prev => prev.filter(user => user.id !== userId));
    }
    localStorage.setItem('bookmarkedUsers', JSON.stringify([...bookmarkedIds]));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with back button */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link 
            href="/" 
            className="inline-flex items-center text-blue-500 hover:text-blue-600"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </Link>
          
        </div>
      </div>
      <h1 className="text-3xl font-bold mb-4">Bookmarked Employees</h1>
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : bookmarkedUsers.length === 0 ? (
        <div className="text-center py-12">
          <span className="text-6xl mb-4 block">★</span>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">No Bookmarked Employees</h2>
          <p className="text-gray-500 mb-4">You haven't bookmarked any employees yet.</p>
          <Link 
            href="/"
            className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Return to Dashboard
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarkedUsers.map(user => (
            <UserCard 
              key={user.id} 
              user={user}
              rating={user.rating}
              onBookmarkChange={handleBookmarkChange}
            />
          ))}
        </div>
      )}
    </div>
  );
} 