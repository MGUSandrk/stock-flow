"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

// SOLUCIÓN ARQUITECTÓNICA:
// En lugar de importar 'ThemeProviderProps' de una ruta rota,
// le decimos a TypeScript: "Usa los mismos props que espera el componente original".
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}