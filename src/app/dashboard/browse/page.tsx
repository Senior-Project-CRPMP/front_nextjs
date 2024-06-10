"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";

type User = {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
};

type Project = {
  id: number;
  title: string;
  description: string;
};

const Browse: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Categories");
  const [searchResults, setSearchResults] = useState<(User | Project)[]>([]);
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const categories: string[] = ["Users", "Projects"];

  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false); // Close the dropdown when a category is selected
  };

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let endpoint = "";
    if (selectedCategory === "Users") {
      endpoint = `${apiBaseUrl}/api/Account/user/name/${searchQuery}`;
    } else if (selectedCategory === "Projects") {
      endpoint = `${apiBaseUrl}/api/Project/SingleProjectByTitle/${searchQuery}`;
    }

    if (endpoint) {
      try {
        const response = await fetch(endpoint);
        const data = await response.json();
        setSearchResults(data);
        console.log(data)
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-lg mx-auto pt-10">
        <h1 className="text-xl font-bold mb-4 text-center">Browse</h1>

        <form onSubmit={handleSearch}>
          <div className="flex relative">
            <button
              id="dropdown-button"
              onClick={toggleDropdown}
              className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
              type="button"
            >
              {selectedCategory}{" "}
              <svg
                className="w-2.5 h-2.5 ms-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            {isDropdownOpen && (
              <div
                id="dropdown"
                className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute mt-10"
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdown-button"
                >
                  {filteredCategories.length > 0 ? (
                    filteredCategories.map((category) => (
                      <li key={category}>
                        <button
                          type="button"
                          onClick={() => handleCategorySelect(category)}
                          className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          {category}
                        </button>
                      </li>
                    ))
                  ) : (
                    <li>
                      <button
                        type="button"
                        className="inline-flex w-full px-4 py-2 text-gray-500 dark:text-gray-400"
                        disabled
                      >
                        No results found
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            )}
            <div className="relative w-full">
              <input
                type="search"
                id="search-dropdown"
                value={searchQuery}
                onChange={handleSearchChange}
                className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                placeholder="Search users or projects..."
                required
              />
              <button
                type="submit"
                className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </div>
          </div>
        </form>

        <div className="mt-8">
          {searchResults.length > 0 && (
            <div className="p-4 bg-gray-100 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-2">Search Results:</h2>
              <ul className="list-disc pl-5 space-y-2">
                {searchResults.map((result) => (
                  <li key={"id" in result ? result.id : (result as Project).id} className="text-gray-700">
                    {"title" in result ? (
                      <>
                        <strong>Project:</strong> {result.title}
                        <p>{result.description}</p>
                      </>
                    ) : (
                      <>
                        <strong>User:</strong> {result.firstName} {result.lastName} ({result.userName})
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Browse;
