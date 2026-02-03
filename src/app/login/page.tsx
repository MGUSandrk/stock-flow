import Link from 'next/link';
import { LoginForm } from '@/components/login-form';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-300 relative">
      
      {/* 1. BOTÓN VOLVER (Esquina Superior Izquierda) */}
      <div className="absolute top-4 left-4 md:top-8 md:left-8">
        <Button asChild variant="ghost" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50">
          <Link href="/" className="flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            Volver al inicio
          </Link>
        </Button>
      </div>

      {/* 2. THEME TOGGLE (Esquina Superior Derecha) */}
      <div className="absolute top-4 right-4 md:top-8 md:right-8">
        <ThemeToggle />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-neutral-900 dark:text-neutral-50">
          Bienvenido de nuevo
        </h2>
        <p className="mt-2 text-center text-sm text-neutral-600 dark:text-neutral-400">
          Inicia sesión para gestionar tu inventario
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-neutral-900 py-8 px-4 shadow sm:rounded-lg sm:px-10 border  border-neutral-300 dark:border-neutral-800 transition-colors duration-300">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}