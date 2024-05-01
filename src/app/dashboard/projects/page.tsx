import Image from "next/image";

const projects = [
  {
    id: 1,
    name: "Project One",
    href: "#",
    imageSrc: "/srcassetsproject1.jpg",
    imageAlt: "Project One",
    status: "pending",
    // description: "This is project one",
  },
  {
    id: 2,
    name: "Project Two",
    href: "#",
    imageSrc: "/srcassetsproject1.jpg",
    imageAlt: "Project Two",
    status: "pending",
  },
  {
    id: 3,
    name: "Project Three",
    href: "#",
    imageSrc: "/srcassetsproject1.jpg",
    imageAlt: "Project Three",
    status: "pending",
  },
  {
    id: 4,
    name: "Project Four",
    href: "#",
    imageSrc: "/srcassetsproject1.jpg",
    imageAlt: "Project Four",
    status: "pending",
  },
];

export default function Projects() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          My Projects
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {projects.map((project) => (
            <div key={project.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <Image
                  src={project.imageSrc}
                  alt={project.imageAlt}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  className="h-full w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={project.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {project.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{project.status}</p>
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
