import { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';
import AuthPage from './components/AuthPage';
import type { Message, AuthStatus } from './types';

function App() {
    const [authStatus, setAuthStatus] = useState<AuthStatus>('logged_out');

    const handleLoginSuccess = () => {
        setAuthStatus('logged_in');
    };

    const handleLogout = () => {
        setAuthStatus('logged_out');
    };

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const [messages, setMessages] = useState<Message[]>([
        { id: 1, author: 'user', text: '리액트 상태 관리는 어떻게 해?' },
        { id: 2, author: 'assistant', text: 'useState 훅을 사용해서 할 수 있습니다.' },
    ]);

    const handleSendMessage = (text: string) => {
        const newUserMessage: Message = {
            id: Date.now(),
            author: 'user',
            text: text
        };

        setMessages((prevMessage) => [...prevMessage, newUserMessage]);
    }

    if (authStatus === 'logged_out') {
        return (
            <AuthPage onLoginSuccess={handleLoginSuccess} />
        );
    }

    return (
        <div className="app-container">
            <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
            <main className="main-content">
                <ChatWindow messages={messages} />
                <MessageInput onSendMessage={handleSendMessage} />
            </main>
        </div>
    );
}

export default App;