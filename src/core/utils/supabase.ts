import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from 'next/server'

export async function createClient() {
  const cookieStore = await cookies();

  // Create a server's supabase client with newly configured cookie,
  // which could be used to maintain user's session
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have proxy refreshing
            // user sessions.
          }
        },
      },
    }
  );
}

export async function checkToken(request: NextRequest) {
  // 1. Crear respuesta base
  let response = NextResponse.next({
    request: { headers: request.headers },
  })

  // 2. Configurar Supabase (necesario para refrescar el token)
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

    // 3. Verificar usuario
  const { data: { user }, error } = await supabase.auth.getUser()

  // 4. Retornamos objeto simple (sin interfaz)
  return {
    isAuthorized: !!user && !error,
    response, // <--- Esto es lo que lleva las cookies nuevas
  }
}

export async function validateSession() {
  // En Server Actions NO tenemos 'request', usamos 'cookies()'
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet) {
            // En Actions, setear cookies es directo, no necesitamos 'response'
            try {
              cookiesToSet.forEach(({ name, value, options }) => 
                cookieStore.set(name, value, options)
              )
            } catch {
              // Ignorar errores en Server Components de solo lectura
            }
        },
      },
    }
  )

  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    throw new Error("CREDENTIALS_ERROR")// O false, según prefieras
  }

  return user // Devolvemos el usuario porque suele ser útil para el Action
}