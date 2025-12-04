import { apiClient } from '../client';

export interface ModuleConfigData {
    moduleId: string;
    config: Record<string, any>;
    enabled?: boolean;
}

export const moduleConfigApi = {
    async saveConfig(cameraId: string, moduleId: string, data: ModuleConfigData) {
        const response = await apiClient.post(
            `/cameras/${cameraId}/modules/${moduleId}/config`,
            data
        );
        return response.data;
    },

    async getConfig(cameraId: string, moduleId: string) {
        const response = await apiClient.get(
            `/cameras/${cameraId}/modules/${moduleId}/config`
        );
        return response.data;
    },

    async getAllConfigs(cameraId: string) {
        const response = await apiClient.get(`/cameras/${cameraId}/modules/configs`);
        return response.data;
    },

    async deleteConfig(cameraId: string, moduleId: string) {
        const response = await apiClient.delete(
            `/cameras/${cameraId}/modules/${moduleId}/config`
        );
        return response.data;
    }
};
