import { GoogleLogin } from '@react-oauth/google';
import logoImage from '../assets/logo-144.png';
import { authService } from '../services/authService';

interface AuthPageProps {
    onLoginSuccess: () => void;
}

const AuthPage = ({ onLoginSuccess }: AuthPageProps) => {
    const handleLogin = async (tokenResponse: any) => {
        try {
            const data = await authService.googleLogin(tokenResponse.credential);
            console.log('서버로부터 받은 응답:', data);
            onLoginSuccess();
        } catch (error) {
            console.error('로그인 중 오류 발생:', error);
        }
    };

    return (
        <div className="auth-container">
            <div className="options-container">
                <h1 className="logo">Us AI</h1>
                <img src={logoImage} alt="logo image" className="logo-image" />
                <h1>
                    <span className="login-text">로그인 또는 회원 가입</span>
                </h1>
                <GoogleLogin
                    onSuccess={handleLogin}
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
};

export default AuthPage;