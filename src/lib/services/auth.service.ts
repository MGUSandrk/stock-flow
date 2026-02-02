import { SupabaseGateway } from '@/lib/utils/supabase/server';
import { AppError } from '@/lib/core/errors';
import { z } from 'zod';

// 1. Exportamos el esquema aquí (Fuente Única)
export const LoginSchema = z.object({
    email: z.string().email("Email inválido"),
    password: z.string().min(1, "La contraseña es requerida")
});

// Tipamos el input basándonos en el esquema
export type LoginInput = z.infer<typeof LoginSchema>;

export const AuthService = {
  // 2. Usamos el tipo inferido aquí
  async login(data: LoginInput) {
    const { error } = await SupabaseGateway.login(data.email, data.password);
    
    if (error) {
       throw new AppError("AUTH_ERROR", "Credenciales inválidas");
    }
    return { success: true };
  },

  async logout() {
    await SupabaseGateway.logout();
  }
};