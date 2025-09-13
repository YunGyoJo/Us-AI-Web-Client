import type { AuthResponse, User, ApiError } from '../types';

const API_BASE_URL = 'http://121.129.210.74:6002';

// 메모리에 액세스 토큰 저장
let accessToken: string | null = null;

export const authService = {
    // 액세스 토큰 관리
    setAccessToken: (token: string) => {
        accessToken = token;
    },

    getAccessToken: () => {
        return accessToken;
    },

    clearAccessToken: () => {
        accessToken = null;
    },

    // 기존 구글 로그인
    googleLogin: async (credential: string): Promise<AuthResponse> => {
        const response = await fetch(`${API_BASE_URL}/auth/login/google`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ credential }),
            credentials: 'include',
        });

        if (!response.ok) {
            const error: ApiError = await response.json();
            throw error;
        }

        const data: AuthResponse = await response.json();
        authService.setAccessToken(data.accessToken);
        return data;
    },

    // 토큰 갱신
    refresh: async (): Promise<AuthResponse> => {
        const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
            method: 'POST',
            credentials: 'include',
        });

        if (!response.ok) {
            const error: ApiError = await response.json();
            throw error;
        }

        const data: AuthResponse = await response.json();
        authService.setAccessToken(data.accessToken);
        return data;
    },

    // 사용자 정보 조회
    getMe: async (): Promise<User> => {
        const response = await fetch(`${API_BASE_URL}/users/me`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const error: ApiError = await response.json();
            throw error;
        }

        return response.json();
    },

    // 로그아웃
    logout: async (): Promise<void> => {
        const response = await fetch(`${API_BASE_URL}/auth/logout`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        authService.clearAccessToken();

        if (!response.ok) {
            // 로그아웃은 실패해도 클라이언트 상태는 초기화
            console.warn('로그아웃 API 호출 실패');
        }
    },
};
