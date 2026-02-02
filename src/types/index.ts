/**
 * Representa la estructura exacta de la tabla en base de datos..
 */
export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  updated_at: string | null;
};

/**
 * DTO para crear/actualizar un perfil.
 * Omitimos campos de sistema como 'updated_at'.
 */
export type CreateProfileDTO = {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
};

export type Product = {
  id: string; // Usualmente string (UUID) en Supabase, o number. Ajusta según tu DB.
  nombre: string;
  precio: number;
  stock: number; // o "cantidad"
  categoria: string;
  color: string;
  // Puedes agregar más fácil en el futuro
}