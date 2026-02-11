'use client'

import { useState } from 'react'
import { signIn } from '@/lib/resource/authResource' // Tu action nativo

// UI Components
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Loader2 } from "lucide-react"
import { FaKaaba } from "react-icons/fa"

export function LoginForm() {
  const [error, setError] = useState<string>('')
  const [isPending, setIsPending] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setIsPending(true)

    const formData = new FormData(e.currentTarget)
    const result = await signIn(formData)

    if (result?.error) {
      setError(result.error)
      setIsPending(false)
    }
  }

  return (
    // ESTILOS: Forzamos el look oscuro y agregamos backdrop-blur para el efecto cristal sobre el fondo de colores
    <div className="relative flex flex-col space-y-6 w-full max-w-sm mx-auto p-8 
                    bg-neutral-900/60 backdrop-blur-md 
                    rounded-2xl border border-white/10 shadow-2xl">
      
      <div className="flex flex-col items-center space-y-2 text-center pt-2">
        <div className="flex items-center gap-2 font-bold text-2xl text-white">
          <FaKaaba className="text-neutral-400" />
          <span>Stock Flow</span>
        </div>
        <h1 className="text-xl font-semibold tracking-tight text-white">
          Bienvenido de nuevo
        </h1>
        <p className="text-sm text-neutral-400">
          Ingresa a tu panel de control
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

        <div className="space-y-2">
          <Label htmlFor="email" className="text-neutral-200">Email</Label>
          <Input 
            id="email" 
            name="email"
            type="email" 
            placeholder="tu@email.com" 
            disabled={isPending}
            required
            // Inputs oscuros semitransparentes
            className="bg-neutral-800/50 border-white/10 text-white placeholder:text-neutral-500 focus-visible:ring-neutral-400"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-neutral-200">Contraseña</Label>
            <a href="#" className="text-sm font-medium text-neutral-400 hover:text-neutral-300 hover:underline">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <Input 
            id="password" 
            name="password"
            type="password" 
            disabled={isPending}
            required
            placeholder='********'
            className="bg-neutral-800/50 border-white/10 text-white placeholder:text-neutral-500 focus-visible:ring-neutral-400"
          />
        </div>

        <Button 
          type="submit" 
          className="w-full bg-neutral-500 hover:bg-neutral-400 text-white transition-all font-semibold shadow-lg shadow-neutral-500/20" 
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Ingresando...
            </>
          ) : (
            'Ingresar'
          )}
        </Button>
      </form>
      
      <p className="px-8 text-center text-sm text-neutral-400">
        ¿Aún no tienes cuenta?{' '}
        <a href="/signup" className="hover:text-white underline underline-offset-4 transition-colors">
          Regístrate
        </a>
      </p>
    </div>
  )
}