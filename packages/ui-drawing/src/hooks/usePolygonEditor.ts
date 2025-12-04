import { useState, useCallback } from 'react';
import type { Point, Zone } from '../types/drawing';

interface UsePolygonEditorProps {
    initialZones?: Zone[];
    onChange?: (zones: Zone[]) => void;
}

export function usePolygonEditor({ initialZones = [], onChange }: UsePolygonEditorProps) {
    const [zones, setZones] = useState<Zone[]>(initialZones);
    const [currentPoints, setCurrentPoints] = useState<Point[]>([]);
    const [isDrawing, setIsDrawing] = useState(false);
    const [draggedPointIndex, setDraggedPointIndex] = useState<{ zoneId: string, pointIndex: number } | null>(null);

    const addPoint = useCallback((point: Point) => {
        if (!isDrawing) {
            setIsDrawing(true);
            setCurrentPoints([point]);
        } else {
            setCurrentPoints(prev => [...prev, point]);
        }
    }, [isDrawing]);

    const closePolygon = useCallback(() => {
        if (currentPoints.length < 3) return;

        const newZone: Zone = {
            id: crypto.randomUUID(),
            points: [...currentPoints],
            type: 'include',
            color: '#10B981' // Default emerald
        };

        const newZones = [...zones, newZone];
        setZones(newZones);
        setCurrentPoints([]);
        setIsDrawing(false);
        onChange?.(newZones);
    }, [currentPoints, zones, onChange]);

    const updateZonePoint = useCallback((zoneId: string, pointIndex: number, newPoint: Point) => {
        const newZones = zones.map(z => {
            if (z.id !== zoneId) return z;
            const newPoints = [...z.points];
            newPoints[pointIndex] = newPoint;
            return { ...z, points: newPoints };
        });
        setZones(newZones);
        onChange?.(newZones);
    }, [zones, onChange]);

    return {
        zones,
        currentPoints,
        isDrawing,
        addPoint,
        closePolygon,
        updateZonePoint,
        draggedPointIndex,
        setDraggedPointIndex
    };
}
