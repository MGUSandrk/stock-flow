import { VerifyEmailForm } from '@/components/auth/verify-email'
import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'

export default function VerifyEmailPage() {
  return (
    <div className="relative isolate flex min-h-svh w-full items-center justify-center p-6 md:p-10  bg-neutral-900 ">
      <div className="w-full max-w-sm">
        <div aria-hidden="true" className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }} className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#009dff] to-[#faca50] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>
      <div aria-hidden="true" className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <div style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }} className="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" />
      </div>
      <div className="absolute top-6 left-6 z-20">
        <Link href="/" className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors">
            <ArrowLeftIcon className="h-5 w-5" />
            <span className="text-sm font-medium">Volver al inicio</span>
        </Link>
      </div>
        <VerifyEmailForm />
      </div>
    </div>
  )
}