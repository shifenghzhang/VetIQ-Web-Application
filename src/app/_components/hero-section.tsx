import React from "react";
import image from "next/image";
import { useRouter } from "next/router";

const HeroSection = () => {
  const handleCTAClick = () => {
    document.getElementById('CTA')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleArticleAreaClick = () => {
    document.getElementById('article-area')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
    className="text-gray-600 body-font">
      <div className="container mx-auto flex px-5 mb-24 mt-12 md:flex-row flex-col items-center">
        <div
          className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center"
        >
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            Astute vets.
            <br className="hidden lg:inline-block" />
            Happy pets.
          </h1>
          <p className="mb-8 leading-relaxed">
            VetIQ was created to make life simpler for vets and practice managers. We do this by analyzing information you collect in your practice to identify opportunities to save money, improve visibility of gaps in services and show the practice how to optimize billing and customer engagement.
          </p>
          <div className="flex justify-center">
            <button
              className="inline-flex text-black bg-customSkyBlue bg-opacity-70 border-0 py-2 px-6 focus:outline-none  hover:bg-opacity-100 rounded text-lg"
              onClick={handleArticleAreaClick}
            >
              Learn More
            </button>
            <button
              className="ml-4 inline-flex text-white bg-customDarkBlue border-0 py-2 px-6 focus:outline-none hover:bg-opacity-70 rounded text-lg"
              onClick={handleCTAClick}
            >
              Book a Demo
            </button>
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <img alt="hero" src="images\iStock-1224227548.jpg" />
        </div>
      </div>
    </section>
  );
};


export default HeroSection;