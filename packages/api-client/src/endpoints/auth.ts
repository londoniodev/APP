import { apiClient } from '../client';
import type { User } from '@repo/types';

export const authApi = {
    login: (email: string, password: string) =>
        apiClient.post<{ access_token: string; user: User }>('/auth/login', { email, password }).then(res => res.data),

    register: (data: any) =>
        apiClient.post<{ access_token: string; user: User }>('/auth/register', data).then(res => res.data),

    logout: () => apiClient.post('/auth/logout'),

    getCurrentUser: () => apiClient.get<User>('/auth/me').then(res => res.data),

    getProfile: (token: string) =>
        apiClient.get<User>('/auth/me', {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => res.data),

    updateProfile: (token: string, data: Partial<User>) =>
        apiClient.patch<User>('/auth/me', data, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => res.data),
};
