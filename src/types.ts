export type Message = {
    id: number;
    author: 'user' | 'assistant';
    text: string;
};

export type AuthStatus = 'logged_out' | 'logged_in' | 'loading';

export type User = {
    id: string;
    email: string;
    name: string;
    picture?: string;
};

export type AuthResponse = {
    user: User;
    accessToken: string;
};

export type ApiError = {
    message: string;
    errorCode: string;
    statusCode: number;
};