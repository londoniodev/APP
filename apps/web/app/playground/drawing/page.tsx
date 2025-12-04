'use client';

import { useState } from 'react';
import { DrawingCanvas, PolygonEditor, usePolygonEditor } from '@repo/ui-drawing';

export default function DrawingPlayground() {
    const {
        zones,
        currentPoints,
        addPoint,
        closePolygon,
        updateZonePoint,
        draggedPointIndex,
        setDraggedPointIndex
    } = usePolygonEditor({ initialZones: [] });

    const handleCanvasClick = (point: { x: number, y: number }) => {
        addPoint(point);
    };

    const handleMouseMove = (point: { x: number, y: number }) => {
        if (draggedPointIndex) {
            updateZonePoint(draggedPointIndex.zoneId, draggedPointIndex.pointIndex, point);
        }
    };

    const handleMouseUp = () => {
        setDraggedPointIndex(null);
    };

    return (
        <div className="p-8 max-w-4xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold">Playground de Dibujo (Normalizado)</h1>

            <div className="border border-slate-200 rounded-xl p-4 bg-white shadow-sm">
                <DrawingCanvas
                    backgroundImage="https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1000&auto=format&fit=crop" // Placeholder image
                    onMouseDown={handleCanvasClick}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                >
                    <PolygonEditor
                        zones={zones}
                        currentPoints={currentPoints}
                        onPointDragStart={(zoneId, idx) => setDraggedPointIndex({ zoneId, pointIndex: idx })}
                        onPointDragEnd={() => setDraggedPointIndex(null)}
                    />
                </DrawingCanvas>
            </div>

            <div className="flex gap-4">
                <button
                    onClick={closePolygon}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Cerrar Polígono (Enter)
                </button>
                <div className="text-sm text-slate-500">
                    <p>1. Click en la imagen para agregar puntos.</p>
                    <p>2. Botón "Cerrar" para terminar la zona.</p>
                    <p>3. Arrastra los puntos blancos para editar.</p>
                </div>
            </div>

            <div className="bg-slate-100 p-4 rounded-lg font-mono text-xs overflow-auto max-h-60">
                <pre>{JSON.stringify(zones, null, 2)}</pre>
            </div>
        </div>
    );
}
