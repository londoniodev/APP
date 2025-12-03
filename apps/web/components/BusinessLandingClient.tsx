'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    ShieldCheck,
    Building2,
    Truck,
    HardHat,
    Users,
    AlertTriangle,
    BarChart3,
    Lock,
    ArrowRight,
    CheckSquare
} from 'lucide-react';

const solutions = [
    {
        title: 'Seguridad Perimetral Industrial',
        description: 'Protege grandes extensiones, patios de maniobras y accesos críticos con IA que no duerme.',
        icon: ShieldCheck,
        features: [
            'Detección de intrusos humanos y vehículos',
            'Cruce de líneas virtuales',
            'Detección de merodeadores',
            'Alerta de obstrucción de cámara'
        ]
    },
    {
        title: 'Logística y Control de Flotas',
        description: 'Optimiza el flujo de tus operaciones. Registra entradas y salidas de vehículos automáticamente.',
        icon: Truck,
        features: [
            'Reconocimiento de vehículos',
            'Control de tiempos en andén',
            'Detección de bloqueos en accesos',
            'Registro de matrículas (LPR básico)'
        ]
    },
    {
        title: 'Seguridad Industrial (HSE)',
        description: 'Garantiza el cumplimiento de normas de seguridad y reduce accidentes laborales.',
        icon: HardHat,
        features: [
            'Detección de uso de Casco/EPP',
            'Alertas de zonas peligrosas',
            'Conteo de personal en áreas restringidas',
            'Protocolos de evacuación'
        ]
    },
    {
        title: 'Inteligencia de Negocio',
        description: 'Convierte tus cámaras en sensores de datos para tomar mejores decisiones operativas.',
        icon: BarChart3,
        features: [
            'Mapas de calor de tráfico',
            'Conteo de flujo de personas',
            'Análisis de horarios pico',
            'Reportes de eficiencia'
        ]
    }
];

export default function BusinessLandingClient() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-emerald-500/30">
            {/* Navbar */}
            <nav className="fixed w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                            <Building2 className="w-6 h-6" />
                        </div>
                        <span className="font-bold text-xl tracking-tight">CamAI <span className="text-emerald-500">Business</span></span>
                    </Link>
                    <div className="flex items-center gap-6">
                        <Link href="/hogar" className="text-sm font-medium text-slate-400 hover:text-white transition-colors hidden sm:block">
                            ¿Soluciones para el Hogar?
                        </Link>
                        <Link href="/login" className="px-6 py-2.5 rounded-lg border border-slate-700 text-slate-300 font-medium hover:bg-slate-800 transition-all">
                            Portal Cliente
                        </Link>
                        <Link href="/register" className="px-6 py-2.5 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-900/50 hidden md:block">
                            Solicitar Demo
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-24 px-4 relative overflow-hidden">
                {/* Background Grid */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-900/20 rounded-full blur-[120px] -z-10" />

                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-2 py-1 px-3 rounded-md bg-emerald-900/30 border border-emerald-800 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                Enterprise Grade AI
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                                Control total sobre <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                                    activos y operaciones.
                                </span>
                            </h1>
                            <p className="text-lg text-slate-400 mb-8 leading-relaxed max-w-xl">
                                Centraliza la seguridad de todas tus sucursales.
                                Detecta riesgos laborales, controla accesos y optimiza procesos
                                con la infraestructura de cámaras que ya tienes.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/register" className="px-8 py-4 bg-emerald-600 text-white rounded-lg font-bold text-lg hover:bg-emerald-500 transition-all flex items-center justify-center gap-2">
                                    Empezar Ahora <ArrowRight className="w-5 h-5" />
                                </Link>
                                <button className="px-8 py-4 bg-slate-800 text-slate-200 rounded-lg font-bold text-lg hover:bg-slate-700 transition-all border border-slate-700">
                                    Hablar con Ventas
                                </button>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative"
                        >
                            <div className="relative z-10 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
                                <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                                        <span className="font-mono text-sm text-slate-400">LIVE FEED - CAM 04 (ALMACÉN)</span>
                                    </div>
                                    <span className="text-xs font-bold bg-red-500/10 text-red-500 px-2 py-1 rounded">ALERTA DETECTADA</span>
                                </div>
                                <div className="aspect-video bg-slate-950 rounded-lg border border-slate-800 relative overflow-hidden flex items-center justify-center group">
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent opacity-60" />
                                    <AlertTriangle className="w-16 h-16 text-amber-500 mb-2 z-20" />
                                    <p className="absolute bottom-4 left-4 z-20 font-mono text-sm text-amber-400">
                                        [!] PERSONAL SIN CASCO DETECTADO
                                    </p>

                                    {/* Scanning Effect */}
                                    <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.5)] animate-[scan_3s_ease-in-out_infinite]" />
                                </div>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />
                            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Solutions Grid */}
            <section className="py-24 bg-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white mb-4">Soluciones Integrales</h2>
                        <p className="text-slate-400">Módulos especializados para cada necesidad operativa.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {solutions.map((sol, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 rounded-2xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-900/20 transition-all group"
                            >
                                <div className="flex items-start justify-between mb-6">
                                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 group-hover:border-emerald-500/30 transition-colors">
                                        <sol.icon className="w-8 h-8 text-emerald-500" />
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-emerald-400 transition-colors" />
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-3">{sol.title}</h3>
                                <p className="text-slate-400 mb-8 h-12">
                                    {sol.description}
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {sol.features.map((feat, idx) => (
                                        <div key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                                            <CheckSquare className="w-4 h-4 text-emerald-600" />
                                            {feat}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust Section */}
            <section className="py-20 border-t border-slate-900">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-slate-500 text-sm font-semibold uppercase tracking-widest mb-8">
                        Confianza y Seguridad
                    </p>
                    <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Placeholders for logos */}
                        <div className="text-2xl font-bold text-slate-300">ACME Corp</div>
                        <div className="text-2xl font-bold text-slate-300">Global Logistics</div>
                        <div className="text-2xl font-bold text-slate-300">SecureTech</div>
                        <div className="text-2xl font-bold text-slate-300">Industrias Norte</div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-950 border-t border-slate-900 py-12">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-emerald-600" />
                        <span className="font-bold text-slate-300">CamAI Business</span>
                    </div>
                    <p className="text-slate-600 text-sm">© {new Date().getFullYear()} CamAI Enterprise Solutions.</p>
                </div>
            </footer>
        </div>
    );
}
