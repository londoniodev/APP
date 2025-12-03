export { camerasApi as cameras, eventsApi as events, authApi as auth } from '@repo/api-client';
export { apiClient } from '@repo/api-client';

// Re-export specific functions for backward compatibility if needed, 
// or update usages in the app to use the namespaced apis.
// For now, I'll map the old function names to the new API client methods 
// to minimize changes in the app components.

import { camerasApi, eventsApi, authApi } from '@repo/api-client';

export const getCameras = camerasApi.getAll;
export const getCamera = camerasApi.getById;
export const createCamera = camerasApi.create;
export const updateCamera = camerasApi.update;
export const deleteCamera = camerasApi.delete;

export const getEvents = eventsApi.getAll;
export const getRecentEvents = eventsApi.getRecent;
export const getEvent = eventsApi.getById;

// Auth functions were likely fetch calls in the components,
// so we might not need to export them here if we update the components to use authApi directly.
// But if there were shared auth functions, we would export them here.
