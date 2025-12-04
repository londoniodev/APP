// Main exports with full names
export { apiClient } from './client';
export { authApi } from './endpoints/auth';
export { camerasApi } from './endpoints/cameras';
export { eventsApi } from './endpoints/events';
export { moduleConfigApi } from './endpoints/module-configs';
export { snapshotsApi, type SnapshotResponse } from './endpoints/snapshots';

// Alias exports for backward compatibility
export { authApi as auth } from './endpoints/auth';
export { camerasApi as cameras } from './endpoints/cameras';
export { eventsApi as events } from './endpoints/events';
