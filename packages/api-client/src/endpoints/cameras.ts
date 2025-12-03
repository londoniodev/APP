import { apiClient } from '../client';
import type { ICamera } from '@repo/types';

export const camerasApi = {
    getAll: () => apiClient.get<ICamera[]>('/cameras').then(res => res.data),
    getById: (id: string) => apiClient.get<ICamera>(`/cameras/${id}`).then(res => res.data),
    create: (data: Partial<ICamera>) => apiClient.post<ICamera>('/cameras', data).then(res => res.data),
    update: (id: string, data: Partial<ICamera>) => apiClient.patch<ICamera>(`/cameras/${id}`, data).then(res => res.data),
    delete: (id: string) => apiClient.delete(`/cameras/${id}`),
};
