import type { Message } from '../types';

interface ChatWindowProps {
    messages: Message[];
}

const ChatWindow = ({ messages }: ChatWindowProps) => {
    return (
        <div className="chat-window">
            {messages.map((message) => (
                <div key={message.id} className={`message ${message.author === 'user' ? 'user-message' : 'assistant-message'}`}>
                    <p>{message.text}</p>
                </div>
            ))}
        </div>
    );
};

export default ChatWindow;