'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    Shield,
    Home,
    Heart,
    Dog,
    Baby,
    Bell,
    Video,
    Mic,
    CheckCircle2,
    ArrowRight
} from 'lucide-react';

const features = [
    {
        title: 'Protección Perimetral',
        description: 'Detecta intrusos humanos en tu jardín o entrada antes de que lleguen a tu puerta. Ignora ramas o gatos callejeros.',
        icon: Shield,
        details: [
            'Detección de forma humana precisa',
            'Zonas de alerta personalizables',
            'Notificaciones instantáneas al móvil'
        ]
    },
    {
        title: 'Cuidado de Mascotas',
        description: '¿Tu perro se subió al sofá? ¿Tu gato salió al jardín? Recibe alertas inteligentes sobre tus compañeros peludos.',
        icon: Dog,
        details: [
            'Identificación específica de mascotas',
            'Alertas de zonas prohibidas',
            'Grabación de momentos divertidos'
        ]
    },
    {
        title: 'Monitor de Bebés y Niños',
        description: 'Mucho más que una cámara. Detecta llanto, movimiento o si tu hijo se despierta, dándote tranquilidad total.',
        icon: Baby,
        details: [
            'Detección de sonido de llanto',
            'Alerta de ausencia en cuna',
            'Comunicación bidireccional'
        ]
    },
    {
        title: 'Cuidado de Adultos Mayores',
        description: 'Mantén la independencia de tus seres queridos con seguridad. Detecta caídas o inactividad inusual.',
        icon: Heart,
        details: [
            'Llamada de emergencia por gesto',
            'Detección de inactividad prolongada',
            'Privacidad respetuosa'
        ]
    }
];

export default function HomeLandingClient() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200">
            {/* Navbar */}
            <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform">
                            <Home className="w-6 h-6" />
                        </div>
                        <span className="font-bold text-xl tracking-tight">CamAI <span className="text-blue-600">Hogar</span></span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link href="/empresas" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors hidden sm:block">
                            ¿Buscas para Empresas?
                        </Link>
                        <Link href="/login" className="px-6 py-2.5 rounded-full bg-slate-900 text-white font-medium hover:bg-slate-800 transition-all hover:shadow-lg">
                            Acceder
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4 overflow-hidden relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-100/50 rounded-full blur-[100px] -z-10" />

                <div className="max-w-5xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block py-1 px-4 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-6 tracking-wide">
                            SEGURIDAD RESIDENCIAL INTELIGENTE
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-8 leading-tight">
                            Tu hogar, más seguro <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                                y conectado que nunca.
                            </span>
                        </h1>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                            Transforma tus cámaras en un sistema de cuidado activo.
                            Desde proteger tu entrada hasta avisarte si el bebé llora,
                            todo en una sola app fácil de usar.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/register" className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all hover:scale-105 shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2">
                                Probar Gratis en Casa <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link href="#features" className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center">
                                Ver Funciones
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Tranquilidad en cada rincón</h2>
                        <p className="text-lg text-slate-600">Tecnología avanzada adaptada a la vida familiar.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {features.map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-500/5 transition-all group"
                            >
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                    <feature.icon className="w-7 h-7 text-blue-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                                <p className="text-slate-600 mb-6 leading-relaxed">
                                    {feature.description}
                                </p>
                                <ul className="space-y-3">
                                    {feature.details.map((detail, idx) => (
                                        <li key={idx} className="flex items-center gap-3 text-slate-700 font-medium">
                                            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                            {detail}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Visual Demo Section (Placeholder for now) */}
            <section className="py-24 bg-slate-900 text-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8">Lo que ves vs. Lo que detectamos</h2>
                    <div className="relative rounded-3xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-800 aspect-video max-w-4xl mx-auto flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent z-10" />
                        <p className="relative z-20 text-slate-400 flex items-center gap-2">
                            <Video className="w-6 h-6" />
                            Demo interactiva de detección (Próximamente)
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white border-t border-slate-200 py-12">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-slate-500">© {new Date().getFullYear()} CamAI Hogar. Seguridad inteligente para tu familia.</p>
                </div>
            </footer>
        </div>
    );
}
