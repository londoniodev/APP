import useSWR from 'swr';
import { cameras } from '@repo/api-client';
import type { ICamera } from '@repo/types';

export function useCameras() {
    const { data, error, isLoading, mutate } = useSWR<ICamera[]>('/cameras', cameras.getAll);

    const createCamera = async (cameraData: Partial<ICamera>) => {
        const newCamera = await cameras.create(cameraData);
        mutate([...(data || []), newCamera], false);
        return newCamera;
    };

    const updateCamera = async (id: string, cameraData: Partial<ICamera>) => {
        const updatedCamera = await cameras.update(id, cameraData);
        mutate(
            (data || []).map((c) => (c.id === id ? updatedCamera : c)),
            false
        );
        return updatedCamera;
    };

    const deleteCamera = async (id: string) => {
        await cameras.delete(id);
        mutate(
            (data || []).filter((c) => c.id !== id),
            false
        );
    };

    return {
        cameras: data,
        isLoading,
        isError: error,
        createCamera,
        updateCamera,
        deleteCamera,
        mutate,
    };
}
