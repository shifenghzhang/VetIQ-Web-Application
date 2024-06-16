import React, { useState } from 'react';
import Modal from 'react-modal';

interface AppointmentModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSubmit: (answer: string) => void;
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({ isOpen, onRequestClose, onSubmit }) => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [otherText, setOtherText] = useState<string>('');

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
    if (value !== 'Others') {
      setOtherText('');
    }
  };

  const handleOtherTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setOtherText(e.target.value);
  };

  const handleSubmit = () => {
    const finalAnswer = selectedOption === 'Others' ? `Others: ${otherText}` : selectedOption;
    onSubmit(finalAnswer);
    console.log(finalAnswer);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Appointment Modal"
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
        <p className="mb-4 font-semibold">How do you currently manage appointments in your practice?</p>
        <div className="space-y-2 ml-4">
          <label className="block">
            <input
              type="radio"
              name="appointment"
              value="Manual booking (phone/email)"
              checked={selectedOption.includes('Manual booking (phone/email)')}
              onChange={(e) => handleOptionChange(e.target.value)}
              className="mr-2"
            />
            Manual booking (phone/email)
          </label>
          <label className="block">
            <input
              type="radio"
              name="appointment"
              value="Practice management software"
              checked={selectedOption.includes('Practice management software')}
              onChange={(e) => handleOptionChange(e.target.value)}
              className="mr-2"
            />
            Practice management software
          </label>
          <label className="block">
            <input
              type="radio"
              name="appointment"
              value="Online booking system"
              checked={selectedOption.includes('Online booking system')}
              onChange={(e) => handleOptionChange(e.target.value)}
              className="mr-2"
            />
            Online booking system
          </label>
          <label className="block">
            <input
              type="radio"
              name="appointment"
              value="Walk-ins"
              checked={selectedOption.includes('Walk-ins')}
              onChange={(e) => handleOptionChange(e.target.value)}
              className="mr-2"
            />
            Walk-ins
          </label>
          <label className="block">
            <input
              type="radio"
              name="appointment"
              value="Others"
              checked={selectedOption.includes('Others')}
              onChange={(e) => handleOptionChange('Others')}
              className="mr-2"
            />
            Others (please specify)
          </label>
          {selectedOption.includes('Others') && (
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

export default AppointmentModal;
