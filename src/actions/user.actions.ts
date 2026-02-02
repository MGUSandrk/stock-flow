'use server'; // 👈 INDISPENSABLE: Marca este archivo como RPC (Remote Procedure Call)

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/utils/safe-actions';
import { UserService } from '@/lib/services/user.service';

/**
 * DTO de Entrada para actualizar perfil.
 */
const UpdateProfileSchema = z.object({
  full_name: z.string().min(3, { message: 'El nombre debe tener al menos 3 letras' }).optional(),
  // Podríamos añadir validación de URL para el avatar si quisiéramos
  avatar_url: z.string().url().optional().or(z.literal('')), 
});

/**
 * ACCIÓN: Actualizar Perfil
 * Endpoint: POST (interno generado por Next.js)
 */
export const updateProfileAction = createSafeAction(
  UpdateProfileSchema,
  async (data, userId) => {
    // 1. Delegar al Servicio (Business Logic Layer)
    // El 'userId' viene garantizado por el wrapper safeAction (Auth Layer)
    const updatedProfile = await UserService.updateProfile(userId, {
      full_name: data.full_name,
      avatar_url: data.avatar_url || undefined,
    });

    // 2. Cache Invalidation (Cache Evict)
    // Le dice a Next.js: "La próxima vez que alguien pida /dashboard,
    // no uses la versión estática, vuelve a consultar la DB".
    revalidatePath('/dashboard');
    
    // También revalidamos el layout si el avatar se muestra en el header
    revalidatePath('/', 'layout'); 

    // 3. Retorno
    return updatedProfile;
  }
);