'use client';

import { useState } from 'react';
import { WeeklyScheduler, type WeeklySchedule } from '@repo/ui-scheduling';

export default function SchedulingPlayground() {
    const [schedule, setSchedule] = useState<WeeklySchedule>({
        mon: [{ start: '09:00', end: '17:00' }],
        wed: [{ start: '14:00', end: '18:00' }]
    });

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">
            <h1 className="text-2xl font-bold">Playground de Horarios</h1>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h2 className="text-lg font-semibold mb-4">Configuración Semanal</h2>
                <WeeklyScheduler
                    schedule={schedule}
                    onChange={setSchedule}
                />
            </div>

            <div className="bg-slate-100 p-4 rounded-lg font-mono text-xs overflow-auto">
                <h3 className="font-bold mb-2 text-slate-500">Estado JSON:</h3>
                <pre>{JSON.stringify(schedule, null, 2)}</pre>
            </div>
        </div>
    );
}
