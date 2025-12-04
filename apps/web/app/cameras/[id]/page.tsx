'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import type { ICamera } from '@repo/types';
import { getCameras } from '../../lib/api';
import { useFeatureFlags } from '@repo/hooks';
import { Shield, HardHat, Dog, Baby, UserRound, Car, CreditCard, Users, Flame, Package, Clock, ArrowLeft, Lock } from 'lucide-react';

const MODULE_DEFINITIONS = [
    { id: 'perimeter-security', name: 'Seguridad Perimetral', icon: Shield, color: 'blue', href: '/perimeter' },
    { id: 'ppe-detection', name: 'Detección EPP', icon: HardHat, color: 'orange', href: '/ppe' },
    { id: 'pet-monitoring', name: 'Mascotas', icon: Dog, color: 'amber', href: '/pets' },
    { id: 'baby-monitor', name: 'Monitor Bebé', icon: Baby, color: 'pink', href: '/baby' },
    { id: 'elderly-care', name: 'Cuidado Adultos', icon: UserRound, color: 'purple', href: '/elderly' },
    { id: 'vehicle-tracking', name: 'Vehículos', icon: Car, color: 'green', href: '/vehicles' },
    { id: 'license-plate', name: 'Placas', icon: CreditCard, color: 'slate', href: '/plates' },
    { id: 'people-counting', name: 'Conteo Personas', icon: Users, color: 'cyan', href: '/counting' },
    { id: 'fire-smoke-detection', name: 'Fuego/Humo', icon: Flame, color: 'red', href: '/fire' },
    { id: 'object-left-behind', name: 'Objetos Abandonados', icon: Package, color: 'yellow', href: '/objects' },
    { id: 'restricted-hours', name: 'Horarios Restringidos', icon: Clock, color: 'indigo', href: '/hours' },
];

const COLOR_CLASSES: Record<string, { bg: string; text: string; border: string }> = {
    blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
    orange: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200' },
    amber: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200' },
    pink: { bg: 'bg-pink-50', text: 'text-pink-600', border: 'border-pink-200' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200' },
    green: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200' },
    slate: { bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-200' },
    cyan: { bg: 'bg-cyan-50', text: 'text-cyan-600', border: 'border-cyan-200' },
    red: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200' },
    yellow: { bg: 'bg-yellow-50', text: 'text-yellow-600', border: 'border-yellow-200' },
    indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-200' },
};

export default function CameraDetailPage() {
    const params = useParams();
    const router = useRouter();
    const cameraId = params.id as string;
    const [camera, setCamera] = useState<ICamera | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { hasModule, loading: modulesLoading } = useFeatureFlags();

    useEffect(() => {
        async function loadCamera() {
            const cameras = await getCameras();
            const found = cameras.find((c) => c.id.toString() === cameraId);
            setCamera(found || null);
            setIsLoading(false);
        }
        loadCamera();
    }, [cameraId]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
                    <p className="mt-4 text-gray-600">Loading camera...</p>
                </div>
            </div>
        );
    }

    if (!camera) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Camera not found</h1>
                    <button onClick={() => router.push('/')} className="text-blue-600 hover:text-blue-700 font-medium">
                        ← Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    const AI_SERVICE_URL = process.env.NEXT_PUBLIC_AI_SERVICE_URL || 'https://ai-cam.universoexplora.tech';
    const streamUrl = `${AI_SERVICE_URL}/stream/${camera.id}`;

    const handleModuleClick = (moduleId: string, href: string) => {
        if (hasModule(moduleId)) {
            router.push(`/cameras/${cameraId}${href}`);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50">
            <header className="bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-100">
                <div className="max-w-7xl mx-auto py-5 px-4 sm:px-6 lg:px-8">
                    <button onClick={() => router.push('/dashboard')} className="text-gray-600 hover:text-gray-900 font-medium flex items-center gap-2 mb-3">
                        <ArrowLeft className="w-5 h-5" />
                        Volver al Dashboard
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{camera.name}</h1>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                            <span>📍 {camera.location}</span>
                            <span>🏷️ {camera.type}</span>
                            <span className={camera.isActive ? 'text-emerald-600' : 'text-gray-500'}>
                                {camera.isActive ? '● Live' : '○ Offline'}
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                    <div className="aspect-video bg-black relative">
                        {camera.isActive ? (
                            <img src={streamUrl} alt={`Live feed from ${camera.name}`} className="w-full h-full object-contain" />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <p className="text-gray-400 font-medium">Camera is offline</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Módulos de IA</h2>

                    {modulesLoading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {MODULE_DEFINITIONS.map((module) => {
                                const access = hasModule(module.id);
                                const defaultColor = COLOR_CLASSES.slate;
                                const colors = COLOR_CLASSES[module.color] ?? defaultColor;

                                const Icon = module.icon;
                                const bgClass = access ? colors.bg : 'bg-gray-50';
                                const borderClass = access ? colors.border : 'border-gray-200';
                                const iconClass = access ? colors.text : 'text-gray-400';

                                return (
                                    <button
                                        key={module.id}
                                        onClick={() => handleModuleClick(module.id, module.href)}
                                        disabled={!access}
                                        className={`relative p-4 rounded-xl border-2 transition-all duration-200 ${bgClass} ${borderClass} ${access ? 'hover:shadow-md cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
                                    >
                                        {!access && (
                                            <div className="absolute top-2 right-2">
                                                <Lock className="w-4 h-4 text-gray-400" />
                                            </div>
                                        )}
                                        <Icon className={`w-8 h-8 mb-2 ${iconClass}`} />
                                        <p className={`text-sm font-medium ${access ? 'text-gray-900' : 'text-gray-500'}`}>
                                            {module.name}
                                        </p>
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    <p className="mt-6 text-sm text-gray-500 text-center">
                        ¿Necesitas más módulos? Contacta a ventas para activarlos.
                    </p>
                </div>
            </main>
        </div>
    );
}
