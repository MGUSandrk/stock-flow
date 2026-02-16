import { createClient } from "../utils/supabase";
import { Category } from "../utils/types";
import { organizationService } from "./OrganizationService";

export const categoryService = {

  async getAll(userid : string): Promise<Category[]> {
    const supabase = await createClient()
    const organization = await organizationService.getOrganizationByUser(userid)
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('organization_id', organization.id)
      .order('name', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  async create(name : string,userid : string): Promise<Category> {
    const supabase = await createClient()
    const organization = await organizationService.getOrganizationByUser(userid)
    const { data, error } = await supabase
      .from('categories')
      .insert([{ name : name, organization_id: organization.id }])
      .select()
      .single();

    console.log(error)
    if (error) throw error;
    return data;
  }
};