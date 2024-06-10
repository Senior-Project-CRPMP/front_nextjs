'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import images from '../../../../../public/assets/exportimages';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

type User = {
    id:  string;
    firstName: string;
    lastName: string;
    email: string;
    bio: string;
};

const ViewProfile = () => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(false);
  const [projectCount, setProjectCount] = useState(0)
  const params = useParams();
    const userid = params.userId;

  useEffect(() => {
    const fetchUser = async () => {
        console.log(userid)
      if (userid) {
        try {
          const response = await fetch(`${apiBaseUrl}/api/Account/user/${userid}`);
          const data = await response.json();
          setUser(data);
          console.log(data)
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUser();
  }, [userid]);

  useEffect(() => {
    const fetchProjectCount = async () => {
      if (userid) {
        try {
          const response = await fetch(`${apiBaseUrl}/api/UserProject/projectCountByUserId/${userid}`);
          const data = await response.json();
          setProjectCount(data);
          console.log(data)
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProjectCount();
  }, []);


  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (!user) {
    return <p className="text-center">User not found</p>;
  }

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
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.1),0_-4px_6px_-2px_rgba(0,0,0,0.05)] rounded-lg">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                  <div className="relative">
                    <Image
                      alt="Profile Picture"
                      src={images.avatar3}
                      className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"
                      width={150}
                      height={150}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        {projectCount}
                      </span>
                      Projects
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-12">
                <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 mb-2">
                  {user.firstName} {user.lastName}
                </h3>
                <div className="text-sm leading-normal text-blueGray-400">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                  {user.email}
                </div>
                <div className="mb-2 text-blueGray-600">
                  <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                  Addis Ababa, Ethiopia
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
      </section>
    </main>
  );
};

export default ViewProfile;
