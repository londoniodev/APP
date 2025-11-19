'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import type { ICamera } from '@repo/types';
import { getCameras } from '../../lib/api';

export default function CameraDetailPage() {
    const params = useParams();
    const router = useRouter();
    const cameraId = params.id as string;
    const [camera, setCamera] = useState<ICamera | null>(null);
    const [isLoading, setIsLoading] = useState(true);

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
                    <button
                        onClick={() => router.push('/')}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                        ← Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    const AI_SERVICE_URL = process.env.NEXT_PUBLIC_AI_SERVICE_URL || 'http://localhost:8000';
    const streamUrl = `${AI_SERVICE_URL}/stream/${camera.id}`;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-100">
                <div className="max-w-7xl mx-auto py-5 px-4 sm:px-6 lg:px-8">
                    <button
                        onClick={() => router.push('/')}
                        className="text-gray-600 hover:text-gray-900 font-medium flex items-center gap-2 mb-3"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Dashboard
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{camera.name}</h1>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {camera.location}
                            </span>
                            <span className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                </svg>
                                {camera.type}
                            </span>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${camera.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'
                                }`}>
                                {camera.isActive ? '● Live' : '○ Offline'}
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Video Stream */}
            <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                    <div className="aspect-video bg-black relative">
                        {camera.isActive ? (
                            <img
                                src={streamUrl}
                                alt={`Live feed from ${camera.name}`}
                                className="w-full h-full object-contain"
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-white">
                                <div className="text-center">
                                    <svg className="w-16 h-16 mx-auto mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                    <p className="text-gray-400 font-medium">Camera is offline</p>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100/50">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Detection Active</h3>
                        <p className="text-sm text-gray-600">YOLOv8 is analyzing this stream in real-time. Detected persons will be highlighted with bounding boxes.</p>
                    </div>
                </div>
            </main>
        </div>
    );
}
