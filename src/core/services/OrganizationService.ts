
import { createClient } from '../utils/supabase';
import { redirect } from 'next/navigation';

export const organizationService = {
  async create(data: { name: string, slug: string, userId: string }) {

    const supabase = await createClient()
    const { data: org, error: orgError } = await supabase
      .from('organizations')
      .insert([{ name: data.name, slug: data.slug }])
      .select()
      .single();
      
    if (orgError) throw new Error("Error al crear la organización");

    // 2. Asociar al usuario como ADMIN de esa organización
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ organization_id: org.id, role: 'admin' })
      .eq('id', data.userId);

    if (profileError) throw new Error("Error al asociar el usuario a la organización");

    return org;
  },

  async getOrganizationByUser(userId: string) {  
     const supabase = await createClient()
     const { data : organization, error } = await supabase
      .from('organizations')
      .select('*, profiles!inner(id, role)')
      .eq('profiles.id', userId)
      .single();

    if (error) redirect('/create-org') // O manejar el error de otra forma;

    return organization; 
  }
};