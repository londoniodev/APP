'use client';

import { useParams, useRouter } from 'next/navigation';
import { PerimeterConfig, type PerimeterSecurityConfig } from '@repo/module-perimeter-security';
import { Button } from '@repo/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function PerimeterPage() {
    const params = useParams();
    const router = useRouter();
    const cameraId = params.id as string;

    // Mock initial data - In real app, fetch from API
    const mockSnapshot = "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1000&auto=format&fit=crop";

    const handleSave = async (config: PerimeterSecurityConfig) => {
        console.log('Saving config for camera', cameraId, config);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        alert('Configuración guardada exitosamente');
        router.push(`/cameras/${cameraId}`);
    };

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <div className="mb-6">
                <Button variant="ghost" onClick={() => router.back()} className="mb-4 pl-0 hover:pl-2 transition-all">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Volver a Cámara
                </Button>
                <h1 className="text-2xl font-bold text-slate-900">Configurar Seguridad Perimetral</h1>
                <p className="text-slate-500">Cámara ID: {cameraId}</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <PerimeterConfig
                    snapshotUrl={mockSnapshot}
                    onSave={handleSave}
                />
            </div>
        </div>
    );
}
