import { apiClient } from '../client';
import type { IEvent } from '@repo/types';

export const eventsApi = {
    getAll: () => apiClient.get<IEvent[]>('/events').then(res => res.data),
    getRecent: (limit = 10) => apiClient.get<IEvent[]>(`/events?limit=${limit}`).then(res => res.data),
    getById: (id: string) => apiClient.get<IEvent>(`/events/${id}`).then(res => res.data),
};
