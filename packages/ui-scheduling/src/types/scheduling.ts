export type DayOfWeek = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export const DAYS_OF_WEEK: DayOfWeek[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

export const DAY_LABELS: Record<DayOfWeek, string> = {
    mon: 'Lunes',
    tue: 'Martes',
    wed: 'Miércoles',
    thu: 'Jueves',
    fri: 'Viernes',
    sat: 'Sábado',
    sun: 'Domingo'
};

export interface TimeRange {
    start: string; // HH:mm format (e.g., "09:00")
    end: string;   // HH:mm format (e.g., "17:00")
}

export type WeeklySchedule = {
    [key in DayOfWeek]?: TimeRange[];
};
