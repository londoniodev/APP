'use client';

import useSWR from 'swr';
import { apiClient } from '@repo/api-client';

/**
 * Response type for user modules endpoint.
 */
interface UserModulesResponse {
    modules: string[];
    subscriptions: {
        moduleId: string;
        planType: string;
        expiresAt: string | null;
    }[];
}

const fetcher = async (url: string) => {
    const response = await apiClient.get(url);
    return response.data;
};

/**
 * Hook for checking which modules the current user has access to.
 * 
 * @example
 * ```tsx
 * function Dashboard() {
 *   const { hasModule, loading } = useFeatureFlags();
 *   
 *   return (
 *     <>
 *       {hasModule('perimeter-security') && <PerimeterModule />}
 *       {hasModule('ppe-detection') && <PPEModule />}
 *     </>
 *   );
 * }
 * ```
 */
export function useFeatureFlags() {
    const { data, error, isLoading, mutate } = useSWR<UserModulesResponse>(
        '/users/me/modules',
        fetcher,
        {
            revalidateOnFocus: false,
            dedupingInterval: 60000, // Cache for 1 minute
        }
    );

    /**
     * Checks if user has access to a specific module.
     * @param moduleId - Module identifier (e.g., 'perimeter-security')
     */
    const hasModule = (moduleId: string): boolean => {
        if (!data?.modules) return false;
        return data.modules.includes(moduleId);
    };

    return {
        /** List of active module IDs */
        modules: data?.modules ?? [],

        /** Full subscription details */
        subscriptions: data?.subscriptions ?? [],

        /** Check if user has access to a module */
        hasModule,

        /** Whether data is being loaded */
        loading: isLoading,

        /** Error if request failed */
        error: error?.message,

        /** Refresh the data */
        refresh: mutate
    };
}
