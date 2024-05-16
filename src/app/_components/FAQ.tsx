import React from "react";
import Accordion from "./Accordion";

const FAQ = () => {
    return (
        <div>
            <h1 className="flex flex-col text-center w-full sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">FAQ</h1>
        <div className="flex justify-center items-center h-full">
            <div className="p-4 bg-gray-200 rounded-lg w-3/4">
            <Accordion 
                question="Question 1" 
                answer="answer 1" />
            <Accordion 
                question="Question 2" 
                answer="answer 2" />
            <Accordion 
                question="Question 3" 
                answer="answer 3" />
            </div>
        </div>
        </div>
    );
};

export default FAQ;