import { Product, Batch, ProductMetadata } from '@/core/utils/types';
import { createClient } from '../utils/supabase';
import { organizationService } from './OrganizationService';
import { AuthService } from './AuthService';
import { UserService } from './UserService';

export const productService = {
  async createWithBatch(
    productData: {
      name: string;
      sku?: string;
      category_id?: string;
      sale_price: number;
      metadata: ProductMetadata; // Tipado estricto
    }, 
    batchData: Batch
  ): Promise<Product> { // Retorno tipado

    const supabase = await createClient()

    const user = await AuthService.validateSession()

    const organization = await organizationService.getOrganizationByUser(user.id)
    
    const { data: product, error: pError } = await supabase
      .from('products')
      .insert([{
        ...productData,
        organization_id: organization.id
      }])
      .select()
      .single();

    if (pError) throw pError;

    if (batchData.initial_quantity > 0) {
      const { error: bError } = await supabase
        .from('batches')
        .insert([{
          product_id: product.id,
          organization_id: organization.id,
          purchase_price: batchData.purchase_price,
          initial_quantity: batchData.initial_quantity,
          current_quantity: batchData.initial_quantity,
          expiration_date: batchData.expiration_date,
        }]);

      if (bError) throw bError;
    }

    return product as Product;
  },

  async getAllWithBatches() {
    const supabase = await createClient()

    const user = await AuthService.validateSession()

    const organization = await organizationService.getOrganizationByUser(user.id)

    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories(name),
        batches(*)
      `)
      .eq('organization_id', organization.id)
      .order('created_at', { ascending: false });

      console.log(error)
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
        batches: batches // Los enviamos para el despliegue
      };
    });
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async createBatche(batchData : any){
    try{
      const supabase = await createClient()
      const user = await AuthService.validateSession()
    // 1. Obtener org_id del perfil
      const organization = await organizationService.getOrganizationByUser(user.id)
      const { error } = await supabase.from('batches').insert([{
      ...batchData,
      organization_id: organization.id,
      current_quantity: batchData.initial_quantity // El stock inicial es el actual al crear
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