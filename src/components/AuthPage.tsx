import { GoogleLogin } from '@react-oauth/google';
import logoImage from '../assets/logo-144.png';

interface AuthPageProps {
    onLoginSuccess: () => void;
}

function AuthPage({ onLoginSuccess }: AuthPageProps) {
    return (
        <div className="auth-container">
            <div className="options-container">
                <h1 className="logo">Us AI</h1>
                <img src={logoImage} alt="logo image" className="logo-image" />
                <h1>
                    <span className="login-text">로그인 또는 회원 가입</span>
                </h1>
                <GoogleLogin
                    onSuccess={tokenResponse => {
                        console.log(tokenResponse);
                        onLoginSuccess();
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                    text='continue_with'
                    shape='pill'
                    width={300}
                />
            </div>
        </div>
    );
}

export default AuthPage;