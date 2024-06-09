import React, { useState } from 'react';
import Modal from 'react-modal';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface CustomModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSubmit: (answers: string[][]) => void;
}

const CustomModal: React.FC<CustomModalProps> = ({ isOpen, onRequestClose, onSubmit }) => {
  const [answers, setAnswers] = useState<string[][]>([[], [], []]); // Assuming 3 questions

  const handleAnswerChange = (index: number, value: string) => {
    setAnswers(prevAnswers => {
      const newAnswers = [...prevAnswers];
      const currentAnswers = newAnswers[index] ?? [];
      
      if (currentAnswers.includes(value)) {
        newAnswers[index] = currentAnswers.filter((answer) => answer !== value);
      } else {
        newAnswers[index] = [...currentAnswers, value];
      }
      
      return newAnswers;
    });
  };

  const handleSubmit = () => {
    onSubmit(answers);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Question Modal"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Set background opacity here
        },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          border: 'none', // Remove the default border
          padding: '0',
        },
      }}
      className="fixed bg-white shadow-md flex flex-col justify-center items-center rounded-lg p-8 max-w-md w-full outline-none" // Add outline-none class
    >
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl px-2 focus:outline-none"
        onClick={onRequestClose}
      >
        &times;
      </button>
      <h2 className="text-2xl mb-4 mt-10 font-semibold text-white bg-customDarkBlue p-4 rounded-md">We have some questions for you!</h2>
      <Carousel showArrows={false} showThumbs={false} showStatus={true} emulateTouch={true} swipeScrollTolerance={50}
        renderIndicator={(onClickHandler: (e: React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLLIElement>) => void, isSelected: boolean, index: number) => (
          <li
            style={{
              backgroundColor: isSelected ? '#000' : '#ccc',
              width: '30px',
              height: '4px',
              borderRadius: '2px',
              margin: '0 4px',
              cursor: 'pointer',
              display: 'inline-block',
            }}
            onClick={onClickHandler}
            onKeyDown={onClickHandler}
            key={index}
            role="button"
            tabIndex={0}
            aria-label={`Slide ${index + 1}`}
          />
        )}
      >
        <div className="text-left px-6 mt-2 text-sm">
          <p className="mb-4 font-semibold">What types of animals does your practice primarily serve? (Select all that apply)</p>
          <div className="space-y-2">
            <label className="block">
              <input
                type="checkbox"
                name="question1"
                value="Small companion animals"
                checked={answers[0]?.includes('Small companion animals') ?? false}
                onChange={(e) => handleAnswerChange(0, e.target.value)}
                className="mr-2"
              />
              Small companion animals
            </label>
            <label className="block">
              <input
                type="checkbox"
                name="question1"
                value="Large animals"
                checked={answers[0]?.includes('Large animals') ?? false}
                onChange={(e) => handleAnswerChange(0, e.target.value)}
                className="mr-2"
              />
              Large animals
            </label>
            <label className="block">
              <input
                type="checkbox"
                name="question1"
                value="Production animals"
                checked={answers[0]?.includes('Production animals') ?? false}
                onChange={(e) => handleAnswerChange(0, e.target.value)}
                className="mr-2"
              />
              Production animals
            </label>
            <label className="block">
              <input
                type="checkbox"
                name="question1"
                value="Exotic pets"
                checked={answers[0]?.includes('Exotic pets') ?? false}
                onChange={(e) => handleAnswerChange(0, e.target.value)}
                className="mr-2"
              />
              Exotic pets
            </label>
          </div>
        </div>
        <div className="text-left px-6 mt-2 text-sm">
          <p className="mb-4 font-semibold">Which of the following technologies do you currently use in your practice? (Select all that apply)</p>
          <div className="space-y-2">
            <label className="block">
              <input
                type="checkbox"
                name="question2"
                value="Business Intelligence tools"
                checked={answers[1]?.includes('Business Intelligence tools') ?? false}
                onChange={(e) => handleAnswerChange(1, e.target.value)}
                className="mr-2"
              />
              Business Intelligence tools
            </label>
            <label className="block">
              <input
                type="checkbox"
                name="question2"
                value="Management Software"
                checked={answers[1]?.includes('Management Software') ?? false}
                onChange={(e) => handleAnswerChange(1, e.target.value)}
                className="mr-2"
              />
              Management Software
            </label>
            <label className="block">
              <input
                type="checkbox"
                name="question2"
                value="Client communication tools"
                checked={answers[1]?.includes('Client communication tools') ?? false}
                onChange={(e) => handleAnswerChange(1, e.target.value)}
                className="mr-2"
              />
              Client communication tools
            </label>
            <label className="block">
              <input
                type="checkbox"
                name="question2"
                value="Telemedicine"
                checked={answers[1]?.includes('Telemedicine') ?? false}
                onChange={(e) => handleAnswerChange(1, e.target.value)}
                className="mr-2"
              />
              Telemedicine
            </label>
          </div>
        </div>
        <div className="text-left px-6 mt-2 text-sm">
          <p className="mb-4 font-semibold">How frequently do you use data and analytics to make decisions in your practice?</p>
          <div className="space-y-2">
            <label className="block">
              <input
                type="checkbox"
                name="question3"
                value="Daily"
                checked={answers[2]?.includes('Daily') ?? false}
                onChange={(e) => handleAnswerChange(2, e.target.value)}
                className="mr-2"
              />
              Daily
            </label>
            <label className="block">
              <input
                type="checkbox"
                name="question3"
                value="Weekly"
                checked={answers[2]?.includes('Weekly') ?? false}
                onChange={(e) => handleAnswerChange(2, e.target.value)}
                className="mr-2"
              />
              Weekly
            </label>
            <label className="block">
              <input
                type="checkbox"
                name="question3"
                value="Monthly"
                checked={answers[2]?.includes('Monthly') ?? false}
                onChange={(e) => handleAnswerChange(2, e.target.value)}
                className="mr-2"
              />
              Monthly
            </label>
            <label className="block">
              <input
                type="checkbox"
                name="question3"
                value="Rarely"
                checked={answers[2]?.includes('Rarely') ?? false}
                onChange={(e) => handleAnswerChange(2, e.target.value)}
                className="mr-2"
              />
              Rarely
            </label>
            <label className="block">
              <input
                type="checkbox"
                name="question3"
                value="Never"
                checked={answers[2]?.includes('Never') ?? false}
                onChange={(e) => handleAnswerChange(2, e.target.value)}
                className="mr-2"
              />
              Never
            </label>
          </div>
          <button
            onClick={handleSubmit}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </Carousel>
    </Modal>
  );
};

export default CustomModal;
