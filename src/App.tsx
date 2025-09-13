import { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';
import AuthPage from './pages/AuthPage';
import type { Message, AuthStatus } from './types';
import { GoogleOAuthProvider } from '@react-oauth/google';

const Google_CLIENT_ID = "1046578829833-t3gss5mknjejemkq45md733acq0s1hkl.apps.googleusercontent.com";

function App() {
    const [authStatus, setAuthStatus] = useState<AuthStatus>('logged_out');

    const handleLoginSuccess = () => {
        setAuthStatus('logged_in');
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

    return (
        <GoogleOAuthProvider clientId={Google_CLIENT_ID}>
            {authStatus === 'logged_out' ? (
                <AuthPage onLoginSuccess={handleLoginSuccess} />
            ) : (
                <div className="app-container">
                    <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
                    <main className="main-content">
                        <ChatWindow messages={messages} />
                        <MessageInput onSendMessage={handleSendMessage} />
                    </main>
                </div>
            )}
        </GoogleOAuthProvider>
    );
}

export default App;