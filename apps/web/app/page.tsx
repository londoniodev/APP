import type { ICamera, IEvent } from '@repo/types';
import { getCameras, getEvents } from './lib/api';

export default async function DashboardPage() {
  const [cameras, events] = await Promise.all([
    getCameras(),
    getEvents(),
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Video Analysis Dashboard
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Cameras Section */}
        <section className="mb-8">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Cameras ({cameras.length})</h2>
            {cameras.length === 0 ? (
              <p className="text-gray-600">No cameras configured yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cameras.map((camera) => (
                  <div key={camera.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-lg mb-2">{camera.name}</h3>
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-medium">Location:</span> {camera.location}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-medium">Type:</span> {camera.type}
                    </p>
                    <div className="mt-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${camera.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                        {camera.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Events Section */}
        <section>
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Recent Events ({events.length})</h2>
            {events.length === 0 ? (
              <p className="text-gray-600">No events detected yet.</p>
            ) : (
              <div className="space-y-4">
                {events.slice(0, 10).map((event) => (
                  <div key={event.id} className="border-l-4 border-red-500 pl-4 py-3 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${event.type === 'SHOPLIFTING' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                            {event.type}
                          </span>
                          <span className="text-sm text-gray-500">
                            {new Date(event.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-gray-700">{event.description}</p>
                      </div>
                      {event.snapshotUrl && (
                        <div className="ml-4 flex-shrink-0">
                          <img
                            src={event.snapshotUrl}
                            alt="Event snapshot"
                            className="w-32 h-24 object-cover rounded"
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
      </main>
    </div>
  );
}
