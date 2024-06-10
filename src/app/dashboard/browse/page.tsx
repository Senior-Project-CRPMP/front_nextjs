'use client'

import { useState } from 'react';
import { Search } from 'react-feather';

const users = [
  { name: 'User 1' },
  { name: 'User 2' },
  { name: 'User 3' },
];

const projects = [
  { name: 'Project 1' },
  { name: 'Project 2' },
  { name: 'Project 3' },
];

const Home = () => {
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('users');

  const handleSearch = () => {
    const data = category === 'users' ? users : projects;
    const filteredResults = data.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // setResults(filteredResults);
  };

  return (
    <div className="flex flex-col items-center min-h-screen mt-10 space-y-8">
      <h1 className="text-4xl font-semibold">Browse</h1>


              <div className="relative flex items-center space-x-4">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md"
                >
                  <option value="users">Users</option>
                  <option value="projects">Projects</option>
                </select>
                <div className="relative flex-grow">
                  <Search size={20} className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" onClick={handleSearch} />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full"
                  />
                </div>
              </div>


      {results.length === 0 ? (
        <p className="text-center">No results found</p>
      ) : (
        <ul className="space-y-4">
          {results.map((result, index) => (
            <li key={index} className="px-4 py-2 border border-gray-300 rounded-md">
              {/* {result.name} */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
