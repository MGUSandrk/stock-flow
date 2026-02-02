import { type NextRequest, NextResponse } from 'next/server';
import { SupabaseGateway } from '@/lib/utils/supabase/server';

// --- CONFIGURACIÓN DE RUTAS ---
// Rutas que requieren login
const PROTECTED_PREFIXES = ['/dashboard', '/demo'];
// Rutas que NO puedes ver si ya estás logueado (Login, Register)
const AUTH_ROUTES = ['/login', '/register', '/forgot-password'];

export async function middleware(request: NextRequest) {
  
  // 1. INFRAESTRUCTURA: Validar sesión y refrescar cookies
  const { user, response } = await SupabaseGateway.validateSessionInMiddleware(request);
  const pathname = request.nextUrl.pathname;

  // --- LÓGICA DE NEGOCIO (Route Guard) ---

  // CASO A: Usuario NO logueado intenta entrar a ruta protegida
  const isProtectedRoute = PROTECTED_PREFIXES.some(prefix => 
    pathname.startsWith(prefix)
  );

  if (isProtectedRoute && !user) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    
    // ⚠️ CRÍTICO: Copiar cookies de sesión al redirigir
    // Si Supabase refrescó el token en el paso 1, debemos pasarlo al redirect
    const redirectResponse = NextResponse.redirect(url);
    const setCookieHeader = response.headers.get('set-cookie');
    if (setCookieHeader) {
        redirectResponse.headers.set('set-cookie', setCookieHeader);
    }
    return redirectResponse;
  }

  // CASO B: Usuario YA logueado intenta entrar al login
  const isAuthRoute = AUTH_ROUTES.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isAuthRoute && user) {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard'; // Lo mandamos a su casa
    
    const redirectResponse = NextResponse.redirect(url);
    const setCookieHeader = response.headers.get('set-cookie');
    if (setCookieHeader) {
        redirectResponse.headers.set('set-cookie', setCookieHeader);
    }
    return redirectResponse;
  }

  // Si no aplica ninguna regla, dejamos pasar la respuesta original (con cookies actualizadas)
  return response;
}

export const config = {
  matcher: [
    // Excluir estáticos, imágenes, etc.
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};