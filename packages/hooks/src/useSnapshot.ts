'use client';

import { useState, useEffect, useCallback } from 'react';
import { snapshotsApi, type SnapshotResponse } from '@repo/api-client';

/**
 * Hook for loading and refreshing camera snapshots.
 * 
 * @param cameraId - UUID of the camera
 * @returns { url, loading, error, refresh }
 * 
 * @example
 * ```tsx
 * function CameraConfig({ cameraId }: { cameraId: string }) {
 *   const { url, loading, error, refresh } = useSnapshot(cameraId);
 *   
 *   if (loading) return <Spinner />;
 *   if (error) return <ErrorMessage>{error}</ErrorMessage>;
 *   
 *   return (
 *     <>
 *       <DrawingCanvas backgroundImage={url} />
 *       <Button onClick={refresh}>Refresh Snapshot</Button>
 *     </>
 *   );
 * }
 * ```
 */
export function useSnapshot(cameraId: string) {
    const [url, setUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [timestamp, setTimestamp] = useState<string | null>(null);

    const loadSnapshot = useCallback(async () => {
        if (!cameraId) return;

        setLoading(true);
        setError(null);

        try {
            const data = await snapshotsApi.getSnapshot(cameraId);
            setUrl(data.url);
            setTimestamp(data.timestamp);
        } catch (err) {
            console.error('Failed to load snapshot:', err);
            setError('No se pudo cargar la imagen de la cámara');
            // Set placeholder on error
            setUrl('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1000&auto=format&fit=crop');
        } finally {
            setLoading(false);
        }
    }, [cameraId]);

    const refresh = useCallback(async () => {
        if (!cameraId) return;

        setLoading(true);
        setError(null);

        try {
            const data = await snapshotsApi.refreshSnapshot(cameraId);
            setUrl(data.url);
            setTimestamp(data.timestamp);
        } catch (err) {
            console.error('Failed to refresh snapshot:', err);
            setError('No se pudo actualizar la imagen');
        } finally {
            setLoading(false);
        }
    }, [cameraId]);

    useEffect(() => {
        loadSnapshot();
    }, [loadSnapshot]);

    return {
        /** Public URL to the snapshot image */
        url,
        /** Whether a snapshot is being loaded */
        loading,
        /** Error message if loading failed */
        error,
        /** When the snapshot was captured */
        timestamp,
        /** Force refresh the snapshot (bypasses cache) */
        refresh
    };
}
