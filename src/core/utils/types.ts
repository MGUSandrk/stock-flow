import { NormalizedNextUrl } from "next/dist/client/components/segment-cache/cache-key";

export interface Profile {
  name: string
  email: string
  avatar: string
}


export type CreateProfileDTO = {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
};


export interface BatchFeatures {
  [key: string]: string ;
}


export interface Batch {
  id?: string;
  purchase_price: number;
  initial_quantity: number;
  current_quantity?: number;
  expiration_date?: string | null;
  batch_number?: string;
  features: BatchFeatures;
  created_at?: Date ;
}


export interface Product {
  stock?: number;
  id?: string;
  name: string;
  sku?: string;
  category_id: string;
  sale_price: number;
  batches?: Batch[];
}


export type ActionResponse<T = void> = {
  success: boolean;
  data?: T;
  error?: string;
};


export interface Category {
  id: string;
  name: string;
  description?: string | null;
  created_at?: string | null;
}