'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Home, Building2, ArrowRight } from 'lucide-react';

export default function MainSplitterClient() {
    return (
        <div className="min-h-screen flex flex-col md:flex-row font-sans">
            {/* Home Section */}
            <Link
                href="/hogar"
                className="flex-1 relative group overflow-hidden bg-slate-50 hover:bg-blue-50 transition-colors duration-500 flex flex-col items-center justify-center p-10 text-center border-b md:border-b-0 md:border-r border-slate-200"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100/0 to-blue-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="relative z-10"
                >
                    <div className="w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center mb-8 mx-auto group-hover:shadow-blue-200 transition-shadow">
                        <Home className="w-10 h-10 text-blue-600" />
                    </div>
                    <h2 className="text-4xl font-bold text-slate-900 mb-4">Para el Hogar</h2>
                    <p className="text-slate-500 max-w-sm mx-auto text-lg mb-8">
                        Protege a tu familia, mascotas y propiedad con alertas inteligentes y fáciles de usar.
                    </p>
                    <span className="inline-flex items-center gap-2 text-blue-600 font-bold group-hover:gap-4 transition-all">
                        Entrar a Hogar <ArrowRight className="w-5 h-5" />
                    </span>
                </motion.div>
            </Link>

            {/* Business Section */}
            <Link
                href="/empresas"
                className="flex-1 relative group overflow-hidden bg-slate-950 hover:bg-slate-900 transition-colors duration-500 flex flex-col items-center justify-center p-10 text-center"
            >
                <div className="absolute inset-0 bg-gradient-to-tl from-emerald-900/0 to-emerald-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="relative z-10"
                >
                    <div className="w-24 h-24 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex items-center justify-center mb-8 mx-auto group-hover:border-emerald-500/30 transition-colors">
                        <Building2 className="w-10 h-10 text-emerald-500" />
                    </div>
                    <h2 className="text-4xl font-bold text-white mb-4">Para Empresas</h2>
                    <p className="text-slate-400 max-w-sm mx-auto text-lg mb-8">
                        Soluciones de seguridad industrial, control de activos y cumplimiento normativo.
                    </p>
                    <span className="inline-flex items-center gap-2 text-emerald-500 font-bold group-hover:gap-4 transition-all">
                        Entrar a Empresas <ArrowRight className="w-5 h-5" />
                    </span>
                </motion.div>
            </Link>

            {/* Central Logo/Brand (Absolute Centered) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-full shadow-2xl border border-slate-200 dark:border-slate-800">
                    <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">CamAI</span>
                </div>
            </div>
        </div>
    );
}
