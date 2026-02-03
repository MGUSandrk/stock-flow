'use client'

import { useState } from 'react'
import Link from 'next/link' // 👈 CAMBIO CRÍTICO: Next.js Link
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { 
  ShoppingBagIcon, 
  CurrencyDollarIcon, 
  ArrowPathIcon,
  CheckIcon
} from '@heroicons/react/20/solid'
import { FaKaaba } from 'react-icons/fa6'

// --- DATOS ---
const navigation = [
  { name: 'Producto', href: '#features' },
  // { name: 'Integraciones', href: '#' },
  { name: 'Precios', href: '#pricing' },
  { name: 'Empresa', href: '#sobre-nosotros' },
]

const features = [
  {
    name: 'Sincronización con MercadoLibre API.',
    description: 'Conecta tu cuenta de vendedor y mantén tu inventario actualizado automáticamente cada vez que realizas una venta.',
    icon: ArrowPathIcon,
  },
  {
    name: 'Gestión de Stock Centralizada.',
    description: 'Olvídate de las planillas de excel. Controla tu stock físico y online desde un único panel de control intuitivo.',
    icon: ShoppingBagIcon,
  },
  {
    name: 'Reportes de Rentabilidad.',
    description: 'Analiza tus márgenes de ganancia reales descontando las comisiones de MercadoLibre y costos de envío.',
    icon: CurrencyDollarIcon,
  },
]

