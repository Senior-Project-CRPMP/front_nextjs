import React from 'react';
import Image from 'next/image';
import images from "../../../public/assets/exportimages";
import Link from 'next/link';

const ViewProfile = () => {
  // Mock data for demonstration purposes
  const user = {
    profileImage: '/path/to/profile-image.jpg',
    name: 'Jenna Stones',
    email: 'jennastones@gmail.com',
    role: 'Researcher',
    bio: 'I am Dr. Sarah Martinez, a passionate and accomplished researcher in the field of neuroscience. With over 15 years of experience, I have dedicated my career to exploring the complex mechanisms underlying brain function and disorders.',
    projects: ['Project 1', 'Project 2', 'Project 3'],
    
  };

  return (
    <main className="profile-page">
      <section className="relative block">
        <div className="absolute top-0 w-full h-full bg-center bg-cover bg-white">
          <span id="blackOverlay" className="w-full h-full absolute opacity-50"></span>
        </div>
        <div
          className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-[70px]"
          style={{ transform: 'translateZ(0px)' }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon className="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
          </svg>
        </div>
      </section>
      <section className="relative py-16 bg-blueGray-200">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.1),0_-4px_6px_-2px_rgba(0,0,0,0.05)] rounded-lg ">
          {/* <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64"> */}
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                  <div className="relative">
                    <Image
                      alt="Profile Picture"
                      src={images.avatar1}
                      className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"
                      width={150}
                      height={150}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                  <div className="py-6 px-3 mt-32 sm:mt-0">
                    <button
                      className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500"
                      type="button"
                    >
                      Connect
                    </button>
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        {user.projects.length}
                      </span>
                      <span className="text-sm text-blueGray-400">Projects</span>
                      <div className="mt-2">
                        <select className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                          {user.projects.map((project, index) => (
                            <option key={index} value={project}>{project}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-12">
                <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 mb-2">
                  {user.name}
                </h3>
                <div className="text-sm leading-normal  text-blueGray-400  ">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                  {user.email}
                </div>
                <div className="mb-2 text-blueGray-600 ">
                  <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                  {user.role}
                </div>
              </div>
              <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                    <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                      {user.bio}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        {/* </div> */}
      </section>
    </main>
  );
};

export default ViewProfile;
