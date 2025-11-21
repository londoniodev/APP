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
export async function updateCamera(id: string, data: Partial<ICamera>): Promise<ICamera | null> {
    try {
        const res = await fetch(`${API_URL}/cameras/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            throw new Error('Failed to update camera');
        }

        return res.json();
    } catch (error) {
        console.error('Error updating camera:', error);
        return null;
    }
}

export async function deleteCamera(id: string): Promise<boolean> {
    try {
        const res = await fetch(`${API_URL}/cameras/${id}`, {
            method: 'DELETE',
        });

        if (!res.ok) {
            throw new Error('Failed to delete camera');
        }

        return true;
    } catch (error) {
        console.error('Error deleting camera:', error);
        return false;
    }
}

export async function getProfile(token: string): Promise<any> {
    try {
        const res = await fetch(`${API_URL}/auth/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            cache: 'no-store',
        });

        if (!res.ok) {
            throw new Error('Failed to fetch profile');
        }

        return res.json();
    } catch (error) {
        console.error('Error fetching profile:', error);
        return null;
    }
}

export async function updateProfile(token: string, data: any): Promise<any> {
    try {
        const res = await fetch(`${API_URL}/users/profile`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            throw new Error('Failed to update profile');
        }

        return res.json();
    } catch (error) {
        console.error('Error updating profile:', error);
        return null;
    }
}