const tiers = [
  {
    name: 'Emprendedor',
    id: 'tier-hobby',
    href: '#',
    priceMonthly: '$29',
    description: "Ideal si estás comenzando a profesionalizar tu negocio.",
    features: ['Hasta 500 productos', '1 Cuenta de MercadoLibre', 'Sincronización cada 15 min', 'Soporte por Email'],
    featured: false,
  },
  {
    name: 'Empresa',
    id: 'tier-enterprise',
    href: '#',
    priceMonthly: '$99',
    description: 'Infraestructura dedicada para vendedores MercadoLíder.',
    features: [
      'Productos Ilimitados',
      'Múltiples cuentas de MercadoLibre',
      'Sincronización en tiempo real',
      'Soporte Prioritario 24/7',
      'API de facturación',
      'Múltiples depósitos',
    ],
    featured: true,
  },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

// --- FOOTER PLACEHOLDER (Para que compile) ---
const FooterSection = () => (
  <footer className="bg-neutral-900 py-12 text-center text-neutral-400 border-t border-white/10">
    <p>&copy; 2024 Stock Flow. Todos los derechos reservados.</p>
  </footer>
)

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-neutral-900 min-h-screen">
      
      {/* --- HEADER --- */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="flex items-center justify-between p-5 lg:px-8">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
              <span className="sr-only">Stock Flow</span>
              <span className="flex items-center gap-2 text-white font-bold text-xl">
                <FaKaaba className="text-emerald-300"/>Stock Flow
              </span>
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-neutral-200"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm/6 font-semibold text-white hover:text-emerald-300 transition-colors">
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {/* CAMBIO: Usamos Link de Next.js. 
                Esto hace prefetching y navegación instantánea sin recarga. 
            */}
            <Link href="/login" className="text-sm/6 font-semibold text-white cursor-pointer hover:text-emerald-300 transition-colors">
              Iniciar Sesion <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </nav>
        
        {/* MOBILE MENU */}
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-neutral-900 p-6 sm:max-w-sm sm:ring-1 sm:ring-neutral-100/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
                <span className="sr-only">Stock Flow</span>
                <span className="flex items-center gap-2 text-white font-bold text-xl">
                    <FaKaaba className="text-emerald-300"/>
                </span>
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-neutral-200"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-white/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <Link
                    href="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-white/5"
                  >
                    Log in
                  </Link>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      <main>
        {/* --- HERO --- */}
        <div className="relative isolate px-6 pt-14 lg:px-8">
            {/* Background effects ... */}
            <div aria-hidden="true" className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                <div style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }} className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#009dff] to-[#faca50] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75" />
            </div>
            
            <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-40">
                <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                    {/* <div className="relative rounded-full px-3 py-1 text-sm/6 text-neutral-400 ring-1 ring-white/10 hover:ring-white/20">
                    Nueva integración con MercadoEnvíos Full.{' '}
                    <a href="#" className="font-semibold text-emerald-300">
                        <span aria-hidden="true" className="absolute inset-0" />
                        Leer más <span aria-hidden="true">&rarr;</span>
                    </a>
                    </div> */}
                </div>
                <div className="text-center">
                    <h1 className="text-4xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
                    Tu inventario centralizado en un unico lugar.
                    </h1>
                    <p className="mt-8 text-lg font-medium text-pretty text-neutral-400 sm:text-md/8">
                    Stock Flow te permite gestionar tu negocio físico de manera online en un solo lugar. Evita quiebres de stock, sincroniza ventas y automatiza tu logística.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Link
                        href="/dashboard" // CAMBIO: Apuntamos a la demo que ya construimos
                        className="rounded-md bg-emerald-300 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-emerald-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 transition-colors"
                    >
                        Ver demo
                    </Link>
                    <a href="#features" className="text-sm/6 font-semibold text-white">
                        Ver características <span aria-hidden="true">→</span>
                    </a>
                    </div>
                </div>
            </div>
            {/* More background effects */}
        </div>

        {/* --- FEATURES --- */}
        <div id="features" className="overflow-hidden bg-neutral-900 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                <div className="lg:pt-4 lg:pr-8">
                <div className="lg:max-w-lg">
                    <h2 className="text-base/7 font-semibold text-emerald-300">Automatiza todo</h2>
                    <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">
                    Un flujo de trabajo mejorado
                    </p>
                    <p className="mt-6 text-lg/8 text-neutral-300">
                    Deja de pausar publicaciones manualmente. Stock Flow detecta tus ventas en el local y actualiza MercadoLibre al instante, y viceversa.
                    </p>
                    <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-neutral-400 lg:max-w-none">
                    {features.map((feature) => (
                        <div key={feature.name} className="relative pl-9">
                        <dt className="inline font-semibold text-white">
                            <feature.icon aria-hidden="true" className="absolute top-1 left-1 size-5 text-emerald-300" />
                            {feature.name}
                        </dt>{' '}
                        <dd className="inline">{feature.description}</dd>
                        </div>
                    ))}
                    </dl>
                </div>
                </div>
                {/* IMG: Asegúrate de tener main.PNG en la carpeta public */}
                <img
                alt="Dashboard de Stock Flow"
                src="/main.PNG" 
                width={2432}
                height={1442}
                className="w-3xl max-w-none rounded-xl shadow-xl ring-1 ring-white/10 sm:w-228 md:-ml-4 lg:-ml-0"
                />
            </div>
            </div>
        </div>

        {/* --- PRICING --- */}
        <div id="pricing" className="relative isolate bg-neutral-900 px-6 py-24 sm:py-32 lg:px-8">
            {/* Background effects... */}
            <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-base/7 font-semibold text-emerald-300">Precios</h2>
            <p className="mt-2 text-5xl font-semibold tracking-tight text-balance text-white sm:text-6xl">
                El plan correcto para tu crecimiento
            </p>
            </div>
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty text-neutral-400 sm:text-xl/8">
            Elige un plan accesible que escale con tus ventas. Sin comisiones por transacción, solo una suscripción fija.
            </p>
            <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
            {tiers.map((tier, tierIdx) => (
                <div
                key={tier.id}
                className={classNames(
                    tier.featured ? 'relative bg-neutral-800' : 'bg-white/2.5 sm:mx-8 lg:mx-0',
                    tier.featured
                    ? ''
                    : tierIdx === 0
                    ? 'rounded-t-3xl sm:rounded-b-none lg:rounded-tr-none lg:rounded-bl-3xl'
                    : 'sm:rounded-t-none lg:rounded-tr-3xl lg:rounded-bl-none',
                    'rounded-3xl p-8 ring-1 ring-white/10 sm:p-10',
                )}
                >
                <h3 id={tier.id} className="text-emerald-300 text-base/7 font-semibold">
                    {tier.name}
                </h3>
                <p className="mt-4 flex items-baseline gap-x-2">
                    <span className="text-white text-5xl font-semibold tracking-tight">
                    {tier.priceMonthly}
                    </span>
                    <span className="text-neutral-400 text-base">/mes</span>
                </p>
                <p className="text-neutral-300 mt-6 text-base/7">
                    {tier.description}
                </p>
                <ul role="list" className="text-neutral-300 mt-8 space-y-3 text-sm/6 sm:mt-10">
                    {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                        <CheckIcon aria-hidden="true" className="text-emerald-300 h-6 w-5 flex-none" />
                        {feature}
                    </li>
                    ))}
                </ul>
                <a
                    href={tier.href}
                    aria-describedby={tier.id}
                    className={classNames(
                    tier.featured
                        ? 'bg-emerald-300 text-white hover:bg-emerald-400 focus-visible:outline-emerald-300'
                        : 'bg-white/10 text-white inset-ring inset-ring-white/5 hover:bg-white/20 focus-visible:outline-white/75',
                    'mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10 transition-colors',
                    )}
                >
                    Empezar ahora
                </a>
                </div>
            ))}
            </div>
        </div>
        <section id="sobre-nosotros" className="relative isolate bg-neutral-900 py-24 sm:py-32 font-['Inter']">
          {/* <div className="absolute inset-0 -z-10 flex justify-center overflow-hidden">
              <div className="w-[60rem] h-[30rem] bg-emerald-600/5 blur-[120px] rounded-full"></div>
          </div> */}

          <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-3xl text-center">
                  <h2 className="text-emerald-300 font-semibold tracking-[0.2em] uppercase text-xs mb-8">Nuestra Misión</h2>
                  
                  <h3 className="text-4xl font-bold tracking-tighter text-white sm:text-6xl mb-12">
                      Hacemos que lo complejo se vuelva <span className="text-emerald-300">rentable</span>.
                  </h3>

                  <div className="space-y-8">
                      <p className="text-xl text-gray-400 leading-relaxed font-light">
                          En <span className="text-white font-semibold">Innovate Digital</span>, nuestra misión es clara: democratizar la tecnología de alto rendimiento para negocios en crecimiento. Creemos que la digitalización no es un lujo, sino el motor fundamental de las ventas modernas.
                      </p>
                      
                      <p className="text-xl text-gray-400 leading-relaxed font-light">
                          No solo implementamos herramientas; diseñamos ecosistemas donde Mercado Libre y Gestión de Stock trabajan en perfecta armonía. Maximizamos tu tiempo para que puedas enfocarte en lo que mejor haces: escalar tu visión.
                      </p>
                  </div>

                  <div className="mt-20 grid grid-cols-1 gap-y-12 sm:grid-cols-3 sm:gap-x-8 sm:gap-y-0 border-t border-white/10 pt-12">
                      <div>
                          <div className="text-white font-bold text-2xl mb-2 tracking-tight">Foco</div>
                          <p className="text-sm text-gray-500">Eliminamos el ruido digital para centrarnos en lo que genera ROI.</p>
                      </div>
                      <div>
                          <div className="text-white font-bold text-2xl mb-2 tracking-tight">Agilidad</div>
                          <p className="text-sm text-gray-500">Respuestas rápidas para un mercado que nunca duerme.</p>
                      </div>
                      <div>
                          <div className="text-white font-bold text-2xl mb-2 tracking-tight">Datos</div>
                          <p className="text-sm text-gray-500">Decisiones basadas en números, no en suposiciones.</p>
                      </div>
                  </div>
              </div>
          </div>
      </section>
      </main>

      <FooterSection />
    </div>
  )
}