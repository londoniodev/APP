'use client';

import React from 'react';
import type { Zone, Point } from '../types/drawing';

interface PolygonEditorProps {
    zones: Zone[];
    currentPoints: Point[];
    onPointDragStart: (zoneId: string, index: number) => void;
    onPointDragEnd: () => void;
}

export function PolygonEditor({
    zones,
    currentPoints,
    onPointDragStart,
    onPointDragEnd
}: PolygonEditorProps) {

    // Helper to convert 0-1 coords to 0-100 for SVG percentage
    const toSvg = (p: Point) => `${p.x * 100},${p.y * 100}`;

    return (
        <>
            {/* Render Completed Zones */}
            {zones.map(zone => (
                <g key={zone.id}>
                    <polygon
                        points={zone.points.map(toSvg).join(' ')}
                        fill={zone.color || '#10B981'}
                        fillOpacity="0.3"
                        stroke={zone.color || '#10B981'}
                        strokeWidth="0.5"
                        vectorEffect="non-scaling-stroke"
                    />
                    {/* Vertices Handles */}
                    {zone.points.map((p, idx) => (
                        <circle
                            key={idx}
                            cx={`${p.x * 100}%`}
                            cy={`${p.y * 100}%`}
                            r="1.5"
                            fill="white"
                            stroke={zone.color || '#10B981'}
                            strokeWidth="0.5"
                            className="cursor-move hover:r-2 transition-all"
                            onMouseDown={(e) => {
                                e.stopPropagation(); // Prevent canvas click
                                onPointDragStart(zone.id, idx);
                            }}
                            onMouseUp={onPointDragEnd}
                        />
                    ))}
                </g>
            ))}

            {/* Render Current Drawing */}
            {currentPoints.length > 0 && (
                <g>
                    <polyline
                        points={currentPoints.map(toSvg).join(' ')}
                        fill="none"
                        stroke="#3B82F6"
                        strokeWidth="0.5"
                        strokeDasharray="1,1"
                        vectorEffect="non-scaling-stroke"
                    />
                    {currentPoints.map((p, idx) => (
                        <circle
                            key={idx}
                            cx={`${p.x * 100}%`}
                            cy={`${p.y * 100}%`}
                            r="1.5"
                            fill="#3B82F6"
                        />
                    ))}
                    {/* Closing Line Preview (optional, logic handled in parent) */}
                </g>
            )}
        </>
    );
}
