'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { ICamera, IEvent } from '@repo/types';
import { getCameras, getEvents, deleteCamera } from '../lib/api';
import { CameraForm } from '../components/CameraForm';

export default function DashboardPage() {
  const [cameras, setCameras] = useState<ICamera[]>([]);
  const [events, setEvents] = useState<IEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingCamera, setEditingCamera] = useState<ICamera | undefined>(undefined);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleDeleteCamera = async (id: string) => {
    const success = await deleteCamera(id);
    if (success) {
      loadData();
    } else {
      alert('Failed to delete camera');
    }
  };

  const loadData = async () => {
    setIsLoading(true);
    const [camerasData, eventsData] = await Promise.all([
      getCameras(),
      getEvents(),
    ]);
    setCameras(camerasData);
    setEvents(eventsData);
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto py-5 px-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Video Analysis
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">AI-Powered Camera Monitoring</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-blue-400 rounded-full animate-ping opacity-20"></div>
            </div>
            <p className="mt-4 text-gray-600 font-medium">Loading your dashboard...</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Cameras Section */}
            <section>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Cameras</h2>
                  <p className="text-sm text-gray-500 mt-1">{cameras.length} device{cameras.length !== 1 ? 's' : ''} connected</p>
                </div>
                <button
                  onClick={() => {
                    setEditingCamera(undefined);
                    setIsFormOpen(true);
                  }}
                  className="group relative inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-medium transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Camera
                </button>
              </div>

              {cameras.length === 0 ? (
                <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-12 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center">
                    <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No cameras yet</h3>
                  <p className="text-gray-500 max-w-sm mx-auto">Get started by adding your first camera to begin monitoring.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {cameras.map((camera) => (
                    <div key={camera.id} className="group bg-white rounded-2xl border border-gray-100 hover:border-blue-200 p-5 transition-all hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 relative">
                      <Link href={`/cameras/${camera.id}`} className="block">
                        <div className="flex items-start justify-between mb-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${camera.isActive
                            ? 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200'
                            : 'bg-gray-100 text-gray-600 ring-1 ring-gray-200'
                            }`}>
                            {camera.isActive ? '● Online' : '○ Offline'}
                          </span>
                        </div>
                        <h3 className="font-semibold text-gray-900 text-lg mb-2 group-hover:text-blue-600 transition-colors">{camera.name}</h3>
                        <div className="space-y-1.5 text-sm mb-4">
                          <p className="text-gray-600 flex items-center gap-2">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {camera.location}
                          </p>
                          <p className="text-gray-600 flex items-center gap-2">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                            {camera.type}
                          </p>
                        </div>
                      </Link>

                      {/* Action Buttons */}
                      <div className="flex justify-end gap-2 mt-2 pt-3 border-t border-gray-100">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingCamera(camera);
                            setIsFormOpen(true);
                          }}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit Camera"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={async (e) => {
                            e.stopPropagation();
                            if (confirm('Are you sure you want to delete this camera?')) {
                              await handleDeleteCamera(camera.id.toString());
                            }
                          }}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Camera"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <CameraForm
              isOpen={isFormOpen}
              onClose={() => setIsFormOpen(false)}
              onSuccess={loadData}
              initialData={editingCamera}
            />

            {/* Events Section */}
            <section>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Recent Events</h2>
                  <p className="text-sm text-gray-500 mt-1">{events.length} detection{events.length !== 1 ? 's' : ''} logged</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {events.length === 0 ? (
                  <div className="p-12 text-center">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-amber-100 to-amber-50 rounded-2xl flex items-center justify-center">
                      <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No events detected</h3>
                    <p className="text-gray-500">Events from your cameras will appear here.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {events.slice(0, 10).map((event, index) => (
                      <div key={event.id} className="p-5 hover:bg-gray-50/50 transition-colors group">
                        <div className="flex items-start gap-4">
                          <div className={`w-1 h-full rounded-full ${event.type === 'SHOPLIFTING' ? 'bg-red-500' : 'bg-amber-500'
                            }`}></div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <div className="flex items-center gap-3">
                                <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${event.type === 'SHOPLIFTING'
                                  ? 'bg-red-100 text-red-700 ring-1 ring-red-200'
                                  : 'bg-amber-100 text-amber-700 ring-1 ring-amber-200'
                                  }`}>
                                  {event.type}
                                </span>
                                <span className="text-sm text-gray-500">
                                  {new Date(event.createdAt).toLocaleString()}
                                </span>
                              </div>
                            </div>
                            <p className="text-gray-700 mb-2">{event.description}</p>
                          </div>
                          {event.snapshotUrl && (
                            <div className="flex-shrink-0">
                              <img
                                src={event.snapshotUrl}
                                alt="Event snapshot"
                                className="w-40 h-28 object-cover rounded-xl border border-gray-200 group-hover:scale-105 transition-transform"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
