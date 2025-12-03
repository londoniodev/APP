'use client';

import useSWR from 'swr';
import { events } from '@repo/api-client';
import type { IEvent } from '@repo/types';

export function useEvents(limit = 10) {
    const { data, error, isLoading, mutate } = useSWR<IEvent[]>(
        `/events?limit=${limit}`,
        () => events.getRecent(limit)
    );

    return {
        events: data,
        isLoading,
        isError: error,
        mutate,
    };
}
