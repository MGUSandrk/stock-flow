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

// Definimos una interfaz para las características dinámicas
export interface ProductMetadata {
  [key: string]: string ;
}

export interface Batch {
  id?: string;
  purchase_price: number;
  initial_quantity: number;
  current_quantity?: number;
  expiration_date?: string | null;
  batch_number?: string;
}

export interface Product {
  stock: number;
  id: string;
  name: string;
  sku?: string;
  category_id?: string;
  sale_price: number;
  metadata: ProductMetadata; // <--- Cambiado de any a ProductMetadata
  batches?: Batch[];
}

// El Response ahora es un genérico real
export type ActionResponse<T = void> = {
  success: boolean;
  data?: T;
  error?: string;
};

export interface Category {
  id: string;
  name: string;
  organization_id: string;
  description?: string | null;
  created_at?: string | null;
}