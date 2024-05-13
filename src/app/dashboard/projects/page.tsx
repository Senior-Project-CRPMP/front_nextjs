'use client'
import React, {useState, useEffect} from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";
interface Project {
  id: number;
  title: string;
  status: string;
  // Add other properties as needed
}
// const projects = [
//   {
//     id: 1,
//     name: "Project One",
//     href: "#",
//     imageSrc: "/srcassetsproject1.jpg",
//     imageAlt: "Project One",
//     status: "pending",
//     // description: "This is project one",
//   },
//   {
//     id: 2,
//     name: "Project Two",
//     href: "#",
//     imageSrc: "/srcassetsproject1.jpg",
//     imageAlt: "Project Two",
//     status: "pending",
//   },
//   {
//     id: 3,
//     name: "Project Three",
//     href: "#",
//     imageSrc: "/srcassetsproject1.jpg",
//     imageAlt: "Project Three",
//     status: "pending",
//   },
//   {
//     id: 4,
//     name: "Project Four",
//     href: "#",
//     imageSrc: "/srcassetsproject1.jpg",
//     imageAlt: "Project Four",
//     status: "pending",
//   },
// ];

export default function Projects() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchCard = async () => {
      const res = await fetch(
        `https://localhost:7174/api/Project/EveryProject`
      );
      const data = await res.json();
      setProjects(data);
      console.log("Did it work?");
    };
    fetchCard().catch((error) => console.error(error));
  }, []);

  return (
    
    <div className="bg-white h-full">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          My Projects
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 " >
          {projects.map((p) => (
            <div key={p.id} onClick={() => router.push('/project_dashboard')} className="group relative bg-blue-300 rounded-md">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md  lg:aspect-none group-hover:opacity-75 lg:h-80">
                {/* <Image
                  src={project.imageSrc}
                  alt={project.imageAlt}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  className="h-full w-full"
                /> */}
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-black p-2">
                    {/* <a href={project.href}> */}
                    <span aria-hidden="true" className="absolute inset-0" />
                    {p.title}
                    {/* </a> */}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 p-2">{p.status}</p>
                </div>
                {/* <p className="text-sm font-medium text-gray-900">
                  {project.description}
                </p> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
