import React, { useState } from 'react';
import Modal from 'react-modal';

interface AnalyticsModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSubmit: (answer: string) => void;
}

const AnalyticsModal: React.FC<AnalyticsModalProps> = ({ isOpen, onRequestClose, onSubmit }) => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [otherText, setOtherText] = useState<string>('');

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
    if (value !== 'Other') {
      setOtherText('');
    }
  };

  const handleOtherTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setOtherText(e.target.value);
  };

  const handleSubmit = () => {
    const finalAnswer = selectedOption === 'Other' ? `Other: ${otherText}` : selectedOption;
    onSubmit(finalAnswer);
    console.log(finalAnswer);
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
      <h2 className="text-2xl mb-4 mt-10 font-semibold text-white bg-customDarkBlue p-4 rounded-md">We have a question for you!</h2>

      <div className="text-left px-6 mt-2 text-sm">
        <p className="mb-4 font-semibold">Can you provide an overview of your client base? What are the predominant demographics of your clients?</p>
        <div className="space-y-2 ml-4">
          <label className="block">
            <input
              type="radio"
              name="question"
              value="Primarily young professionals"
              checked={selectedOption === 'Primarily young professionals'}
              onChange={(e) => handleOptionChange(e.target.value)}
              className="mr-2"
            />
            Primarily young professionals
          </label>
          <label className="block">
            <input
              type="radio"
              name="question"
              value="Primarily families with children"
              checked={selectedOption === 'Primarily families with children'}
              onChange={(e) => handleOptionChange(e.target.value)}
              className="mr-2"
            />
            Primarily families with children
          </label>
          <label className="block">
            <input
              type="radio"
              name="question"
              value="Primarily elderly individuals"
              checked={selectedOption === 'Primarily elderly individuals'}
              onChange={(e) => handleOptionChange(e.target.value)}
              className="mr-2"
            />
            Primarily elderly individuals
          </label>
          <label className="block">
            <input
              type="radio"
              name="question"
              value="A mix of all age groups"
              checked={selectedOption === 'A mix of all age groups'}
              onChange={(e) => handleOptionChange(e.target.value)}
              className="mr-2"
            />
            A mix of all age groups
          </label>
          <label className="block">
            <input
              type="radio"
              name="question"
              value="Other"
              checked={selectedOption.startsWith('Other')}
              onChange={(e) => handleOptionChange('Other')}
              className="mr-2"
            />
            Other (please specify)
          </label>
          {selectedOption === 'Other' && (
            <textarea
              value={otherText}
              onChange={handleOtherTextChange}
              className="w-full mt-2 p-2 border rounded"
              placeholder="Please specify"
            />
          )}
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="bg-customSkyBlue mb-3 text-black font-semibold py-2 px-4 rounded bg-opacity-70 hover:bg-opacity-100 mt-6"
        >
          Submit
        </button>
      </div>
    </Modal>
  );
};

export default AnalyticsModal;
