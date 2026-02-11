import { createClient } from '@/lib/utils/supabaseServer';
import { Profile, CreateProfileDTO } from '@/types';
import { AppError } from '@/lib/core/errors';

// Singleton instance (en JS los módulos son singletons por defecto)
export const UserRepository = {
  
  /**
   * Busca un perfil por ID.
   * Equivalente a: findById(String id)
   */
  async findById(id: string): Promise<Profile | null> {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      // Código PGRST116 significa "Results contain 0 rows" en PostgREST
      if (error.code === 'PGRST116') return null;
      
      // Cualquier otro error es un fallo de sistema (DB caída, timeout)
      throw AppError.system(`Error buscando perfil: ${error.message}`);
    }

    return data;
  },

  /**
   * Crea o actualiza un perfil (Upsert).
   * Equivalente a: save(Entity entity)
   */
  async upsert(profile: CreateProfileDTO): Promise<Profile> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('profiles')
      .upsert({
        ...profile,
        updated_at: new Date().toISOString(),
      })
      .select() // Necesario para que devuelva el objeto insertado
      .single();

    if (error) {
      throw AppError.system(`Error guardando perfil: ${error.message}`);
    }

    return data;
  }
};