import type { ICamera, IEvent } from '@repo/types';

export default async function DashboardPage() {
  return (
  \u003cdiv className = "min-h-screen bg-gray-50"\u003e
  {/* Header */ }
  \u003cheader className = "bg-white shadow"\u003e
  \u003cdiv className = "max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8"\u003e
  \u003ch1 className = "text-3xl font-bold text-gray-900"\u003e
            Video Analysis Dashboard
  \u003c / h1\u003e
  \u003c / div\u003e
  \u003c / header\u003e

  {/* Main Content */ }
  \u003cmain className = "max-w-7xl mx-auto py-6 sm:px-6 lg:px-8"\u003e
  {/* Cameras Section */ }
  \u003csection className = "mb-8"\u003e
  \u003cdiv className = "bg-white shadow rounded-lg p-6"\u003e
  \u003ch2 className = "text-2xl font-semibold mb-4"\u003eCameras\u003c / h2\u003e
  \u003cp className = "text-gray-600"\u003e
              Camera list will be displayed here
  \u003c / p\u003e
  \u003c / div\u003e
  \u003c / section\u003e

  {/* Events Section */ }
  \u003csection\u003e
  \u003cdiv className = "bg-white shadow rounded-lg p-6"\u003e
  \u003ch2 className = "text-2xl font-semibold mb-4"\u003eRecent Events\u003c / h2\u003e
  \u003cp className = "text-gray-600"\u003e
              Event timeline will be displayed here
  \u003c / p\u003e
  \u003c / div\u003e
  \u003c / section\u003e
  \u003c / main\u003e
  \u003c / div\u003e
  );
}
