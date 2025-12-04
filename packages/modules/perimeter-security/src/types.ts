import type { Zone } from '@repo/ui-drawing';
import type { WeeklySchedule } from '@repo/ui-scheduling';

export interface PerimeterSecurityConfig {
    enabled: boolean;
    zones: Zone[];
    schedule: WeeklySchedule;
    sensitivity: number; // 0-100
    alertType: 'push' | 'email' | 'both';
}

export const DEFAULT_CONFIG: PerimeterSecurityConfig = {
    enabled: false,
    zones: [],
    schedule: {
        mon: [{ start: '22:00', end: '06:00' }],
        tue: [{ start: '22:00', end: '06:00' }],
        wed: [{ start: '22:00', end: '06:00' }],
        thu: [{ start: '22:00', end: '06:00' }],
        fri: [{ start: '22:00', end: '06:00' }],
        sat: [{ start: '22:00', end: '06:00' }],
        sun: [{ start: '22:00', end: '06:00' }]
    },
    sensitivity: 80,
    alertType: 'push'
};
