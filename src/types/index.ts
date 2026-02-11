/**
 * Representa la estructura exacta de la tabla en base de datos..
 */
export interface Profile {
  name: string
  email: string
  avatar: string
}

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

export interface Product {
  id: string
  name: string
  category: string // O category_id si viene de BD, pero para UI usamos el nombre
  costPrice: number // Precio de Compra
  salePrice: number // Precio de Venta
  stock: number
  features: Record<string, string> 
}

export type ActionResponse<T = void> = {
  success: boolean
  data?: T
  error?: string
}
