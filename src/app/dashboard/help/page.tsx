import React from "react";

function Help() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-lg mx-auto pt-10">
        {/* Header */}
        <h2 className="text-3xl font-semibold text-center">Help Center</h2>
        <div className="p-6 mt-6 mb-12">
          <div className="flex items-center border rounded-full p-2">
            {/* Search Icon */}
            <div className="w-[10%] bg-red-600"></div>
            <input
              type="text"
              name="search"
              className="w-full h-4/5 border-0 focus:border-0 focus:outline-none focus:ring-0"
              placeholder="search"
            />
            <button
              type="submit"
              className="p-2.5 text-sm font-medium text-white bg-blue-700 rounded-full border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0.5 bg-slate-200 [&>*]:h-24 [&>*]:px-3 [&>*]:bg-white [&>*]:flex [&>*]:items-center [&>*]:justify-center [&>*]:cursor-pointer [&>*:hover]:scale-105 [&>*:hover]:shadow-sm [&>*:hover]:shadow-slate-800/80">
          <div>
            <h2>Billing and Membership</h2>
          </div>
          <div>
            <h2>Managing and Organizing</h2>
          </div>
          <div>
            <h2>Uploading</h2>
          </div>
          <div>
            <h2>Uploading</h2>
          </div>
          <div>
            <h2>Video Enterprise</h2>
          </div>
          <div>
            <h2>Creators</h2>
          </div>
          <div>
            <h2>Enterprise</h2>
          </div>
          <div>
            <h2>Features</h2>
          </div>
          <div>
            <h2>Sales</h2>
          </div>
          <div>
            <h2>Embedding and Sharing</h2>
          </div>
          <div>
            <h2>FAQs</h2>
          </div>
          <div>
            <h2>Developers</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Help;
