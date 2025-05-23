import { useState } from 'react';
import { departmentOptions, ratingOptions } from '@/constants';

export default function SearchAndFilter({ onSearchChange, onFilterChange }) {
  const [search, setSearch] = useState('');
  const [depts, setDepts] = useState(['All Departments']);
  const [stars, setStars] = useState(['All Ratings']);

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearch(val);
    onSearchChange(val);
  };

  const handleDeptChange = (dept) => {
    setDepts(prev => {
      let next;
      
      // handle all depts option
      if (dept === 'All Departments') {
        return ['All Departments'];
      }
      
      // switching from all to specific
      if (prev.includes('All Departments')) {
        next = [dept];
      } else {
        // toggle dept selection
        next = prev.includes(dept) 
          ? prev.filter(d => d !== dept)
          : [...prev, dept];
      }

      // default to all if none picked
      if (next.length === 0) {
        next = ['All Departments'];
      }

      onFilterChange({ departments: next, ratings: stars });
      return next;
    });
  };

  const handleStarChange = (rating) => {
    setStars(prev => {
      let next;
      
      // handle all ratings option
      if (rating === 'All Ratings') {
        return ['All Ratings'];
      }
      
      // switching from all to specific
      if (prev.includes('All Ratings')) {
        next = [rating];
      } else {
        // toggle rating selection
        next = prev.includes(rating)
          ? prev.filter(r => r !== rating)
          : [...prev, rating];
      }

      // default to all if none picked
      if (next.length === 0) {
        next = ['All Ratings'];
      }

      onFilterChange({ departments: depts, ratings: next });
      return next;
    });
  };

  return (
    <div className="space-y-4 mb-6">
      {/* search box */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search by name, email, or department..."
          value={search}
          onChange={handleSearch}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <svg
          className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* filters */}
      <div className="flex flex-wrap gap-4">
        {/* dept filter */}
        <div className="relative group inline-block">
          <button 
            type="button"
            className="px-4 py-2 border rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Departments ({depts.includes('All Departments') ? 'All' : depts.length})
          </button>
          <div className="absolute left-0 mt-2 w-48 bg-white border shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
            {departmentOptions.map(dept => (
              <label
                key={dept}
                className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={depts.includes(dept)}
                  onChange={() => handleDeptChange(dept)}
                  className="mr-2"
                />
                {dept}
              </label>
            ))}
          </div>
        </div>

        {/* rating filter */}
        <div className="relative group inline-block">
          <button 
            type="button"
            className="px-4 py-2 border rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Ratings ({stars.includes('All Ratings') ? 'All' : stars.length})
          </button>
          <div className="absolute left-0 mt-2 w-48 bg-white border shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
            {ratingOptions.map(rating => (
              <label
                key={rating}
                className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={stars.includes(rating)}
                  onChange={() => handleStarChange(rating)}
                  className="mr-2"
                />
                {rating === 'All Ratings' ? rating : `${rating} Stars`}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 