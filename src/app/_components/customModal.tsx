import React, { useState } from 'react';
import Modal from 'react-modal';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface CustomModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSubmit: (answers: (string | string[])[]) => void;
}

const CustomModal: React.FC<CustomModalProps> = ({ isOpen, onRequestClose, onSubmit }) => {
  const [answers, setAnswers] = useState<(string | string[])[]>(['', '', '', '']);

  const handleAnswerChange = (index: number, value: string) => {
    setAnswers(prevAnswers => {
      const newAnswers = [...prevAnswers];
      if (index === 2 || index === 3) {
        // For the radio button questions, store the single selected value
        newAnswers[index] = value;
      } else {
        const currentAnswers = newAnswers[index] as string[];
        if (currentAnswers.includes(value)) {
          newAnswers[index] = currentAnswers.filter((answer) => answer !== value);
        } else {
          newAnswers[index] = [...currentAnswers, value];
        }
      }
      return newAnswers;
    });
  };

  const handleSubmit = () => {
    onSubmit(answers);
    console.log(answers);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Question Modal"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          border: 'none',
          padding: '0',
          maxHeight: '90vh',
          overflow: 'auto',
          width: '500px',
        },
      }}
      className="fixed bg-white shadow-md flex flex-col justify-center items-center rounded-lg p-8 outline-none"
    >
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl px-2 focus:outline-none"
        onClick={onRequestClose}
      >
        &times;
      </button>
      <h2 className="text-2xl mb-4 mt-10 font-semibold text-white bg-customDarkBlue p-4 rounded-md">We have some questions for you!</h2>
      <Carousel
        showArrows={false}
        showThumbs={false}
        showStatus={true}
        emulateTouch={true}
        swipeScrollTolerance={50}
        renderIndicator={(onClickHandler: (e: React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLLIElement>) => void, isSelected: boolean, index: number) => (
          <li
            style={{
              backgroundColor: isSelected ? '#000' : '#ccc',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              margin: '0 2px',
              cursor: 'pointer',
              display: 'inline-block',
              position: 'relative',
            }}
            onClick={onClickHandler}
            onKeyDown={onClickHandler}
            key={index}
            role="button"
            tabIndex={0}
            aria-label={`Slide ${index + 1}`}
          />
        )}
        className="w-full"
      >
        <div className="text-left px-6 mt-2 text-sm">
          <p className="mb-4 font-semibold">What types of animals does your practice primarily serve? (Select all that apply)</p>
          <div className="space-y-2 ml-4">
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
          <div className="space-y-2 ml-4">
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
          <div className="space-y-2 ml-4">
            <label className="block">
              <input
                type="radio"
                name="question3"
                value="Daily"
                checked={answers[2] === 'Daily'}
                onChange={(e) => handleAnswerChange(2, e.target.value)}
                className="mr-2"
              />
              Daily
            </label>
            <label className="block">
              <input
                type="radio"
                name="question3"
                value="Weekly"
                checked={answers[2] === 'Weekly'}
                onChange={(e) => handleAnswerChange(2, e.target.value)}
                className="mr-2"
              />
              Weekly
            </label>
            <label className="block">
              <input
                type="radio"
                name="question3"
                value="Monthly"
                checked={answers[2] === 'Monthly'}
                onChange={(e) => handleAnswerChange(2, e.target.value)}
                className="mr-2"
              />
              Monthly
            </label>
            <label className="block">
              <input
                type="radio"
                name="question3"
                value="Rarely"
                checked={answers[2] === 'Rarely'}
                onChange={(e) => handleAnswerChange(2, e.target.value)}
                className="mr-2"
              />
              Rarely
            </label>
            <label className="block">
              <input
                type="radio"
                name="question3"
                value="Never"
                checked={answers[2] === 'Never'}
                onChange={(e) => handleAnswerChange(2, e.target.value)}
                className="mr-2"
              />
              Never
            </label>
          </div>                    
        </div>
        <div className="text-left px-6 mt-2 mb-6 text-sm">
          <p className="mb-4 font-semibold">How many veterinarians are currently working in your practice?</p>
          <div className="space-y-2 ml-4">
            <label className="block">
              <input
                type="radio"
                name="question4"
                value="1-5"
                checked={answers[3] === '1-5'}
                onChange={(e) => handleAnswerChange(3, e.target.value)}
                className="mr-2"
              />
              1-5
            </label>
            <label className="block">
              <input
                type="radio"
                name="question4"
                value="6-10"
                checked={answers[3] === '6-10'}
                onChange={(e) => handleAnswerChange(3, e.target.value)}
                className="mr-2"
              />
              6-10
            </label>
            <label className="block">
              <input
                type="radio"
                name="question4"
                value="11-20"
                checked={answers[3] === '11-20'}
                onChange={(e) => handleAnswerChange(3, e.target.value)}
                className="mr-2"
              />
              11-20
            </label>
            <label className="block">
              <input
                type="radio"
                name="question4"
                value="More than 20"
                checked={answers[3] === 'More than 20'}
                onChange={(e) => handleAnswerChange(3, e.target.value)}
                className="mr-2"
              />
              More than 20
            </label>
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              className="bg-customSkyBlue mb-3 text-black font-semibold py-2 px-4 rounded bg-opacity-70 hover:bg-opacity-100"
            >
              Submit
            </button>
          </div>
        </div>
      </Carousel>
    </Modal>
  );
};

export default CustomModal;
