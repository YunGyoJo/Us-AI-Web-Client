import { authService } from './authService';
import type { ApiError } from '../types';

const API_BASE_URL = 'http://121.129.210.74:6002';

class ApiService {
    private async makeRequest(url: string, options: RequestInit = {}): Promise<Response> {
        const token = authService.getAccessToken();

        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            ...(options.headers as Record<string, string>),
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${API_BASE_URL}${url}`, {
            ...options,
            headers,
        });

        // 401 에러 처리
        if (response.status === 401) {
            const error: ApiError = await response.json();

            if (error.errorCode === 'TOKEN_EXPIRED') {
                try {
                    // 토큰 갱신 시도
                    await authService.refresh();

                    // 갱신된 토큰으로 원래 요청 재시도
                    const newToken = authService.getAccessToken();
                    const retryHeaders = {
                        ...headers,
                        'Authorization': `Bearer ${newToken}`,
                    };

                    return fetch(`${API_BASE_URL}${url}`, {
                        ...options,
                        headers: retryHeaders,
                    });
                } catch (refreshError) {
                    // 토큰 갱신 실패 시 로그아웃 처리
                    authService.clearAccessToken();
                    window.dispatchEvent(new CustomEvent('auth:logout', {
                        detail: { message: '세션이 만료되었습니다. 다시 로그인해주세요.' }
                    }));
                    throw refreshError;
                }
            } else {
                // 다른 401 에러의 경우 즉시 로그아웃
                authService.clearAccessToken();
                window.dispatchEvent(new CustomEvent('auth:logout', {
                    detail: { message: '세션이 만료되었습니다. 다시 로그인해주세요.' }
                }));
                throw error;
            }
        }

        return response;
    }

    async get(url: string): Promise<any> {
        const response = await this.makeRequest(url, { method: 'GET' });

        if (!response.ok) {
            const error: ApiError = await response.json();
            throw error;
        }

        return response.json();
    }

    async post(url: string, data?: any): Promise<any> {
        const response = await this.makeRequest(url, {
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined,
        });

        if (!response.ok) {
            const error: ApiError = await response.json();
            throw error;
        }

        return response.json();
    }

    async put(url: string, data?: any): Promise<any> {
        const response = await this.makeRequest(url, {
            method: 'PUT',
            body: data ? JSON.stringify(data) : undefined,
        });

        if (!response.ok) {
            const error: ApiError = await response.json();
            throw error;
        }

        return response.json();
    }

    async delete(url: string): Promise<any> {
        const response = await this.makeRequest(url, { method: 'DELETE' });

        if (!response.ok) {
            const error: ApiError = await response.json();
            throw error;
        }

        return response.json();
    }
}

export const apiService = new ApiService();
