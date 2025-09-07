interface AuthPageProps {
    onLoginSuccess: () => void;
}

function AuthPage({ onLoginSuccess }: AuthPageProps) {
    return (
        <div className="auth-container">
            <h1 className="logo">Us AI</h1>
            <div className="options-container">
                <h1>
                    <span className="login-text">로그인 또는 회원 가입</span>
                </h1>
                <button onClick={onLoginSuccess}>Github로 계속하기</button>
                <button onClick={onLoginSuccess}>Google로 계속하기</button>
                <button onClick={onLoginSuccess}>Kakao로 계속하기</button>
            </div>
        </div>
    );
}

export default AuthPage;