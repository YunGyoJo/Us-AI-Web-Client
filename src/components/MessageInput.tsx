import { useState } from 'react';
import { FiArrowUp } from 'react-icons/fi';

interface MessageInputProps {
    onSendMessage: (text: string) => void;
}

const MessageInput = ({ onSendMessage }: MessageInputProps) => {
    const [inputValue, setInputValue] = useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (inputValue.trim() === '') return;

        onSendMessage(inputValue);
        setInputValue('');
    }

    return (
        <form className='message-input' onSubmit={handleSubmit}>
            <input type="text" placeholder='무엇이든 물어보세요' value={inputValue} onChange={handleInputChange} />
            <button type='submit' disabled={inputValue.trim() === ''}>
                <FiArrowUp />
            </button>
        </form>
    );
};

export default MessageInput;