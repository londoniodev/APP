import { NextResponse } from 'next/server';

export async function POST() {
    const response = NextResponse.json({ success: true });

    // Define common cookie options for deletion
    const cookieOptions = [
        // Standard deletion
        'token=; Path=/; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT',
        // With HttpOnly and Secure (matches likely production cookie)
        'token=; Path=/; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=None',
        // With Domain .universoexplora.tech
        'token=; Path=/; Domain=.universoexplora.tech; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=None',
        // With Domain cam.universoexplora.tech
        'token=; Path=/; Domain=cam.universoexplora.tech; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=None',
        // With Domain universoexplora.tech
        'token=; Path=/; Domain=universoexplora.tech; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=None'
    ];

    // Append all Set-Cookie headers
    cookieOptions.forEach(option => {
        response.headers.append('Set-Cookie', option);
    });

    return response;
}

