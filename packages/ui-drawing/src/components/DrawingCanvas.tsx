'use client';

import React, { useRef, useState, useEffect } from 'react';
import { cn } from '@repo/utils';
import type { DrawingCanvasProps, Point } from '../types/drawing';

export function DrawingCanvas({
    backgroundImage,
    children,
    className,
    onMouseDown,
    onMouseMove,
    onMouseUp
}: DrawingCanvasProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        if (!containerRef.current) return;

        const updateDimensions = () => {
            if (containerRef.current) {
                const { width, height } = containerRef.current.getBoundingClientRect();
                setDimensions({ width, height });
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    const getNormalizedPoint = (e: React.MouseEvent): Point => {
        if (!containerRef.current) return { x: 0, y: 0 };
        const rect = containerRef.current.getBoundingClientRect();
        return {
            x: Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)),
            y: Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height))
        };
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (onMouseDown) onMouseDown(getNormalizedPoint(e));
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (onMouseMove) onMouseMove(getNormalizedPoint(e));
    };

    const handleMouseUp = (e: React.MouseEvent) => {
        if (onMouseUp) onMouseUp(getNormalizedPoint(e));
    };

    return (
        <div
            ref={containerRef}
            className={cn("relative w-full aspect-video bg-black rounded-lg overflow-hidden select-none", className)}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            {/* Background Snapshot */}
            {backgroundImage && (
                <img
                    src={backgroundImage}
                    alt="Camera Snapshot"
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />
            )}

            {/* SVG Layer */}
            <svg
                className="absolute inset-0 w-full h-full z-10"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
            >
                {children}
            </svg>
        </div>
    );
}
