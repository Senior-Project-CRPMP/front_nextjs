import React, { forwardRef } from 'react';

const Feature = forwardRef((props, ref) => {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="text-center mb-20">
          <div className="text-center mb-20"  ref={ref} id="features">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">
              Features
            </h1>
            </div>
            <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s">
            Streamline your project workflows, stay on top of progress and deadlines, 
            gain valuable insights, customize data collection, generate professional documents, 
            and facilitate effective team collaboration 
            all within our cutting-edge research and project planning platform.
            </p>
            <div className="flex mt-6 justify-center">
              <div className="w-16 h-1 rounded-full bg-indigo-500 inline-flex"></div>
            </div>
          </div>
          <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
            <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
              <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="3em"
                  height="3em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#7077db"
                    d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5v2H5v14h14v-5z"
                  />
                  <path fill="#7077db" d="M21 7h-4V3h-2v4h-4v2h4v4h2V9h4z" />
                </svg>
              </div>
              <div className="flex-grow">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                  Project Creation and Management
                </h2>
                <p className="leading-relaxed text-base">
                  Effortlessly initiate and oversee projects with intuitive
                  management tools.
                </p>
               
              </div>
            </div>
            <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
              <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="3em"
                  height="3em"
                  viewBox="0 0 1024 1024"
                >
                  <path
                    fill="#7077db"
                    fill-opacity="0.15"
                    d="M768 352c0 4.4-3.6 8-8 8h-56c-4.4 0-8-3.6-8-8v-56H548v56c0 4.4-3.6 8-8 8h-56c-4.4 0-8-3.6-8-8v-56H328v56c0 4.4-3.6 8-8 8h-56c-4.4 0-8-3.6-8-8v-56H136v496h752V296H768zM424 688c0 4.4-3.6 8-8 8H232c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h184c4.4 0 8 3.6 8 8zm0-136c0 4.4-3.6 8-8 8H232c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h184c4.4 0 8 3.6 8 8zm374.4-91.2l-165 228.7a15.9 15.9 0 0 1-25.8 0L493.5 531.3c-3.8-5.3 0-12.7 6.5-12.7h54.9c5.1 0 9.9 2.4 12.9 6.6l52.8 73.1l103.6-143.7c3-4.1 7.8-6.6 12.8-6.5h54.9c6.5 0 10.3 7.4 6.5 12.7"
                  />
                  <path
                    fill="#7077db"
                    d="M724.2 454.6L620.6 598.3l-52.8-73.1c-3-4.2-7.8-6.6-12.9-6.6H500c-6.5 0-10.3 7.4-6.5 12.7l114.1 158.2a15.9 15.9 0 0 0 25.8 0l165-228.7c3.8-5.3 0-12.7-6.5-12.7H737c-5-.1-9.8 2.4-12.8 6.5M416 496H232c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8"
                  />
                  <path
                    fill="#7077db"
                    d="M928 224H768v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56H548v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56H328v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56H96c-17.7 0-32 14.3-32 32v576c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V256c0-17.7-14.3-32-32-32m-40 568H136V296h120v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56h148v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56h148v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56h120z"
                  />
                  <path
                    fill="#7077db"
                    d="M416 632H232c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8"
                  />
                </svg>
              </div>
              <div className="flex-grow">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                  Project Tracking and Scheduling
                </h2>
                <p className="leading-relaxed text-base">
                  Stay on course and meet deadlines with advanced tracking and
                  scheduling features.
                </p>
               
              </div>
            </div>
            <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
              <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="3em"
                  height="3em"
                  viewBox="0 0 48 48"
                >
                  <g fill="none" stroke="#7077db" stroke-width="4">
                    <path stroke-linejoin="round" d="M44 5H4v12h40z" />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m4 41.03l12.176-12.3l6.579 6.3L30.798 27l4.48 4.368"
                    />
                    <path
                      stroke-linecap="round"
                      d="M44 16.172v26m-40-26v14M13.016 43H44M17 11h21m-28-.003h1"
                    />
                  </g>
                </svg>
              </div>
              <div className="flex-grow">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                  Dashboard and Analysis
                </h2>
                <p className="leading-relaxed text-base">
                  Gain invaluable insights at a glance with customizable
                  dashboards and in-depth analysis tools.
                </p>
               
              </div>
            </div>
          </div>
        </div>
        {/* Container for the second round of divs */}
        <div className="container px-5 py-12 mx-auto">
          <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
            {/* Repeat the structure for each div */}
            <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
              <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="3em"
                  height="3em"
                  viewBox="0 0 36 36"
                >
                  <path
                    fill="#7077db"
                    d="M21 12H7a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1M8 10h12V7.94H8Z"
                    className="clr-i-outline clr-i-outline-path-1"
                  />
                  <path
                    fill="#7077db"
                    d="M21 14.08H7a1 1 0 0 0-1 1V19a1 1 0 0 0 1 1h11.36L22 16.3v-1.22a1 1 0 0 0-1-1M20 18H8v-2h12Z"
                    className="clr-i-outline clr-i-outline-path-2"
                  />
                  <path
                    fill="#7077db"
                    d="M11.06 31.51v-.06l.32-1.39H4V4h20v10.25l2-1.89V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v28a1 1 0 0 0 1 1h8a3.44 3.44 0 0 1 .06-.49"
                    className="clr-i-outline clr-i-outline-path-3"
                  />
                  <path
                    fill="#7077db"
                    d="m22 19.17l-.78.79a1 1 0 0 0 .78-.79"
                    className="clr-i-outline clr-i-outline-path-4"
                  />
                  <path
                    fill="#7077db"
                    d="M6 26.94a1 1 0 0 0 1 1h4.84l.3-1.3l.13-.55v-.05H8V24h6.34l2-2H7a1 1 0 0 0-1 1Z"
                    className="clr-i-outline clr-i-outline-path-5"
                  />
                  <path
                    fill="#7077db"
                    d="m33.49 16.67l-3.37-3.37a1.61 1.61 0 0 0-2.28 0L14.13 27.09L13 31.9a1.61 1.61 0 0 0 1.26 1.9a1.55 1.55 0 0 0 .31 0a1.15 1.15 0 0 0 .37 0l4.85-1.07L33.49 19a1.6 1.6 0 0 0 0-2.27ZM18.77 30.91l-3.66.81l.89-3.63L26.28 17.7l2.82 2.82Zm11.46-11.52l-2.82-2.82L29 15l2.84 2.84Z"
                    className="clr-i-outline clr-i-outline-path-6"
                  />
                  <path fill="none" d="M0 0h36v36H0z" />
                </svg>
              </div>
              <div className="flex-grow">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                  Customizable Data Gathering Form Builder
                </h2>
                <p className="leading-relaxed text-base">
                  Craft bespoke data collection forms suited to your projects
                  unique requirements.
                </p>
               
              </div>
            </div>

            <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
              <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="3em"
                  height="3em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#7077db"
                    fill-rule="evenodd"
                    d="M14.25 2.5a.25.25 0 0 0-.25-.25H7A2.75 2.75 0 0 0 4.25 5v14A2.75 2.75 0 0 0 7 21.75h10A2.75 2.75 0 0 0 19.75 19V9.147a.25.25 0 0 0-.25-.25H15a.75.75 0 0 1-.75-.75zm.75 9.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1 0-1.5zm0 4a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1 0-1.5z"
                    clip-rule="evenodd"
                  />
                  <path
                    fill="#7077db"
                    d="M15.75 2.824c0-.184.193-.301.336-.186c.121.098.23.212.323.342l3.013 4.197c.068.096-.006.22-.124.22H16a.25.25 0 0 1-.25-.25z"
                  />
                </svg>
              </div>
              <div className="flex-grow">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                  Document Generation
                </h2>
                <p className="leading-relaxed text-base">
                  Generate polished reports and documents effortlessly with our
                  streamlined document generation tools.
                </p>
                
              </div>
            </div>

            <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
              <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="3em"
                  height="3em"
                  viewBox="0 0 32 32"
                >
                  <path
                    fill="#7077db"
                    d="M6 21v-1H4v1a7 7 0 0 0 7 7h3v-2h-3a5 5 0 0 1-5-5m18-10v1h2v-1a7 7 0 0 0-7-7h-3v2h3a5 5 0 0 1 5 5m-13 0H5a3 3 0 0 0-3 3v2h2v-2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2h2v-2a3 3 0 0 0-3-3m-3-1a4 4 0 1 0-4-4a4 4 0 0 0 4 4m0-6a2 2 0 1 1-2 2a2 2 0 0 1 2-2m19 21h-6a3 3 0 0 0-3 3v2h2v-2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2h2v-2a3 3 0 0 0-3-3m-7-5a4 4 0 1 0 4-4a4 4 0 0 0-4 4m6 0a2 2 0 1 1-2-2a2 2 0 0 1 2 2"
                  />
                </svg>
              </div>
              <div className="flex-grow">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                  Collaboration Tools
                </h2>
                <p className="leading-relaxed text-base">
                  Foster seamless collaboration among research teams with
                  integrated communication and sharing features.
                </p>
               
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

export default Feature;
