import { cookies } from 'next/headers';
import Link from 'next/link';

type MediaType = 'image' | 'video';

const heroHighlights = [
    {
        title: 'Seguridad del hogar',
        description: 'Cubre accesos, cuida a la familia y recibe alertas sin ruido.'
    },
    {
        title: 'Seguridad laboral',
        description: 'Controla perímetros, líneas de producción y patios industriales.'
    }
];

const marketSegments = [
    {
        title: 'Seguridad del hogar',
        description: 'Automatiza la detección de intrusiones, sonidos y gestos para proteger tu hogar en todo momento.',
        checklist: [
            'Protección de entradas, patios y cocheras',
            'Alertas inteligentes para familia, visitas y mascotas',
            'Reportes listos para compartir con tu red de confianza'
        ],
        templateLabel: 'Imagen referencia hogar'
    },
    {
        title: 'Seguridad laboral',
        description: 'Monitorea operaciones logísticas y áreas críticas con reglas personalizadas por turnos y zonas.',
        checklist: [
            'Prevención de riesgos laborales y cumplimiento normativo',
            'Seguimiento del flujo de personas y vehículos',
            'Integración con protocolos de respuesta y evacuación'
        ],
        templateLabel: 'Imagen referencia trabajo'
    }
];

const categories = [
    {
        name: 'Vigilante de Exteriores',
        description: 'Monitoreo perimetral que discrimina humanos, vehículos y entradas no autorizadas.',
        functions: [
            'Detección de forma humana',
            'Detección de vehículo',
            'Detección de intrusos (humano)',
            'Detección de intrusos (vehículos)',
            'Detección de cruce de línea (humanos)',
            'Detección de cruce de línea (vehículos)',
            'Detección de merodeadores',
            'Detección de obstrucción de cámaras'
        ],
        media: ['Exteriores - Plantilla 1', 'Exteriores - Plantilla 2']
    },
    {
        name: 'Cuidado de adultos mayores',
        description: 'Supervisa habitaciones y zonas comunes para detectar ausencia prolongada o solicitudes de ayuda.',
        functions: ['Ausencia', 'Llamada de gesto'],
        media: ['Adultos mayores - Plantilla']
    },
    {
        name: 'Cuidado de menores',
        description: 'Acompaña a los más pequeños identificando llanto, gestos y ausencia en las áreas seguras.',
        functions: ['Llamada de gesto', 'Detección de sonido de llanto', 'Ausencia'],
        media: ['Menores - Plantilla']
    },
    {
        name: 'Cuidado de mascotas',
        description: 'Recibe avisos cuando tus mascotas entren en áreas restringidas o necesiten atención.',
        functions: ['Detección de mascota'],
        media: ['Mascotas - Plantilla']
    },
    {
        name: 'Cuidado de la propiedad',
        description: 'Protege activos críticos combinando analítica de personas y vehículos en interiores o exteriores.',
        functions: [
            'Detección de humanos',
            'Detección de vehículos',
            'Estadísticas de flujo',
            'Detección de intrusos (humano)',
            'Detección de intrusos (vehículos)',
            'Detección de cruce de línea (humanos)',
            'Detección de cruce de línea (vehículos)',
            'Detección de merodeadores',
            'Detección de obstrucción de cámaras'
        ],
        media: ['Propiedad - Plantilla 1', 'Propiedad - Plantilla 2']
    }
];

const closingBenefits = [
    'Alertas contextuales para hogar y trabajo desde la misma app.',
    'Panel unificado con historiales auditables para tus equipos.',
    'Listo para integrarse a tus flujos de despliegue con Dokploy.'
];

const MediaTemplate = ({ label, type = 'image' }: { label: string; type?: MediaType }) => {
    const isVideo = type === 'video';

    return (
        <div
            className={`rounded-2xl border border-dashed ${
                isVideo ? 'border-blue-400 bg-blue-50/70' : 'border-gray-300 bg-gray-50'
            } p-6 flex flex-col items-center justify-center text-center gap-3 w-full min-h-[200px]`}
        >
            <div
                className={`flex h-12 w-12 items-center justify-center rounded-full ${
                    isVideo ? 'bg-blue-600/10 text-blue-600' : 'bg-gray-600/10 text-gray-600'
                }`}
            >
                {isVideo ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5v14l11-7z" />
                    </svg>
                ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5h16v14H4z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 15l5-5 4 4 3-3 4 4" />
                    </svg>
                )}
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
                {isVideo ? 'Template video' : 'Template imagen'}
            </p>
            <p className="text-base font-medium text-gray-700">{label}</p>
        </div>
    );
};

