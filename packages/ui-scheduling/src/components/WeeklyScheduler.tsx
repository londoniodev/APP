'use client';

import React from 'react';
import { cn } from '@repo/utils';
import { DAYS_OF_WEEK, DAY_LABELS, type DayOfWeek, type WeeklySchedule } from '../types/scheduling';

interface WeeklySchedulerProps {
    schedule: WeeklySchedule;
    onChange: (schedule: WeeklySchedule) => void;
    className?: string;
}

export function WeeklyScheduler({ schedule, onChange, className }: WeeklySchedulerProps) {
    // Helper to check if an hour is active for a day
    const isHourActive = (day: DayOfWeek, hour: number) => {
        const ranges = schedule[day] || [];
        return ranges.some(range => {
            const startPart = range.start.split(':')[0];
            const endPart = range.end.split(':')[0];

            if (!startPart || !endPart) return false;

            const startHour = parseInt(startPart, 10);
            const endHour = parseInt(endPart, 10);
            return hour >= startHour && hour < endHour;
        });
    };

    const convertHoursToRanges = (activeHours: Set<number>) => {
        const sortedHours = Array.from(activeHours).sort((a, b) => a - b);
        const ranges: { start: string; end: string }[] = [];

        if (sortedHours.length === 0) return ranges;

        // We know sortedHours has at least one element because of the check above
        let start = sortedHours[0]!;
        let prev = sortedHours[0]!;

        for (let i = 1; i < sortedHours.length; i++) {
            const current = sortedHours[i]!;
            if (current !== prev + 1) {
                ranges.push({
                    start: `${start.toString().padStart(2, '0')}:00`,
                    end: `${(prev + 1).toString().padStart(2, '0')}:00`
                });
                start = current;
            }
            prev = current;
        }
        ranges.push({
            start: `${start.toString().padStart(2, '0')}:00`,
            end: `${(prev + 1).toString().padStart(2, '0')}:00`
        });

        return ranges;
    };

    // Toggle an hour on/off
    const toggleHour = (day: DayOfWeek, hour: number) => {
        const isActive = isHourActive(day, hour);

        if (isActive) {
            // Remove this hour
            const activeHours = new Set<number>();
            for (let h = 0; h < 24; h++) {
                if (isHourActive(day, h) && h !== hour) activeHours.add(h);
            }
            const newRanges = convertHoursToRanges(activeHours);
            onChange({
                ...schedule,
                [day]: newRanges
            });
        } else {
            // Add this hour
            const activeHours = new Set<number>();
            for (let h = 0; h < 24; h++) {
                if (isHourActive(day, h) || h === hour) activeHours.add(h);
            }
            const newRanges = convertHoursToRanges(activeHours);
            onChange({
                ...schedule,
                [day]: newRanges
            });
        }
    };

    return (
        <div className={cn("border border-slate-200 rounded-lg overflow-hidden bg-white", className)}>
            <div className="grid grid-cols-[100px_1fr] divide-x divide-slate-200">
                {/* Header */}
                <div className="p-4 bg-slate-50 font-medium text-slate-500 text-sm flex items-center justify-center">
                    Día / Hora
                </div>
                <div className="grid grid-cols-24 divide-x divide-slate-100 bg-slate-50">
                    {Array.from({ length: 24 }).map((_, i) => (
                        <div key={i} className="flex items-center justify-center text-[10px] text-slate-400 py-2">
                            {i}
                        </div>
                    ))}
                </div>

                {/* Days */}
                {DAYS_OF_WEEK.map(day => (
                    <React.Fragment key={day}>
                        <div className="p-3 text-sm font-medium text-slate-700 flex items-center justify-center border-t border-slate-200">
                            {DAY_LABELS[day]}
                        </div>
                        <div className="grid grid-cols-24 divide-x divide-slate-100 border-t border-slate-200 h-10">
                            {Array.from({ length: 24 }).map((_, hour) => {
                                const active = isHourActive(day, hour);
                                return (
                                    <button
                                        key={hour}
                                        onClick={() => toggleHour(day, hour)}
                                        className={cn(
                                            "transition-colors hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500",
                                            active ? "bg-blue-600 hover:bg-blue-700" : "bg-white"
                                        )}
                                        title={`${DAY_LABELS[day]} ${hour}:00 - ${hour + 1}:00`}
                                    />
                                );
                            })}
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}
