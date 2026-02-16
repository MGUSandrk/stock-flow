'use server';
import { productService } from '@/core/services/ProductService';
import { ActionResponse, Product } from '@/core/utils/types';
import { revalidatePath } from 'next/cache';
import { AuthService } from '../services/AuthService';
import { ErrorType } from '../utils/errors';

export async function createProductAction(formData: FormData): Promise<ActionResponse<Product>> {
  try {
    await AuthService.validateSession()

    const productData = {
      name: formData.get('name') as string,
      sku: formData.get('sku') as string,
      sale_price: Number(formData.get('sale_price')),
      metadata: JSON.parse(formData.get('features') as string || '{}'),
      category_id : formData.get('category_id') as string
    }

    const batchData = {
      purchase_price: Number(formData.get('purchase_price')),
      initial_quantity: Number(formData.get('initial_stock')),
      expiration_date: formData.get('expiration_date') as string || null,
    }

    const data = await productService.createWithBatch(productData, batchData)

    return { success: true, data }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return { success: false, error: e.message }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createBatchAction(batchData: any): Promise<ActionResponse> {
  try {
    await AuthService.validateSession()
    await productService.createBatche(batchData)
    return { success: true }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return { success: false, error: e.message }
  }
}