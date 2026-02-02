'use server';

import { actionClient } from '@/lib/utils/safe-actions';
import { AuthService } from '@/lib/services/auth.service';
import { z } from 'zod';
import { redirect } from 'next/navigation';

// 1. Definimos el esquema
const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "La contraseña es requerida"),
});

export const loginAction = actionClient
  .schema(loginSchema)
  // 👇 CAMBIO AQUÍ: No desestructuramos profundamente en los argumentos
  .action(async ({ parsedInput }) => {
    
    // Lo extraemos aquí dentro, TypeScript ahora sí entiende qué es parsedInput
    const { email, password } = parsedInput;

    // Llamamos al servicio
    await AuthService.login({ email, password });
    
    return { success: true };
  });

  export const logoutAction = actionClient
  .action(async () => {
    await AuthService.logout();
    redirect('/login'); // Redirigimos desde el servidor
  });