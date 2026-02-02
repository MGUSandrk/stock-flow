import { createSafeActionClient } from 'next-safe-action';
import { SupabaseGateway } from '@/lib/utils/supabase/server';
import { AppError } from '@/lib/core/errors';

// 1. CLIENTE PÚBLICO (Para Login/Register)
// Asegúrate de exportarlo con 'export'
export const actionClient = createSafeActionClient({
  handleServerError(e) {
    if (e instanceof AppError) {
      return { message: e.message };
    }
    return { message: 'Error interno del servidor' };
  },
});

// 2. CLIENTE PRIVADO (Para Dashboard, etc)
export const authActionClient = actionClient.use(async ({ next }) => {
  const user = await SupabaseGateway.getCurrentUser();

  if (!user) {
    throw new AppError('AUTH_ERROR', 'Debes iniciar sesión');
  }

  return next({ ctx: { user, userId: user.id } });
});