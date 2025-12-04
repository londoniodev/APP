'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { PerimeterConfig, type PerimeterSecurityConfig } from '@repo/module-perimeter-security';
import { Button } from '@repo/ui/button';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { moduleConfigApi, snapshotsApi } from '@repo/api-client';

/**
 * Camera perimeter security configuration page.
 * Allows users to draw security zones and set activation schedules.
 */
export default function PerimeterPage() {
    const params = useParams();
    const router = useRouter();
    const cameraId = params.id as string;

    // State
    const [initialConfig, setInitialConfig] = useState<Partial<PerimeterSecurityConfig> | undefined>();
    const [snapshotUrl, setSnapshotUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [refreshingSnapshot, setRefreshingSnapshot] = useState(false);

    // Fallback placeholder image
    const placeholderImage = "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1000&auto=format&fit=crop";

    useEffect(() => {
        async function loadData() {
            setLoading(true);

            // Load snapshot
            try {
                const snapshot = await snapshotsApi.getSnapshot(cameraId);
                setSnapshotUrl(snapshot.url);
            } catch (error) {
                console.log('Using placeholder - camera snapshot unavailable');
                setSnapshotUrl(placeholderImage);
            }

            // Load existing config
            try {
                const data = await moduleConfigApi.getConfig(cameraId, 'perimeter-security');
                setInitialConfig(data.config);
            } catch (error) {
                console.log('No existing config');
            }

            setLoading(false);
        }

        loadData();
    }, [cameraId]);

    const handleRefreshSnapshot = async () => {
        setRefreshingSnapshot(true);
        try {
            const snapshot = await snapshotsApi.refreshSnapshot(cameraId);
            setSnapshotUrl(snapshot.url);
        } catch (error) {
            console.error('Failed to refresh snapshot:', error);
        } finally {
            setRefreshingSnapshot(false);
        }
    };

    const handleSave = async (config: PerimeterSecurityConfig) => {
        try {
            await moduleConfigApi.saveConfig(cameraId, 'perimeter-security', {
                moduleId: 'perimeter-security',
                config: config,
                enabled: config.enabled
            });
            alert('Configuración guardada exitosamente');
            router.push(`/cameras/${cameraId}`);
        } catch (error) {
            console.error('Error saving:', error);
            alert('Error al guardar la configuración');
        }
    };

    if (loading) {
        return (
            <div className="p-6 flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
            </div>
        );
    }

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <div className="mb-6">
                <Button variant="ghost" onClick={() => router.back()} className="mb-4 pl-0 hover:pl-2 transition-all">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Volver a Cámara
                </Button>
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Configurar Seguridad Perimetral</h1>
                        <p className="text-slate-500">Cámara ID: {cameraId}</p>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleRefreshSnapshot}
                        disabled={refreshingSnapshot}
                    >
                        <RefreshCw className={`w-4 h-4 mr-2 ${refreshingSnapshot ? 'animate-spin' : ''}`} />
                        Actualizar Imagen
                    </Button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <PerimeterConfig
                    snapshotUrl={snapshotUrl || placeholderImage}
                    onSave={handleSave}
                    initialConfig={initialConfig}
                />
            </div>
        </div>
    );
}
