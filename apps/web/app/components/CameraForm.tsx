'use client';

import { useState, useEffect } from 'react';
import { type ICamera, CameraType } from '@repo/types';

interface CameraFormProps {
    initialData?: ICamera;
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    createCamera: (data: Partial<ICamera>) => Promise<any>;
    updateCamera: (id: string, data: Partial<ICamera>) => Promise<any>;
}

export function CameraForm({ initialData, isOpen, onClose, onSuccess, createCamera, updateCamera }: CameraFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<{
        name: string;
        rtspUrl: string;
        location: string;
        type: CameraType;
    }>({
        name: '',
        rtspUrl: '',
        location: '',
        type: CameraType.COMMERCIAL,
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name,
                rtspUrl: initialData.rtspUrl,
                location: initialData.location,
                type: initialData.type,
            });
        } else {
            setFormData({
                name: '',
                rtspUrl: '',
                location: '',
                type: CameraType.COMMERCIAL,
            });
        }
    }, [initialData, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (initialData) {
                await updateCamera(initialData.id.toString(), formData);
            } else {
                await createCamera(formData);
            }
            onSuccess();
            onClose();
        } catch (error) {
            console.error('Error saving camera:', error);
            alert('Error saving camera. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-auto my-8">
                {/* Header */}
                <div className="border-b border-gray-100 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-gray-900">
                            {initialData ? 'Edit Camera' : 'Add New Camera'}
                        </h3>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Camera Name
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all outline-none"
                            placeholder="Main Entrance Camera"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            RTSP URL
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.rtspUrl}
                            onChange={(e) => setFormData({ ...formData, rtspUrl: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all outline-none font-mono text-sm"
                            placeholder="rtsp://192.168.1.100:554/stream"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Location
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all outline-none"
                            placeholder="Main Entrance"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Camera Type
                        </label>
                        <select
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value as CameraType })}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all outline-none"
                        >
                            <option value={CameraType.COMMERCIAL}>Commercial</option>
                            <option value={CameraType.HOME}>Home</option>
                        </select>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-all font-medium text-gray-700"
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-lg shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    {initialData ? 'Saving...' : 'Adding...'}
                                </span>
                            ) : (initialData ? 'Save Changes' : 'Add Camera')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
