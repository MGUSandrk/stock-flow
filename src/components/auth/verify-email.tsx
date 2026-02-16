'use client'

import { useRouter } from 'next/navigation'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/core/utils/utils"
import Link from 'next/link'
import { ChevronLeft, MailCheck } from 'lucide-react'

export function VerifyEmailForm({ className, ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter()

  return (
    <div className={cn("relative flex flex-col space-y-6 w-full max-w-sm mx-auto bg-neutral-900/60 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl", className)}>
      
      {/* --- BOTONES FLOTANTES (Idénticos al Signup) --- */}

      {/* --- TARJETA --- */}
      <Card className="text-center" {...props}>
        <CardHeader>
          {/* Ícono Estilizado */}
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/20">
            <MailCheck className="h-8 w-8 text-primary" />
          </div>
          
          <CardTitle className="text-2xl">Revisa tu correo</CardTitle>
          <CardDescription className="text-base mt-2">
            Te hemos enviado un enlace de confirmación.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="text-sm text-muted-foreground max-w-xs mx-auto">
            <p>
              Por favor, revisa tu bandeja de entrada y haz clic en el enlace para activar tu cuenta y comenzar.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Button 
              onClick={() => router.push("/login")} 
              className="w-full cursor-pointer bg-blue-500 hover:bg-blue-400 text-white transition-all font-semibold shadow-lg shadow-blue-500/20 mt-2"
              size="lg"

            >
              Ir a Iniciar Sesión
            </Button>
            
            {/* <p className="text-xs text-muted-foreground mt-2">
              ¿No lo recibiste? <span className="underline cursor-pointer hover:text-primary">Reenviar correo</span>
            </p> */}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}