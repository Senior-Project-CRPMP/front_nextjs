'use client'
import React, { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import images from "../../../public/assets/exportimages";
import Content from './content';
import Feature from './feature';
import Hero from './hero';
const Footer = () => {
  const featureRef = useRef(null);
  const aboutUsRef = useRef(null);
  const homeRef = useRef(null);
  const [showContent, setShowContent] = useState(false);
  const [showFeature, setShowFeature] = useState(false);
  const [showHome, setShowHome] = useState(false);
    const handleNavigateToFeature = () => {
    const featureSection = document.getElementById('features');
    if (featureSection) {
      featureSection.scrollIntoView({ behavior: 'smooth' });
    }
    
  };
  const handleNavigateToAboutUs = () => {
    const aboutUsSection = document.getElementById('about-us');
    if (aboutUsSection) {
      aboutUsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const handleNavigateToHome = () => {
    const aboutUsSection = document.getElementById('home');
    if (aboutUsSection) {
      aboutUsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <footer className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
            <Image
              src={images.logo1}
              alt="Profile"
              width={80}
              height={80}
              style={{ filter: "brightness(0) saturate(100%)" }}
              className="object-cover"
            />
            <span className="text-xl">CRPMP</span>
          </a>
          <p className="mt-2 text-sm text-gray-500">
            Your Ultimate Research and Project Planning Platform{" "}
          </p>
        </div>
        <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              Links
            </h2>
            <nav className="list-none mb-10">
              <li>
                <a href='#' onClick = {handleNavigateToHome} className="text-gray-600 hover:text-gray-800">Home</a>
              </li>
              <li>
                <a href='#' className="text-gray-600 hover:text-gray-800" onClick={handleNavigateToAboutUs}>About Us</a>
              </li>
              <li>
                <a href = "#" className="text-gray-600 hover:text-gray-800" onClick={handleNavigateToFeature}>Features</a>
              </li>
              {showContent && <Content />}
              {showFeature && <Feature />}
              {showHome && <Hero />}
              
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              Contact Us
            </h2>
            <nav className="list-none mb-10">
            <ul className="space-y-2">
            <li>
              <p className="text-gray-600">Phone: +2519-20578620</p>
            </li>
            <li className="flex items-center">
              <p className="text-gray-600 mr-2">Email:</p>
              <p className="text-gray-600">support@crpmp.com</p>
            </li>
            <li>
              <p className="text-gray-600">Address: AASTU, Addis Ababa Ethiopia</p>
            </li>
          </ul>
            </nav>
          </div>
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            © 2024 CRPMP —
            <a
              href="https://twitter.com/knyttneve"
              rel="noopener noreferrer"
              className="text-gray-600 ml-1"
              target="_blank"
            >
              @aastu
            </a>
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
            <a className="text-gray-500">
              <svg
                fill="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a className="ml-3 text-gray-500">
              <svg
                fill="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a className="ml-3 text-gray-500">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            <a className="ml-3 text-gray-500">
              <svg
                fill="currentColor"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="0"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="none"
                  d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                ></path>
                <circle cx="4" cy="4" r="2" stroke="none"></circle>
              </svg>
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
