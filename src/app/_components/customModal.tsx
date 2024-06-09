import React, {useState, useEffect} from "react";
import Modal from 'react-modal';

interface customModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    onSubmit: (answer:string) => void;
}

//Modal.setAppElement('#root');

const CustomModal: React.FC<customModalProps> = ({isOpen, onRequestClose, onSubmit}) => {
    const [answer, setAnswer] = useState<string>('');

    const handleSubmit = () => {
        onSubmit(answer);
        onRequestClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Question Modal"
            style={{
                content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                },
            }}
        >
            <h2>We have a question for you!</h2>
            <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Your answer"
            />
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={onRequestClose}>Close</button>
        </Modal>
    
    );
};
export default CustomModal;