'use client'

import { useState } from 'react'
import { signUp } from '@/lib/resource/authResource' // Tu action nativo de registro

// UI Components
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Loader2 } from "lucide-react"
import { FaKaaba } from "react-icons/fa"
import Link from 'next/link'

export function SignUpForm() {
  const [error, setError] = useState<string>('')
  const [isPending, setIsPending] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setIsPending(true)

    const formData = new FormData(e.currentTarget)
    
    // Validamos contraseñas en cliente para feedback rápido
    const pass = formData.get('password') as string
    const confirm = formData.get('confirm-password') as string
    
    if (pass !== confirm) {
        setError('Las contraseñas no coinciden')
        setIsPending(false)
        return
    }

    const result = await signUp(formData)

    if (result?.error) {
      setError(result.error)
      setIsPending(false)
    }
  }

  return (
    // ESTILOS: Fondo oscuro semitransparente con efecto blur
    <div className="relative flex flex-col space-y-6 w-full max-w-sm mx-auto p-8 
                    bg-neutral-900/60 backdrop-blur-md 
                    rounded-2xl border border-white/10 shadow-2xl">
      
      <div className="flex flex-col items-center space-y-2 text-center pt-2">
        <div className="flex items-center gap-2 font-bold text-2xl text-white">
          <FaKaaba className="text-blue-400" />
          <span>Stock Flow</span>
        </div>
        <h1 className="text-xl font-semibold tracking-tight text-white">
          Crea tu cuenta
        </h1>
        <p className="text-sm text-neutral-400">
          Comienza a gestionar tu stock hoy
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {error && (
          <Alert variant="destructive" className="bg-red-900/50 border-red-900 text-red-200">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Nombre Completo */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-neutral-200">Nombre Completo</Label>
          <Input 
            id="name" 
            name="name"
            type="text" 
            placeholder="Juan Pérez"
            disabled={isPending}
            required
            className="bg-neutral-800/50 border-white/10 text-white placeholder:text-neutral-500 focus-visible:ring-blue-400"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-neutral-200">Email</Label>
          <Input 
            id="email" 
            name="email"
            type="email" 
            placeholder="tu@email.com" 
            disabled={isPending}
            required
            className="bg-neutral-800/50 border-white/10 text-white placeholder:text-neutral-500 focus-visible:ring-blue-400"
          />
        </div>
        
        {/* Contraseña */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-neutral-200">Contraseña</Label>
          <Input 
            id="password" 
            name="password"
            type="password" 
            placeholder="••••••••"
            disabled={isPending}
            required
            className="bg-neutral-800/50 border-white/10 text-white placeholder:text-neutral-500 focus-visible:ring-blue-400"
          />
        </div>

        {/* Confirmar Contraseña */}
        <div className="space-y-2">
          <Label htmlFor="confirm-password" className="text-neutral-200">Confirmar Contraseña</Label>
          <Input 
            id="confirm-password" 
            name="confirm-password"
            type="password" 
            placeholder="••••••••"
            disabled={isPending}
            required
            className="bg-neutral-800/50 border-white/10 text-white placeholder:text-neutral-500 focus-visible:ring-blue-400"
          />
        </div>

        <Button 
          type="submit" 
          className="w-full bg-blue-500 hover:bg-blue-400 text-white transition-all font-semibold shadow-lg shadow-blue-500/20 mt-2" 
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creando cuenta...
            </>
          ) : (
            'Registrarse'
          )}
        </Button>
      </form>
      
      <p className="px-8 text-center text-sm text-neutral-400">
        ¿Ya tienes cuenta?{' '}
        <Link href="/login" className="hover:text-white underline underline-offset-4 transition-colors">
          Inicia sesión
        </Link>
      </p>
    </div>
  )
}