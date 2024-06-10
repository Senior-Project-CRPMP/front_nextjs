'use client'
import Image from "next/image";
import Link from "next/link";
import images from "../../../public/assets/exportimages";
import HeroImage from '../../../public/assets/HeroImage.jpg';
import Content from "./content";
import Feature from "./feature";
import React, { useState, useEffect, useRef, forwardRef} from 'react';
import { useRouter } from 'next/router';


const Hero = forwardRef((props, ref)=> {
  const [headerBackground, setHeaderBackground] = useState('transparent');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHeaderBackground('#0C1A32'); // Change the header background color as desired
      } else {
        setHeaderBackground('transparent');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const featureRef = useRef(null);
  const aboutUsRef = useRef(null);
  const [showContent, setShowContent] = useState(false);
  const [showFeature, setShowFeature] = useState(false);
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
  const divRef = useRef<HTMLDivElement>(null);
  return (
    <div id="home" ref={divRef}>
      <header
        className={`fixed top-0 left-0 right-0 z-10 transition-colors duration-300 ${
          headerBackground === 'transparent'
            ? 'bg-transparent'
            : 'bg-indigo-500 shadow-md'
        }`}
      >
       
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
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
          <span className=" text-xl text-white">CRPMP</span>
        </a>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <a  href="#" className="mr-5 text-white hover:text-gray-600 " onClick={handleNavigateToAboutUs}>About Us</a>
          <a  href="#" className="mr-5  text-white hover:text-gray-600" onClick={handleNavigateToFeature}>Features</a>
          {showContent && <Content />}
          {showFeature && <Feature />}
        </nav>
        <Link href="/login">
            <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-indigo-600 rounded text-base text-black mt-4 md:mt-0">
              Login
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-1"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
        </Link>
      </div>
      </header>

      <section className="hero-section relative h-screen bg-cover bg-center" style={{ backgroundImage: `url(${HeroImage.src})` }}>
      <div className="absolute inset-0 bg-gradient-to-r from-[#000000]/70 to-[#000000]/20"></div>
      <div className="container mx-auto h-full flex flex-col justify-center items-center text-white">
        <h1 className="text-4xl font-extralight md:text-6xl tracking-widest  text-white mb-4 drop-shadow-lg">
          Welcome
        </h1>
        <h1 className= "mb-4 font-light italic  text-white tracing-widest  text-5xl">Comprehensive Research And Project Management Platform </h1>

        <p className="text-lg md:text-xl tracking-widest text-white mb-8 drop-shadow-md">
          Your Ultimate Research and Project Planning Platform
        </p>
        <Link href='/signup'>
        <div className="bg-indigo-500 hover:bg-indigo-600 text-white py-3 px-8 rounded-full text-lg shadow-lg transform transition hover:scale-105">
          Get Started
        </div>
        </Link>
      </div>
      <svg
        className="absolute bottom-0 left-0 w-full h-30"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#ffffff"
          fillOpacity="1"
          d="M0,288L48,266.7C96,245,192,203,288,181.3C384,160,480,160,576,181.3C672,203,768,245,864,250.7C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
      <svg className="absolute bottom-0 right-0 w-full h-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
        <circle cx="10" cy="50" r="51" fill="red" />
        <circle cx="150" cy="50" r="30" fill="blue" />
        <circle cx="300" cy="150" r="20" fill="green" />
        <circle cx="500" cy="150" r="100" fill="grey" />
      </svg>
      <svg
        className="absolute bottom-0 left-0 w-full h-30"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#ffffff"
          fillOpacity="1"
          d="M0,288L48,266.7C96,245,192,203,288,181.3C384,160,480,160,576,181.3C672,203,768,245,864,250.7C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
      <svg className="absolute bottom-0 right-0 w-full h-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
        <circle cx="10" cy="50" r="51" fill="red" />
        <circle cx="150" cy="50" r="30" fill="blue" />
        <circle cx="300" cy="150" r="20" fill="green" />
        <circle cx="500" cy="150" r="100" fill="grey" />
      </svg>
    </section>

      </div>
   

   
  );
});
export default Hero;