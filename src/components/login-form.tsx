'use client';

import { useState } from 'react';
import { useAction } from 'next-safe-action/hooks';
import { loginAction } from '@/actions/auth.actions';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, AlertCircle } from 'lucide-react';
import { FaKaaba } from "react-icons/fa6";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { execute, isExecuting, result } = useAction(loginAction, {
    onSuccess: ({ data }) => {
      if (data?.success) {
        router.push('/dashboard');
      }
    },
    onError: ({ error }) => {
      console.error("Error de transporte:", error);
    }
  });

  // 1. CORRECCIÓN ERROR 1: Extraemos el mensaje (string) del objeto de error
  // safe-action devuelve un objeto { message: "..." }, así que accedemos a .message
  const serverErrorMsg = result?.serverError?.message; 
  
  const validationErrors = result?.validationErrors;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    execute({ email, password });
  };

  return (
    <div className="flex flex-col space-y-6 w-full max-w-sm mx-auto p-6 bg-white dark:bg-neutral-900 rounded-lg border border-neutral-300 dark:border-neutral-800 shadow-sm transition-all">
      
      <div className="flex flex-col items-center space-y-2 text-center">
        <div className="flex items-center gap-2 font-bold text-2xl text-neutral-900 dark:text-neutral-50">
          <FaKaaba className="text-neutral-900 dark:text-neutral-50" />
          Stock Flow
        </div>
        <h1 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
          Iniciar Sesión
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Ingresa tus credenciales para acceder
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Renderizamos solo si existe el mensaje de texto */}
        {serverErrorMsg && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            {/* 👈 Aquí pasamos el string, no el objeto */}
            <AlertDescription>{serverErrorMsg}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="tu@email.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isExecuting}
            // 👈 Usamos ?. para verificar si existe email
            className={validationErrors?.email ? "border-red-500 focus-visible:ring-red-500" : ""}
            required
          />
          
          {/* 2. CORRECCIÓN ERROR 2: Encadenamiento opcional profundo (?.) */}
          {/* TypeScript ahora sabe que si algo es undefined, debe detenerse y no fallar */}
          {validationErrors?.email?._errors?.[0] && (
            <p className="text-sm text-red-500 font-medium">
              {validationErrors.email._errors[0]}
            </p>
          )}
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Contraseña</Label>
            <a href="#" className="text-sm font-medium text-neutral-900 dark:text-neutral-50 hover:underline">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <Input 
            id="password" 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isExecuting}
            className={validationErrors?.password ? "border-red-500 focus-visible:ring-red-500" : ""}
            required
          />
           
           {/* Igual aquí: chequeo profundo */}
          {validationErrors?.password?._errors?.[0] && (
            <p className="text-sm text-red-500 font-medium">
              {validationErrors.password._errors[0]}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isExecuting}>
          {isExecuting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Ingresando...
            </>
          ) : (
            'Ingresar'
          )}
        </Button>
      </form>
    </div>
  );
}