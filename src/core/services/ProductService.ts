import { Product, Batch } from '@/core/utils/types';
import { createClient } from '../utils/supabase';
import { organizationService } from './OrganizationService';
import { AuthService } from './AuthService';
import { UserService } from './UserService';

export const productService = {
  async createWithBatch(
    productData: Product,
    batchData: Batch
  ): Promise<Product> { // Retorno tipado

    const supabase = await createClient()

    await AuthService.validateSession()
    
    const { data: product, error: pError } = await supabase
      .from('products')
      .insert([{...productData,}])
      .select()
      .single();

    if (pError) throw pError;

    if (batchData.initial_quantity > 0) {
      const { error: bError } = await supabase
        .from('batches')
        .insert([{
          product_id: product.id, 
          purchase_price: batchData.purchase_price, 
          initial_quantity: batchData.initial_quantity,
          current_quantity: batchData.initial_quantity, 
          expiration_date: batchData.expiration_date,
          features: batchData.features
        }]);

      if (bError) throw bError;}

    return product as Product;
  },


  async getAllWithBatches() {
    const supabase = await createClient()

    await AuthService.validateSession()

    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories(name),
        batches(*)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Mapeo para facilitar el uso en la tabla
    return data.map(product => {
      const batches = product.batches || [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const totalStock = batches.reduce((acc: any, b: { current_quantity: any; }) => acc + (b.current_quantity || 0), 0);
      return {
        ...product,
        category: product.categories?.name || 'Sin categoría',
        sale_price : product.sale_price,
        stock: totalStock,
        batches: batches 
      };
    });
  },


  async createBatch(batchData : Batch){
    try{
      const supabase = await createClient()
      await AuthService.validateSession()
      const { error } = await supabase.from('batches').insert([{
      ...batchData,
      current_quantity: batchData.initial_quantity 
      }])
      if(error){
        throw new Error("VALIDATION_ERROR")
      }
      return 
    }catch{
      throw new Error("INTERNAL_SERVER_ERROR")
    }
  }
};