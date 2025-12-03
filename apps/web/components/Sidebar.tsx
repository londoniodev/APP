'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    LayoutDashboard,
    Users,
    Settings,
    LogOut,
    ChevronLeft,
    Menu,
    Camera,
    Bell
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@repo/core-auth';

export function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const { logout } = useAuth();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleLogout = async () => {
        try {
            await logout();
            // Clear token cookie
            document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        } catch (error) {
            console.error('Error al cerrar sesión', error);
        } finally {
            // Force a hard reload to clear any client-side state
            window.location.href = '/login';
        }
    };

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
        { icon: Camera, label: 'Cameras', href: '/dashboard/cameras' },
        { icon: Bell, label: 'Events', href: '/dashboard/events' },
        { icon: Users, label: 'Profile', href: '/dashboard/profile' },
    ];

    return (
        <div
            className={`relative flex flex-col h-screen bg-[#1a1a1a] text-gray-300 transition-all duration-300 ease-in-out ${isCollapsed ? 'w-20' : 'w-64'
                }`}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
                {!isCollapsed && <h1 className="text-xl font-bold text-white">Panel</h1>}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                    {isCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${isActive
                                ? 'bg-gray-800 text-white'
                                : 'hover:bg-gray-800/50 hover:text-white'
                                }`}
                        >
                            <item.icon size={20} />
                            {!isCollapsed && <span>{item.label}</span>}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer / Logout */}
            <div className="p-4 border-t border-gray-800">
                <button
                    type="button"
                    onClick={handleLogout}
                    className={`flex items-center gap-3 w-full p-3 rounded-lg text-red-400 hover:bg-gray-800/50 transition-colors ${isCollapsed ? 'justify-center' : ''
                        }`}
                >
                    <LogOut size={20} />
                    {!isCollapsed && <span>Logout</span>}
                </button>
            </div>
        </div>
    );
}
