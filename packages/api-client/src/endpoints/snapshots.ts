import { apiClient } from '../client';

/**
 * Response type for snapshot endpoints.
 */
export interface SnapshotResponse {
    /** Public URL to access the snapshot image */
    url: string;
    /** When the snapshot was captured (ISO string) */
    timestamp: string;
    /** Image width in pixels */
    width?: number;
    /** Image height in pixels */
    height?: number;
}

/**
 * API client for camera snapshot endpoints.
 * 
 * @example
 * ```typescript
 * const snapshot = await snapshotsApi.getSnapshot('camera-uuid');
 * console.log(snapshot.url); // Use as image source
 * ```
 */
export const snapshotsApi = {
    /**
     * Gets the latest snapshot for a camera.
     * Returns cached snapshot if less than 5 minutes old.
     * 
     * @param cameraId - UUID of the camera
     * @returns Snapshot URL and metadata
     */
    async getSnapshot(cameraId: string): Promise<SnapshotResponse> {
        const response = await apiClient.get(`/cameras/${cameraId}/snapshot`);
        return response.data;
    },

    /**
     * Forces capture of a new snapshot, bypassing cache.
     * Use sparingly to avoid overloading cameras.
     * 
     * @param cameraId - UUID of the camera
     * @returns Newly captured snapshot URL and metadata
     */
    async refreshSnapshot(cameraId: string): Promise<SnapshotResponse> {
        const response = await apiClient.post(`/cameras/${cameraId}/snapshot/refresh`);
        return response.data;
    }
};
