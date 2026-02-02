import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { User } from '@supabase/supabase-js';

// DTO para la respuesta del middleware
export type MiddlewareAuthResult = {
  user: User | null;
  response: NextResponse; // Necesario porque Supabase escribe cookies aquí
};

export const SupabaseGateway = {
  
  /**
   * CONTEXTO 1: MIDDLEWARE (Edge)
   * Maneja cookies de Request/Response y refresco de tokens automático.
   */
  async validateSessionInMiddleware(request: NextRequest): Promise<MiddlewareAuthResult> {
    let response = NextResponse.next({ request });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return request.cookies.getAll(); },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
            response = NextResponse.next({ request });
            cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
          },
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();
    return { user, response };
  },

  /**
   * CONTEXTO 2: SERVER ACTIONS / API (Node.js)
   * Usa la librería `next/headers` para leer cookies en el servidor.
   */
  async getCurrentUser(): Promise<User | null> {
    const cookieStore = await cookies(); // Await necesario en Next.js 15
    
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll(); },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
            } catch {
              // Ignoramos errores si estamos en un Server Component (solo lectura)
            }
          },
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  /**
   * CONTEXTO 3: SERVICIOS (Login/Logout)
   * Métodos explícitos para operaciones de Auth.
   */
  async login(email: string, password: string) {
    const cookieStore = await cookies();
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            getAll() { return cookieStore.getAll(); },
            setAll(cookiesToSet) {
                cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
            },
          },
        }
    );
    return supabase.auth.signInWithPassword({ email, password });
  },

  async logout() {
    const cookieStore = await cookies();
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() { return cookieStore.getAll(); },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
                },
            },
        }
    );
    return supabase.auth.signOut();
  }
};