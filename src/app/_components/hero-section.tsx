import React from "react";
import image from "next/image";

const HeroSection = () => {
    return (
      <section className="text-gray-600 body-font">
      <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
      <img alt="hero" src="images\iStock-1224227548.jpg"></img>
        <div className="text-center lg:w-2/3 w-full">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Astute vets. Happy pets.</h1>
          <p className="mb-8 leading-relaxed">VetIQ was created to make life simpler for vets and practice managers. We do this by analysing information you collect in your practice to identify opportunities to save money, improve visibility of gaps in services and show the practice how to optimise billing and customer engagement. </p>
          <div className="flex justify-center">
            <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Learn More</button>
            <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Book a Demo</button>
          </div>
        </div>
      </div>
    </section>
    )
}

export default HeroSection