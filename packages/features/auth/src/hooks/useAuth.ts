'use client';

import { useState, useEffect, useCallback } from 'react';
import { auth } from '@repo/api-client';
import type { User } from '@repo/types';

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const checkAuth = useCallback(async () => {
        try {
            setIsLoading(true);
            const userData = await auth.getCurrentUser();
            setUser(userData);
        } catch (err) {
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    const login = useCallback(async (email: string, password: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await auth.login(email, password);
            // Cookie is set by server or we might need to set it here if API returns token but doesn't set cookie.
            // The previous implementation in login/page.tsx set the cookie manually.
            // Let's assume we need to set it manually for now to match previous behavior, 
            // or better yet, let the API client handle it if possible.
            // But since we are in a shared package, we might not want to access document.cookie directly if used in React Native.
            // For now, we'll return the data and let the consumer handle platform specific storage if needed, 
            // OR we can use a platform agnostic storage adapter.
            // Given the "Quick Wins" approach, I'll stick to returning data and letting the web app handle the cookie for now,
            // or just setting it here if we assume this hook is for web primarily for now (React Native will use a different storage).

            // Actually, for React Native we'll need to store the token in Async Storage.
            // For Web, we store in Cookie.
            // I'll return the response and let the component handle the redirect/storage for now, 
            // or I can abstract storage.

            // Let's return the user and token.
            setUser(response.user);
            return response;
        } catch (err: any) {
            setError(err.message || 'Login failed');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const logout = useCallback(async () => {
        setIsLoading(true);
        try {
            await auth.logout();
            setUser(null);
        } catch (err) {
            console.error('Logout error', err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const register = useCallback(async (data: any) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await auth.register(data);
            setUser(response.user);
            return response;
        } catch (err: any) {
            setError(err.message || 'Registration failed');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        user,
        isAuthenticated: !!user,
        isLoading,
        error,
        login,
        logout,
        register,
        checkAuth,
    };
}
