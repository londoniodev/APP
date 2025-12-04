'use client';

import React, { useState } from 'react';
import { DrawingCanvas, PolygonEditor, usePolygonEditor } from '@repo/ui-drawing';
import { WeeklyScheduler } from '@repo/ui-scheduling';
import { Button } from '@repo/ui/button';
import { Label } from '@repo/ui/label';
import { Switch } from '@repo/ui/switch';
import { PerimeterSecurityConfig, DEFAULT_CONFIG } from '../types';

interface PerimeterConfigProps {
    initialConfig?: Partial<PerimeterSecurityConfig>;
    snapshotUrl?: string;
    onSave: (config: PerimeterSecurityConfig) => void;
}

export function PerimeterConfig({ initialConfig, snapshotUrl, onSave }: PerimeterConfigProps) {
    const [config, setConfig] = useState<PerimeterSecurityConfig>({ ...DEFAULT_CONFIG, ...initialConfig });

    // Drawing Hook
    const {
        zones,
        currentPoints,
        addPoint,
        closePolygon,
        updateZonePoint,
        draggedPointIndex,
        setDraggedPointIndex
    } = usePolygonEditor({ initialZones: config.zones });

    // Update config when zones change (this is a bit manual, ideally usePolygonEditor would control local state better)
    // For now we sync on save or effect if needed. Let's sync on save for simplicity.

    const handleSave = () => {
        onSave({
            ...config,
            zones: zones
        });
    };

    return (
        <div className="space-y-8">
            {/* Header & Toggle */}
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div>
                    <h2 className="text-lg font-semibold text-slate-900">Seguridad Perimetral</h2>
                    <p className="text-sm text-slate-500">Detecta intrusos en áreas definidas durante horarios específicos.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Label htmlFor="module-enabled">Habilitar</Label>
                    <Switch
                        id="module-enabled"
                        checked={config.enabled}
                        onCheckedChange={(checked: boolean) => setConfig(prev => ({ ...prev, enabled: checked }))}
                    />
                </div>
            </div>

            {/* Zone Editor */}
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-md font-medium">1. Definir Zonas de Seguridad</h3>
                    <div className="text-xs text-slate-500">
                        Click para agregar puntos • Enter para cerrar zona
                    </div>
                </div>

                <div className="border border-slate-200 rounded-xl overflow-hidden bg-black">
                    <DrawingCanvas
                        backgroundImage={snapshotUrl}
                        onMouseDown={addPoint}
                        onMouseMove={(p) => draggedPointIndex && updateZonePoint(draggedPointIndex.zoneId, draggedPointIndex.pointIndex, p)}
                        onMouseUp={() => setDraggedPointIndex(null)}
                    >
                        <PolygonEditor
                            zones={zones}
                            currentPoints={currentPoints}
                            onPointDragStart={(zoneId, idx) => setDraggedPointIndex({ zoneId, pointIndex: idx })}
                            onPointDragEnd={() => setDraggedPointIndex(null)}
                        />
                    </DrawingCanvas>
                </div>

                <div className="flex justify-end">
                    <Button variant="outline" size="sm" onClick={closePolygon} disabled={currentPoints.length < 3}>
                        Cerrar Zona Actual
                    </Button>
                </div>
            </div>

            {/* Schedule Editor */}
            <div className="space-y-4">
                <h3 className="text-md font-medium">2. Horarios de Activación</h3>
                <WeeklyScheduler
                    schedule={config.schedule}
                    onChange={(newSchedule) => setConfig(prev => ({ ...prev, schedule: newSchedule }))}
                />
            </div>

            {/* Sensitivity */}
            <div className="space-y-4">
                <h3 className="text-md font-medium">3. Sensibilidad de Detección</h3>
                <div className="p-4 border border-slate-200 rounded-lg bg-white">
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium w-12">{config.sensitivity}%</span>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={config.sensitivity}
                            onChange={(e) => setConfig(prev => ({ ...prev, sensitivity: parseInt(e.target.value) }))}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>
                    <p className="text-xs text-slate-500 mt-2">
                        Valores más altos detectan movimientos más sutiles (hojas, sombras). Valores más bajos requieren movimientos más evidentes (personas).
                    </p>
                </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-200 flex justify-end">
                <Button onClick={handleSave} className="w-full sm:w-auto">
                    Guardar Configuración
                </Button>
            </div>
        </div>
    );
}
