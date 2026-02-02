import { createBrowserClient } from '@supabase/ssr';

/**
 * Singleton-ish para el Cliente del Navegador.
 * A diferencia del servidor, aquí sí podemos reutilizar la instancia 
 * porque en el navegador solo hay un usuario activo a la vez.
 */
export const createClient = () => {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
};