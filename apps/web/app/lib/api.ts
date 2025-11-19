import type { ICamera, IEvent } from '@repo/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api-cam.universoexplora.tech';

export async function getCameras(): Promise<ICamera[]> {
    try {
        const res = await fetch(`${API_URL}/cameras`, {
            cache: 'no-store',
        });

        if (!res.ok) {
            throw new Error('Failed to fetch cameras');
        }

        return res.json();
    } catch (error) {
        console.error('Error fetching cameras:', error);
        return [];
    }
}

export async function getEvents(): Promise<IEvent[]> {
    try {
        const res = await fetch(`${API_URL}/events`, {
            cache: 'no-store',
        });

        if (!res.ok) {
            throw new Error('Failed to fetch events');
        }

        return res.json();
    } catch (error) {
        console.error('Error fetching events:', error);
        return [];
    }
}

export async function createCamera(data: {
    name: string;
    rtspUrl: string;
    location: string;
    type: string;
}): Promise<ICamera | null> {
    try {
        const res = await fetch(`${API_URL}/cameras`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            throw new Error('Failed to create camera');
        }

        return res.json();
    } catch (error) {
        console.error('Error creating camera:', error);
        return null;
    }
}
