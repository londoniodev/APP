'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRef, useState } from 'react';
import {
    Shield,
    Home,
    Briefcase,
    CheckCircle2,
    Play,
    ChevronRight,
    Activity,
    Eye,
    Bell,
    Lock,
    Users,
    Smartphone
} from 'lucide-react';

// --- Data Constants (Migrated & Enhanced) ---

const heroHighlights = [
    {
        icon: Home,
        title: 'Seguridad del Hogar',
        description: 'Protección inteligente para tu familia y patrimonio.',
        color: 'text-blue-400'
    },
    {
        icon: Briefcase,
        title: 'Seguridad Laboral',
        description: 'Control de operaciones y activos críticos.',
        color: 'text-emerald-400'
    },
    {
        icon: Activity,
        title: 'Monitoreo 24/7',
        description: 'IA activa en tiempo real, sin descanso.',
        color: 'text-purple-400'
    }
];

const marketSegments = [
    {
        id: 'home',
        title: 'Hogar Inteligente',
        description: 'Automatiza la seguridad de tu casa. Detecta intrusos, mascotas y recibe alertas solo cuando importa.',
        icon: Home,
        features: ['Detección de personas', 'Alertas de mascotas', 'Modo nocturno', 'Privacidad garantizada'],
        gradient: 'from-blue-600 to-cyan-500'
    },
    {
        id: 'work',
        title: 'Industria & Comercio',
        description: 'Optimiza la seguridad operativa. Controla accesos, EPP y zonas restringidas con analítica avanzada.',
        icon: Briefcase,
        features: ['Control de aforo', 'Detección de EPP', 'Zonas de peligro', 'Reportes de incidentes'],
        gradient: 'from-emerald-600 to-teal-500'
    }
];

const features = [
    {
        title: 'Detección Humana',
        desc: 'Identifica personas con alta precisión, ignorando movimientos irrelevantes.',
        icon: Users,
        col: 'span-1 md:col-span-2'
    },
    {
        title: 'Vehículos',
        desc: 'Reconocimiento de autos y motos en accesos.',
        icon: Smartphone, // Placeholder icon
        col: 'span-1'
    },
    {
        title: 'Mascotas',
        desc: 'Monitorea a tus compañeros peludos.',
        icon: Activity,
        col: 'span-1'
    },
    {
        title: 'Obstrucción',
        desc: 'Alerta si la cámara es bloqueada o manipulada.',
        icon: Eye,
        col: 'span-1 md:col-span-2'
    },
];

// --- Components ---

const Navbar = ({ isLoggedIn }: { isLoggedIn: boolean }) => (
    <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed w-full z-50 bg-black/50 backdrop-blur-lg border-b border-white/10"
    >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                        <Shield className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-bold text-2xl text-white tracking-tight">CamAI</span>
                </div>

                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
                    <Link href="#features" className="hover:text-white transition-colors">Funcionalidades</Link>
                    <Link href="#solutions" className="hover:text-white transition-colors">Soluciones</Link>
                    <Link href="#pricing" className="hover:text-white transition-colors">Precios</Link>
                </div>

                <div className="flex items-center gap-4">
                    {isLoggedIn ? (
                        <Link href="/dashboard" className="bg-white text-black px-5 py-2.5 rounded-full font-semibold hover:bg-gray-200 transition-all">
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link href="/login" className="text-gray-300 hover:text-white font-medium transition-colors hidden sm:block">
                                Entrar
                            </Link>
                            <Link href="/register" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all">
                                Empezar Gratis
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    </motion.nav>
);

const Hero = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-black">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px]" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px]" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-blue-400 text-sm font-medium mb-6 backdrop-blur-sm">
                        ✨ La nueva era de la seguridad inteligente
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-8 leading-tight">
                        Seguridad que <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">entiende</span> <br />
                        lo que ve.
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Transforma tus cámaras actuales en un sistema de vigilancia proactivo impulsado por IA.
                        Detecta amenazas reales, ignora falsas alarmas.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            href={isLoggedIn ? "/dashboard" : "/register"}
                            className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-lg overflow-hidden transition-all hover:scale-105"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                {isLoggedIn ? 'Ir al Dashboard' : 'Comenzar Ahora'}
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                        <button className="px-8 py-4 rounded-full border border-white/10 text-white font-medium hover:bg-white/5 transition-all flex items-center gap-2">
                            <Play className="w-5 h-5 fill-current" /> Ver Demo
                        </button>
                    </div>
                </motion.div>

                {/* Floating Cards */}
                <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {heroHighlights.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + (i * 0.1) }}
                            className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors text-left"
                        >
                            <item.icon className={`w-8 h-8 ${item.color} mb-4`} />
                            <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                            <p className="text-gray-400 text-sm">{item.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const MarketSegments = () => {
    return (
        <section id="solutions" className="py-32 bg-black relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Una plataforma, múltiples usos</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Adaptamos nuestra tecnología a tus necesidades específicas, ya sea para proteger tu hogar o tu empresa.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {marketSegments.map((segment, i) => (
                        <motion.div
                            key={segment.id}
                            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="group relative overflow-hidden rounded-3xl bg-gray-900 border border-white/10 p-10 hover:border-white/20 transition-colors"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${segment.gradient} opacity-5 group-hover:opacity-10 transition-opacity`} />

                            <div className="relative z-10">
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${segment.gradient} flex items-center justify-center mb-8 shadow-lg`}>
                                    <segment.icon className="w-7 h-7 text-white" />
                                </div>

                                <h3 className="text-3xl font-bold text-white mb-4">{segment.title}</h3>
                                <p className="text-gray-400 mb-8 leading-relaxed">
                                    {segment.description}
                                </p>

                                <ul className="space-y-4">
                                    {segment.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-3 text-gray-300">
                                            <CheckCircle2 className="w-5 h-5 text-blue-500" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const FeaturesGrid = () => {
    return (
        <section id="features" className="py-32 bg-gray-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Inteligencia Visual</h2>
                    <p className="text-gray-400 text-lg">Capacidades avanzadas de detección para cada escenario.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`${feature.col} p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group`}
                        >
                            <feature.icon className="w-10 h-10 text-gray-400 group-hover:text-white transition-colors mb-6" />
                            <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const CTA = ({ isLoggedIn }: { isLoggedIn: boolean }) => (
    <section className="py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent" />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
                ¿Listo para modernizar tu seguridad?
            </h2>
            <p className="text-xl text-gray-400 mb-12">
                Únete a miles de usuarios que ya protegen lo que más importa con IA.
            </p>

            <Link
                href={isLoggedIn ? "/dashboard" : "/register"}
                className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white bg-blue-600 rounded-full hover:bg-blue-500 transition-all hover:scale-105 shadow-lg shadow-blue-600/30"
            >
                {isLoggedIn ? 'Ir al Dashboard' : 'Crear Cuenta Gratis'}
            </Link>
        </div>
    </section>
);

const Footer = () => (
    <footer className="bg-black border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-gray-600" />
                <span className="font-bold text-gray-600">CamAI</span>
            </div>
            <p className="text-gray-600 text-sm">© {new Date().getFullYear()} CamAI. Todos los derechos reservados.</p>
        </div>
    </footer>
);

export default function LandingPageClient({ isLoggedIn }: { isLoggedIn: boolean }) {
    return (
        <div className="bg-black min-h-screen selection:bg-blue-500/30">
            <Navbar isLoggedIn={isLoggedIn} />
            <Hero isLoggedIn={isLoggedIn} />
            <MarketSegments />
            <FeaturesGrid />
            <CTA isLoggedIn={isLoggedIn} />
            <Footer />
        </div>
    );
}
