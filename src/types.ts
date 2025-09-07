export type Message = {
    id: number;
    author: 'user' | 'assistant';
    text: string;
};

export type AuthStatus = 'logged_out' | 'logged_in';