import React from "react";
import Image from "next/image";
import Link from "next/link";

function Hero() {
  return (
    <section className="text-gray-600 body-font relative">
      <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
        <Image
          className="absolute inset-0 w-full h-full object-cover object-center"
          src="/assets/Research hero.jpg"
          alt="hero"
          layout="fill"
        />
        <div className="relative text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            Welcome to CRPMP
          </h1>
          <p className="mb-8 leading-relaxed">
            Your Ultimate Research and Project Planning Platform
          </p>
          <div className="flex justify-center">
            <Link href="/signup">
              <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                Get started
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
