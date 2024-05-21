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
                    <Accordion
                        question="Question 4"
                        answer="answer 4" />
                    <Accordion
                        question="Question 5"
                        answer="answer 5" />
                    <Accordion
                        question="Question 6"
                        answer="answer 6" />
                    <Accordion
                        question="Question 7"
                        answer="answer 7" />
                    <Accordion
                        question="Question 8"
                        answer="answer 8" />
                    <Accordion
                        question="Question 9"
                        answer="answer 9" />
                </div>
            </div>
        </div>
    );
};

export default FAQ;