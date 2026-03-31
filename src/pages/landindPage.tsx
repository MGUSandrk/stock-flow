/* eslint-disable @next/next/no-img-element */
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { 
  DevicePhoneMobileIcon, 
  CloudIcon, 
  ClockIcon,
} from '@heroicons/react/20/solid'
import { LayoutDashboard } from 'lucide-react'

// --- DATOS ACTUALIZADOS ---
const navigation = [
  { name: 'Producto', href: '#features' },
  // { name: 'Integraciones', href: '#' },
  { name: 'Precios', href: '#pricing' },
  { name: 'Empresa', href: '#sobre-nosotros' },
]

const features = [
  {
    name: 'Acceso 24/7 desde cualquier lugar.',
    description: 'Tu inventario vive en la nube. Accede desde tu casa, el depósito o mientras viajas. Solo necesitas conexión a internet.',
    icon: CloudIcon,
  },
  {
    name: 'Diseñado para Móviles.',
    description: 'No necesitas una computadora. Nuestra interfaz se adapta perfectamente a tu celular para que gestiones todo desde la palma de tu mano.',
    icon: DevicePhoneMobileIcon,
  },
  {
    name: 'Actualización en Tiempo Real.',
    description: 'Cualquier cambio que hagas se refleja instantáneamente para todos los usuarios de tu equipo. Sin retrasos ni conflictos.',
    icon: ClockIcon,
  },
]

// --- FOOTER ---
const FooterSection = () => (
  <footer className="bg-neutral-900 py-12 text-center text-neutral-400 border-t border-white/10">
    <p>&copy; 2026 Stock Flow. Todos los derechos reservados.</p>
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
                <LayoutDashboard className="text-blue-400"/>Stock Flow
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
          {/* <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm/6 font-semibold text-white hover:text-emerald-300 transition-colors">
                {item.name}
              </a>
            ))}
          </div> */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link href="/login" className="text-sm/6 font-semibold text-white cursor-pointer hover:text-blue-300 transition-colors">
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
                    <LayoutDashboard className="text-blue-400"/>
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
        <div className="relative isolate px-6 pt-6 lg:px-8">
            {/* Background effects */}
            <div aria-hidden="true" className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                <div style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }} className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#009dff] to-[#faca50] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75" />
            </div>
            
            <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-40">
                <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                    <div className="relative rounded-full px-3 py-1 text-sm/6 text-neutral-400 ring-1 ring-white/10 hover:ring-white/20">
                     Gestión inteligente para tu negocio.{' '}
                    </div>
                </div>
                <div className="text-center">
                    <h1 className="text-4xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
                     Tu stock, disponible <br/> donde vayas.
                    </h1>
                    <p className="mt-8 text-lg font-medium text-pretty text-neutral-400 sm:text-md/8">
                    Stock Flow es la aplicación web definitiva para controlar tu inventario 24/7. Accede desde tu celular, tablet o computadora con solo tener conexión a internet.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Link
                        href="/signup"
                        className="rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-blue-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 transition-colors"
                    >
                        Comenzar ahora
                    </Link>
                    <a href="/demo/dashboard" className="text-sm/6 font-semibold text-white">
                        Ver demo <span aria-hidden="true">→</span>
                    </a>
                    </div>
                </div>
            </div>
             {/* More background effects */}
             <div aria-hidden="true" className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
                <div style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }} className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75" />
            </div>
        </div>

        {/* --- FEATURES --- */}
        <div id="features" className="overflow-hidden bg-neutral-900 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                <div className="lg:pt-4 lg:pr-8">
                <div className="lg:max-w-lg">
                    <h2 className="text-base/7 font-semibold text-blue-400">Siempre conectado</h2>
                    <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">
                    Gestiona sin límites
                    </p>
                    <p className="mt-6 text-lg/8 text-neutral-300">
                    Ya no dependes de estar en el depósito o frente a la PC de la oficina. Stock Flow te da libertad total para operar tu negocio en movimiento.
                    </p>
                    <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-neutral-400 lg:max-w-none">
                    {features.map((feature) => (
                        <div key={feature.name} className="relative pl-9">
                        <dt className="inline font-semibold text-white">
                            <feature.icon aria-hidden="true" className="absolute top-1 left-1 size-5 text-blue-400" />
                            {feature.name}
                        </dt>{' '}
                        <dd className="inline">{feature.description}</dd>
                        </div>
                    ))}
                    </dl>
                </div>
                </div>
                {/* IMG: Usamos un div placeholder o tu imagen */}
                <div className="relative max-sm:hidden">
                   <img
                    alt="App en movil y escritorio"
                    src="/main.PNG"
                    width={2432}
                    height={1442}
                    className="w-3xl max-w-none rounded-xl shadow-xl ring-1 ring-white/10 sm:w-228 md:-ml-4 lg:ml-0 opacity-80 hover:opacity-100 transition-opacity"
                   />
                </div>
            </div>
            </div>
        </div>

        {/* --- PRICING (COMENTADO POR AHORA) --- */}
        {/* <div id="pricing" className="relative isolate bg-neutral-900 px-6 py-24 sm:py-32 lg:px-8">
           ... código de precios ...
        </div> 
        */}
      </main>

      <FooterSection />
    </div>
  )
}