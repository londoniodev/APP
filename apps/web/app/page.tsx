import { cookies } from 'next/headers';
import Link from 'next/link';

type MediaType = 'image' | 'video';

type FunctionDetail = {
    name: string;
    description: string;
    warning: string;
    videoLabel: string;
};

type Category = {
    name: string;
    description: string;
    functions: FunctionDetail[];
    media: string[];
};

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

const functionLibrary = {
    deteccionFormaHumana: {
        name: 'Detección de forma humana',
        description:
            'Identifica personas en la escena para activar alarmas o iniciar grabaciones adicionales en patios, accesos y zonas comunes.',
        warning:
            'Precisión limitada en escenas con iluminación extrema o siluetas muy cubiertas. Evita fondos saturados para reducir falsas alarmas.',
        videoLabel: 'Video detección humana'
    },
    deteccionVehiculo: {
        name: 'Detección de vehículo',
        description: 'Detecta la llegada de automóviles o motocicletas en bahías, estacionamientos o cocheras.',
        warning: 'Puede confundir sombras o reflejos como vehículos. Ajusta la zona de interés para excluir vías públicas.',
        videoLabel: 'Video detección vehicular'
    },
    intrusosHumano: {
        name: 'Detección de intrusos (humano)',
        description: 'Dispara alertas cuando una persona ingresa a la zona protegida, ideal para perímetros industriales u hogares.',
        warning:
            'Aún en experimentación. Si una figura humana está muy oculta o aparece una imagen similar, podrían generarse falsas alarmas.',
        videoLabel: 'Video intrusión humana'
    },
    intrusosVehiculos: {
        name: 'Detección de intrusos (vehículos)',
        description: 'Reconoce vehículos no autorizados dentro de un área marcada con reglas de seguridad para patios o garajes.',
        warning:
            'Escenarios con tráfico intenso o carteles con iconografía de autos pueden causar alarmas falsas. Ajusta los horarios de monitoreo.',
        videoLabel: 'Video intrusión vehicular'
    },
    cruceLineaHumanos: {
        name: 'Detección de cruce de línea (humanos)',
        description: 'Permite definir una línea virtual y genera alertas cuando alguien la atraviesa en dirección específica.',
        warning: 'Puede fallar si una figura está muy lejos o la línea está mal posicionada. Revisa la calibración periódicamente.',
        videoLabel: 'Video cruce de línea - humanos'
    },
    cruceLineaVehiculos: {
        name: 'Detección de cruce de línea (vehículos)',
        description:
            'Controla flujos vehiculares al detectar cuando un auto atraviesa una línea de referencia en entradas o caminos internos.',
        warning: 'Peajes o señales similares a autos pueden generar eventos falsos. Ajusta los ángulos de cámara para minimizar reflejos.',
        videoLabel: 'Video cruce de línea - vehículos'
    },
    merodeadores: {
        name: 'Detección de merodeadores',
        description:
            'Detecta personas que permanecen en un área durante más tiempo del permitido, ideal para entradas principales o jardines.',
        warning:
            'Objetos inmóviles o figuras impresas pueden confundirse con merodeadores. Comprueba la escena antes de activar alarmas críticas.',
        videoLabel: 'Video detección de merodeo'
    },
    obstruccionCamara: {
        name: 'Detección de obstrucción de cámaras',
        description: 'Identifica cuando el lente es bloqueado total o parcialmente para enviarte alertas y evitar ceguera operativa.',
        warning:
            'Escenas con un solo color dominante o sin visión nocturna pueden generar falsos positivos. Evalúa el entorno antes de activar la regla.',
        videoLabel: 'Video obstrucción de cámara'
    },
    ausencia: {
        name: 'Ausencia',
        description: 'Detecta cuando no hay presencia en un área crítica durante el tiempo configurado para acompañar a adultos o menores.',
        warning:
            'Puede generar falsos positivos si la cámara no cubre toda la estancia o hay obstrucciones. Ajusta el cronómetro según la rutina real.',
        videoLabel: 'Video ausencia controlada'
    },
    llamadaGesto: {
        name: 'Llamada de gesto',
        description: 'Permite iniciar una llamada bidireccional con un gesto simple frente a la cámara.',
        warning:
            'Gestos similares o decoraciones pueden activar la acción. Valida los fondos y educa a la persona usuaria para evitar activaciones accidentales.',
        videoLabel: 'Video llamada por gesto'
    },
    sonidoLlanto: {
        name: 'Detección de sonido de llanto',
        description: 'Analiza el audio ambiente para enviar notificaciones cuando detecta llanto o angustia en bebés y niños.',
        warning:
            'Ambientes ruidosos o dispositivos que reproduzcan llantos pueden generar alertas falsas. Monitorea el nivel de ruido antes de activar la función.',
        videoLabel: 'Video detección de llanto'
    },
    mascota: {
        name: 'Detección de mascota',
        description: 'Reconoce a tus mascotas cuando cruzan zonas delimitadas para enviarte alertas o iniciar grabaciones.',
        warning: 'Objetos similares a mascotas o estatuas pueden disparar eventos. Evita áreas con juguetes voluminosos frente a la cámara.',
        videoLabel: 'Video detección de mascotas'
    },
    humanosInterior: {
        name: 'Detección de humanos',
        description: 'Supervisa bodegas o áreas internas identificando figuras humanas y activando rutas de seguridad.',
        warning:
            'Maniquíes o impresiones a escala pueden provocar alertas falsas. Revisa la escena y usa zonas excluidas cuando sea necesario.',
        videoLabel: 'Video humanos en interiores'
    },
    vehiculosPropiedad: {
        name: 'Detección de vehículos',
        description: 'Controla patios logísticos u oficinas identificando vehículos que llegan o salen.',
        warning: 'Tráfico público cercano puede intervenir en la detección. Coloca cámaras apuntando hacia áreas controladas.',
        videoLabel: 'Video vehículos en propiedad'
    },
    flujo: {
        name: 'Estadísticas de flujo',
        description: 'Cuenta personas que cruzan una línea virtual para generar reportes de entradas, salidas y aforo.',
        warning:
            'Múltiples personas cruzando al mismo tiempo pueden afectar la precisión. Considera cámaras adicionales si hay alto tránsito.',
        videoLabel: 'Video estadísticas de flujo'
    },
    elementosSeguridad: {
        name: 'Detección de elementos de seguridad (cascos)',
        description: 'Verifica que el personal utilice cascos y otros EPP en áreas industriales críticas.',
        warning:
            'Luces brillantes o cascos con patrones poco comunes pueden reducir la precisión. Ajusta los perfiles por turno y color de uniforme.',
        videoLabel: 'Video detección de EPP'
    }
} satisfies Record<string, FunctionDetail>;