export default async function LandingPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');
    const isLoggedIn = !!token;

    return (
        <div className="min-h-screen bg-white text-gray-900">
            <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                            <span className="font-bold text-xl text-gray-900">CamAI</span>
                        </div>
                        <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-gray-600">
                            <Link href="#mercados" className="hover:text-gray-900 transition-colors">
                                Mercados
                            </Link>
                            <Link href="#categorias" className="hover:text-gray-900 transition-colors">
                                Categorías
                            </Link>
                            <Link href="#demo" className="hover:text-gray-900 transition-colors">
                                Demo
                            </Link>
                        </div>
                        <div className="flex items-center gap-3">
                            {isLoggedIn ? (
                                <>
                                    <Link
                                        href="/dashboard"
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                                    >
                                        Ir al panel
                                    </Link>
                                    <Link
                                        href="#categorias"
                                        className="hidden sm:inline-flex text-sm text-gray-600 hover:text-gray-900 font-semibold transition-colors"
                                    >
                                        Explorar categorías
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                                    >
                                        Iniciar sesión
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                                    >
                                        Comenzar gratis
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <main>
                <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-blue-50 to-white">
                    <div className="max-w-6xl mx-auto text-center">
                        <p className="text-xs font-semibold tracking-[0.5em] uppercase text-blue-600 mb-6">
                            Seguridad del hogar + seguridad laboral
                        </p>
                        <h1 className="text-4xl md:text-6xl font-semibold text-gray-900 tracking-tight">
                            Protege hogares y equipos con IA en tiempo real
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mt-6">
                            Una única plataforma que detecta intrusiones, cuida a tu familia, vigila activos críticos y genera
                            evidencia lista para compartir con tu equipo laboral.
                        </p>
                        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                            {isLoggedIn ? (
                                <>
                                    <Link
                                        href="/dashboard"
                                        className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all hover:scale-105 shadow-lg shadow-blue-500/30"
                                    >
                                        Ir al panel
                                    </Link>
                                    <Link
                                        href="#categorias"
                                        className="px-8 py-4 bg-gray-100 text-gray-900 rounded-xl font-semibold text-lg hover:bg-gray-200 transition-all"
                                    >
                                        Explorar capacidades
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/register"
                                        className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all hover:scale-105 shadow-lg shadow-blue-500/30"
                                    >
                                        Comenzar prueba gratuita
                                    </Link>
                                    <Link
                                        href="#demo"
                                        className="px-8 py-4 bg-gray-100 text-gray-900 rounded-xl font-semibold text-lg hover:bg-gray-200 transition-all"
                                    >
                                        Ver demo funcional
                                    </Link>
                                </>
                            )}
                        </div>
                        <div className="mt-12 grid gap-6 md:grid-cols-2">
                            {heroHighlights.map((highlight) => (
                                <div
                                    key={highlight.title}
                                    className="rounded-3xl border border-gray-200 bg-white/80 p-6 text-left shadow-sm"
                                >
                                    <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest">
                                        {highlight.title}
                                    </p>
                                    <p className="mt-3 text-base text-gray-600">{highlight.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="mercados" className="py-20 bg-white">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto mb-12">
                            <p className="text-sm font-semibold text-blue-600 uppercase tracking-[0.4em]">Segmentación</p>
                            <h2 className="text-3xl md:text-4xl font-semibold mt-4">Un mensaje claro para cada mercado</h2>
                            <p className="text-gray-600 mt-4">
                                Personaliza los flujos y plantillas visuales para clientes residenciales o corporativos sin
                                duplicar esfuerzos.
                            </p>
                        </div>
                        <div className="grid gap-8 md:grid-cols-2">
                            {marketSegments.map((segment) => (
                                <div
                                    key={segment.title}
                                    className="rounded-3xl border border-gray-200 p-8 flex flex-col gap-6 bg-gray-50/60"
                                >
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.4em] text-gray-500">Mercado</p>
                                        <h3 className="text-2xl font-semibold text-gray-900 mt-2">{segment.title}</h3>
                                        <p className="text-gray-600 mt-3">{segment.description}</p>
                                    </div>
                                    <MediaTemplate label={segment.templateLabel} />
                                    <ul className="space-y-3 text-sm text-gray-600">
                                        {segment.checklist.map((item) => (
                                            <li key={item} className="flex items-start gap-2">
                                                <span className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="categorias" className="py-20 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto mb-12">
                            <p className="text-sm font-semibold text-blue-600 uppercase tracking-[0.4em]">Categorías</p>
                            <h2 className="text-3xl md:text-4xl font-semibold mt-4">
                                Funciones específicas para cada necesidad
                            </h2>
                            <p className="text-gray-600 mt-4">
                                Construye paquetes de valor basados en las siguientes categorías y agrega las imágenes reales
                                cuando estén aprobadas por tu equipo creativo.
                            </p>
                        </div>
                        <div className="space-y-8">
                            {categories.map((category, index) => (
                                <div key={category.name} className="rounded-3xl bg-white border border-gray-200 p-8 shadow-sm">
                                    <div className="flex flex-col gap-8 lg:flex-row">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3">
                                                <span className="h-10 w-10 rounded-full bg-blue-600/10 text-blue-600 font-semibold flex items-center justify-center">
                                                    {index + 1}
                                                </span>
                                                <h3 className="text-2xl font-semibold">{category.name}</h3>
                                            </div>
                                            <p className="text-gray-600 mt-4">{category.description}</p>
                                            <ul className="mt-6 grid gap-3 sm:grid-cols-2 text-sm text-gray-700">
                                                {category.functions.map((fn) => (
                                                    <li key={fn} className="flex items-start gap-3">
                                                        <span className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                                                        <span>{fn}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="w-full lg:max-w-xs flex flex-col gap-4 self-start">
                                            {category.media.map((label) => (
                                                <MediaTemplate key={label} label={label} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="demo" className="py-20 bg-white">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <p className="text-sm font-semibold text-blue-600 uppercase tracking-[0.4em]">Demo</p>
                        <h2 className="text-3xl md:text-4xl font-semibold mt-4">Muestra visual de la funcionalidad</h2>
                        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                            Inserta aquí tu video de referencia para demostrar cómo se detectan eventos en hogares y entornos
                            laborales. El placeholder mantiene la proporción y estilo del diseño final.
                        </p>
                        <div className="mt-8">
                            <MediaTemplate label="Demo multisectorial" type="video" />
                        </div>
                    </div>
                </section>

                <section id="cta" className="py-20 bg-gray-900 text-white">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl md:text-4xl font-semibold">Activa tu landing dual en minutos</h2>
                        <p className="text-base md:text-lg text-gray-300 mt-4">
                            Configura las plantillas, agrega tus imágenes y despliega con Dokploy para mantener una entrega
                            continua y segura.
                        </p>
                        <ul className="mt-8 space-y-3 text-left text-gray-200 max-w-3xl mx-auto">
                            {closingBenefits.map((benefit) => (
                                <li key={benefit} className="flex items-start gap-3">
                                    <span className="mt-1 h-2 w-2 rounded-full bg-blue-400" />
                                    <span>{benefit}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                            {isLoggedIn ? (
                                <>
                                    <Link
                                        href="/dashboard"
                                        className="px-8 py-4 bg-blue-500 text-white rounded-xl font-semibold text-lg hover:bg-blue-400 transition-all"
                                    >
                                        Configurar campañas
                                    </Link>
                                    <Link
                                        href="#mercados"
                                        className="px-8 py-4 bg-white/10 text-white rounded-xl font-semibold text-lg hover:bg-white/20 transition-all"
                                    >
                                        Revisar segmentos
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/register"
                                        className="px-8 py-4 bg-blue-500 text-white rounded-xl font-semibold text-lg hover:bg-blue-400 transition-all"
                                    >
                                        Crear cuenta ahora
                                    </Link>
                                    <Link
                                        href="/login"
                                        className="px-8 py-4 bg-white/10 text-white rounded-xl font-semibold text-lg hover:bg-white/20 transition-all"
                                    >
                                        Ya tengo una cuenta
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
