import React from "react";
import Image from "next/image";
import ProfileDropdown from "./profile_dropdown";
import images from "../../../public/assets/exportimages";

const Project_Header: React.FC = () => {
  return (
    <header className="text-white bg-blue-950 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
        <div className="flex items-center">
          <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
            <Image
              src={images.logo1}
              alt="Profile"
              width={80}
              height={80}
              style={{
                filter:
                  "brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)",
              }}
              className="object-cover"
            />
            <span className="text-xl text-white">CRPMP</span>
          </a>
        </div>
        <div className="flex items-center space-x-4">
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
};

export default Project_Header;