const categories: Category[] = [
    {
        name: 'Vigilante de Exteriores',
        description: 'Monitoreo perimetral que discrimina humanos, vehículos y entradas no autorizadas.',
        functions: [
            functionLibrary.deteccionFormaHumana,
            functionLibrary.deteccionVehiculo,
            functionLibrary.intrusosHumano,
            functionLibrary.intrusosVehiculos,
            functionLibrary.cruceLineaHumanos,
            functionLibrary.cruceLineaVehiculos,
            functionLibrary.merodeadores,
            functionLibrary.obstruccionCamara
        ],
        media: []
    },
    {
        name: 'Cuidado de adultos mayores',
        description: 'Supervisa habitaciones y zonas comunes para detectar ausencia prolongada o solicitudes de ayuda.',
        functions: [functionLibrary.ausencia, functionLibrary.llamadaGesto],
        media: []
    },
    {
        name: 'Cuidado de menores',
        description: 'Acompaña a los más pequeños identificando llanto, gestos y ausencia en las áreas seguras.',
        functions: [functionLibrary.llamadaGesto, functionLibrary.sonidoLlanto, functionLibrary.ausencia],
        media: []
    },
    {
        name: 'Cuidado de mascotas',
        description: 'Recibe avisos cuando tus mascotas entren en áreas restringidas o necesiten atención.',
        functions: [functionLibrary.mascota],
        media: []
    },
    {
        name: 'Cuidado de la propiedad',
        description: 'Protege activos críticos combinando analítica de personas y vehículos en interiores o exteriores.',
        functions: [
            functionLibrary.humanosInterior,
            functionLibrary.vehiculosPropiedad,
            functionLibrary.flujo,
            functionLibrary.intrusosHumano,
            functionLibrary.intrusosVehiculos,
            functionLibrary.cruceLineaHumanos,
            functionLibrary.cruceLineaVehiculos,
            functionLibrary.merodeadores,
            functionLibrary.obstruccionCamara
        ],
        media: []
    },
    {
        name: 'Seguridad industrial',
        description: 'Monitorea líneas de producción, patios logísticos y cumplimiento de equipos de protección personal.',
        functions: [
            functionLibrary.elementosSeguridad,
            functionLibrary.intrusosHumano,
            functionLibrary.intrusosVehiculos,
            functionLibrary.cruceLineaHumanos
        ],
        media: []
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
                                        href="#categorias"
                                        className="px-8 py-4 bg-gray-100 text-gray-900 rounded-xl font-semibold text-lg hover:bg-gray-200 transition-all"
                                    >
                                        Explorar funcionalidades
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
                                            <ul className="mt-6 grid gap-6">
                                                {category.functions.map((fn) => (
                                                    <li key={fn.name} className="rounded-2xl border border-gray-200 p-5">
                                                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                                                            <div className="flex-1">
                                                                <div className="flex items-start gap-3">
                                                                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-blue-500" />
                                                                    <div>
                                                                        <p className="font-semibold text-gray-900">{fn.name}</p>
                                                                        <p className="text-sm text-gray-600 mt-1">{fn.description}</p>
                                                                    </div>
                                                                </div>
                                                                <details className="mt-4 rounded-xl bg-gray-50 p-3 text-sm">
                                                                    <summary className="cursor-pointer font-semibold text-gray-700">
                                                                        Advertencia de uso
                                                                    </summary>
                                                                    <p className="mt-2 text-gray-600">{fn.warning}</p>
                                                                </details>
                                                            </div>
                                                            <div className="w-full lg:w-56">
                                                                <MediaTemplate label={fn.videoLabel} type="video" />
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 text-white">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <p className="text-sm font-semibold uppercase tracking-[0.4em] text-blue-300">Lista para producción</p>
                        <h2 className="text-3xl md:text-4xl font-semibold mt-4">Despliega seguridad inteligente sin fricción</h2>
                        <p className="text-base md:text-lg text-gray-300 mt-4">
                            Integra tus cámaras, define las reglas y coordina alertas para hogares, comercios e industrias desde
                            un solo lugar.
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
                                        Ajustar campañas
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

                <footer className="bg-gray-950 text-gray-400">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                        <div>
                            <p className="text-sm font-semibold text-white">CamAI</p>
                            <p className="text-xs text-gray-500 mt-1">Monitoreo inteligente para hogares y entornos laborales.</p>
                        </div>
                        <div className="flex flex-col gap-2 text-sm md:flex-row md:items-center md:gap-4">
                            <Link href="#mercados" className="hover:text-white transition-colors">
                                Mercados
                            </Link>
                            <Link href="#categorias" className="hover:text-white transition-colors">
                                Categorías
                            </Link>
                            <a href="https://dokploy.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                                Dokploy
                            </a>
                        </div>
                        <p className="text-xs text-gray-500">© {new Date().getFullYear()} CamAI. Todos los derechos reservados.</p>
                    </div>
                </footer>
            </main>
        </div>
    );
}
