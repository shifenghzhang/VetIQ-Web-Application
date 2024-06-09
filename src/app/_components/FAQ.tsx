import React from "react";
import Accordion from "./Accordion";

const FAQ = () => {
    return (
        <div>
            <h1 className="flex flex-col text-center w-full sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">FAQ</h1>
            <div className="flex justify-center items-center h-full">
                <div className="p-4 bg-gray-200 rounded-lg w-3/4">
                    <Accordion
                        question="What is the mission of Curious Cat?"
                        answer="At Curious Cat, our mission is to help veterinarians enhance their practices and provide the best possible care for their patients. By freeing up practice time from unnecessary tasks, we allow vets to focus more on their patients." />
                    <Accordion
                        question="What services does VetIQ offer?"
                        answer="VetIQ, our software-as-a-service platform, offers client engagement, actionable insights, automated workflows, and clinical service support. With VetIQ, veterinarians can elevate their practice to the next level and grow their business." />
                    <Accordion
                        question="How does VetIQ help veterinary practices?"
                        answer="VetIQ streamlines workflows, engages clients more effectively, and provides insights that help vets make informed decisions. This leads to improved efficiency and better care for patients." />
                    <Accordion
                        question="What is the purpose of Curious Cat?"
                        answer="Our purpose is to improve the way vets operate their practices. We believe that technology can help vets provide better care to their patients while also growing their businesses. We aim to reduce the stress of managing a busy practice." />
                    <Accordion
                        question="How does Curious Cat support team collaboration?"
                        answer="We understand the importance of teamwork in a veterinary practice. Our platform supports team collaboration by facilitating effective communication and streamlined workflows during team meetings and day-to-day operations." />
                    <Accordion
                        question="What is the story behind Curious Cat?"
                        answer="Curious Cat was founded by an animal lover with a passion for helping vets succeed. Our founder has always been surrounded by animals and currently cares for a dog, a cat, chickens, goats, and bees. This passion for animals inspired the creation of a platform designed to help vets provide better care and grow their businesses." />
                    <Accordion
                        question="Who makes up the Curious Cat team?"
                        answer="Our team comprises experienced technology experts dedicated to helping veterinarians succeed. We understand the challenges faced by healthcare professionals and are committed to providing solutions that make their lives easier." />
                </div>
            </div>
        </div>
    );
};

export default FAQ;