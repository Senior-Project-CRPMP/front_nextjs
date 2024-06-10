'use client';

import { useState } from 'react';
import { Search } from 'react-feather';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

interface User {
  id: string;
  firstName: string;
  lastName: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
}

const Home = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('users');
  const [loading, setLoading] = useState(false);

  const fetchUser = '/api/Account/search-users?query='
  const fetchProject = '/api/Project/SingleProjectByTitle/'

  const handleSearch = async () => {
    setLoading(true);
    if(category === 'users'){
    try {
      const response = await fetch(
        `${apiBaseUrl}${fetchUser}${encodeURIComponent(searchTerm)}`
      );
      const data = await response.json();
      setUsers(data);
      console.log(data)
    } catch (error) {
      console.error('Error fetching search results:', error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }else{
    try {
      const response = await fetch(
        `${apiBaseUrl}${fetchProject}${encodeURIComponent(searchTerm)}`
      );
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setProjects([]);
    } finally {
      setLoading(false);
    }

  }
  };

  function handleClick(){
    setCategory
  }

  return (
    <div className="flex flex-col items-center min-h-screen mt-10 space-y-8">
      <h1 className="text-4xl font-semibold">Browse</h1>

      <div className="relative flex items-center space-x-4">
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            category == 'projects'? setProjects([]) : setUsers([])
          }}
          className="px-4 py-2 border border-gray-300 rounded-md"
        >
          <option value="users">Users</option>
          <option value="projects">Projects</option>
        </select>
        <div className="relative flex-grow">
          <Search
            size={20}
            className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 cursor-pointer"
            onClick={handleSearch}
          />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => {setSearchTerm(e.target.value); console.log(e.target.value)}}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
        </div>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : projects.length=== 0 && users.length === 0 ? (
        <p className="text-center">No results found</p>
      ) : (
        <ul className="space-y-4">
          {users.map((user) => (
            <li key={user.id} className="px-4 py-2 border border-gray-300 rounded-md">
              {user.firstName}{user.lastName}
            </li>
          ))}
          {projects.map((project) => (
            <li key={project.id} className="px-4 py-2 border border-gray-300 rounded-md">
              {project.title}<br/>{project.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
